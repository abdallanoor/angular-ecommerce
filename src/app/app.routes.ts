import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BagComponent } from './components/bag/bag.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Create account',
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Sigh in',
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
    title: 'Forgot password',
    canActivate: [isLoggedInGuard],
  },

  { path: '', component: HomeComponent, title: 'E-commerce' },
  { path: 'products', component: ProductsComponent, title: 'Products' },
  {
    path: 'products-details/:id',
    component: ProductDetailsComponent,
    title: 'Product details',
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    title: 'My favorites',
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: BagComponent,
    title: 'Shopping bag',
    canActivate: [authGuard],
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent,
    title: 'Checkout',
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'My account',
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    component: AllOrdersComponent,
    title: 'All orders',
    canActivate: [authGuard],
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    title: 'My details',
    canActivate: [authGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    title: 'Change password',
    canActivate: [authGuard],
  },

  {
    path: '**',
    component: NotFoundComponent,
    title: 'The page you are looking for dose not exist.',
  },
];
