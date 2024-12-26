import { NavLink } from '../../core/interfaces/navbar';

export const mainLinks: NavLink[] = [
  { path: 'products', label: 'Products' },
  { path: 'categories', label: 'Categories' },
  { path: 'brands', label: 'Brands' },
];

export const userLinks: NavLink[] = [
  { path: 'profile', label: 'Profile', icon: 'pi-user' },
  { path: 'wishlist', label: 'Wishlist', icon: 'pi-heart' },
  { path: 'cart', label: 'Bag', icon: 'pi-shopping-bag' },
];
export const authLinks: NavLink[] = [
  { path: 'register', label: 'Create account', icon: '' },
  { path: 'login', label: 'Log In', icon: 'pi-user' },
];
