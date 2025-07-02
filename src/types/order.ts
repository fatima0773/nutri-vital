
import { CartItem } from './cart';

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  shippingDate?: string;
  deliveryDate?: string;
  trackingNumber?: string;
  notes?: string;
}

export interface OrderFilters {
  search: string;
  status: string;
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';
}
