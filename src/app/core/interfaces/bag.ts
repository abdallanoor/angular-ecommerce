import { Product } from './product';

export interface Bag {
  numOfCartItems: number;
  data: Data;
  cartId: string;
}

interface Data {
  _id: string;
  products: Products[];
  totalCartPrice: number;
}

interface Products {
  count: number;
  price: number;
  product: Product;
}
