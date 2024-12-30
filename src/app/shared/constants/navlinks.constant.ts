import { NavLink } from '../../core/interfaces/navbar';

export const mainLinks: NavLink[] = [
  { path: 'products', label: 'New for men' },
];

export const userLinks: NavLink[] = [
  { path: 'profile', label: 'Profile', icon: 'pi-user' },
  { path: 'favorites', label: 'favorites', icon: 'pi-heart' },
  { path: 'cart', label: 'Bag', icon: 'pi-shopping-bag' },
];
export const authLinks: NavLink[] = [
  { path: 'register', label: 'Create account', icon: '' },
  { path: 'login', label: 'Log In', icon: 'pi-user' },
];
