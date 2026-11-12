import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, OrderItem, Address } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';

interface CreateOrderParams {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'Online Payment' | 'Cash on Delivery';
  notes?: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (params: CreateOrderParams) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus, description?: string) => void;
  requestReturn: (orderId: string, reason: string) => boolean;
  cancelOrder: (orderId: string, reason?: string) => boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);
const ORDERS_STORAGE_KEY = 'wearlix_orders_v1';

export const generateOrderId = (): string => {
  // Generates KZ-XXXXXXXXXX (10 digits)
  const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
  return `KZ-${randomDigits}`;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = (params: CreateOrderParams): Order => {
    const orderId = generateOrderId();
    const now = new Date();
    const formattedDate = now.toISOString();
    const formattedTimeStr = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: orderId,
      date: formattedDate,
      customer: params.customer,
      shippingAddress: params.shippingAddress,
      items: params.items,
      subtotal: params.subtotal,
      discount: params.discount,
      shippingFee: params.shippingFee,
      total: params.total,
      paymentMethod: params.paymentMethod,
      paymentStatus: params.paymentMethod === 'Online Payment' ? 'Paid' : 'Pending',
      orderStatus: 'Confirmed',
      timeline: [
        {
          status: 'Confirmed',
          timestamp: formattedTimeStr,
          description: params.paymentMethod === 'Online Payment'
            ? 'Order confirmed and payment verified successfully.'
            : 'Order confirmed with Cash on Delivery verified.'
        },
        {
          status: 'Processing',
          timestamp: 'Scheduled',
          description: 'Ready to be routed to Mumbai primary fulfillment hub.'
        }
      ],
      courierName: 'Blue Dart Air Express',
      trackingNumber: `BD${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      notes: params.notes
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    const cleanId = orderId.trim().toUpperCase();
    return orders.find(o => o.id.toUpperCase() === cleanId);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, description?: string) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;

        const now = new Date();
        const formattedTimeStr = now.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }) + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

        const newTimeline = [
          ...order.timeline,
          {
            status,
            timestamp: formattedTimeStr,
            description: description || `Order updated to ${status}.`
          }
        ];

        return {
          ...order,
          orderStatus: status,
          timeline: newTimeline,
          paymentStatus: status === 'Refunded' ? 'Refunded' : order.paymentStatus
        };
      })
    );
  };

  const requestReturn = (orderId: string, reason: string): boolean => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return false;

    updateOrderStatus(
      orderId,
      'Returned',
      `Return initiated by customer. Reason: ${reason}. Pickup scheduled within 48 business hours.`
    );
    return true;
  };

  const cancelOrder = (orderId: string, reason = 'Cancelled by customer before dispatch'): boolean => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return false;

    updateOrderStatus(orderId, 'Cancelled', reason);
    return true;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus,
        requestReturn,
        cancelOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
