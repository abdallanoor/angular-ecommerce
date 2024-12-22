import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'products', component: ProductsComponent, title: 'Products' },
  { path: 'categories', component: CategoriesComponent, title: 'Categories' },
  { path: 'brands', component: BrandsComponent, title: 'Brands' },
  { path: 'cart', component: CartComponent, title: 'Cart' },
  { path: 'wishlist', component: WishlistComponent, title: 'Brands' },
  { path: 'profile', component: ProfileComponent, title: 'My Accound' },

  { path: 'login', component: LoginComponent, title: 'Sigh in' },
  { path: 'register', component: RegisterComponent, title: 'Create account' },

  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
