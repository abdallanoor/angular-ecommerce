import { Product } from './product';

export interface Order {
  shippingAddress: ShippingAddress;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: string | null;
  id: number;
  paidAt?: string;
}

interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}
