import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
interface NavLink {
  path: string;
  label?: string;
  icon?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DrawerModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  visible: boolean = false;
  userIsLoggedIn: boolean = false;

  mainNavLinks: NavLink[] = [
    { path: 'products', label: 'Products' },
    { path: 'categories', label: 'Categories' },
    { path: 'brands', label: 'Brands' },
  ];
  userNavLinks: NavLink[] = [
    { path: 'login', label: 'Log In' },
    { path: 'profile', label: 'Profile' },
    { path: 'wishlist', label: 'Wishlist' },
    { path: 'cart', label: 'Bag' },
  ];

  iconNavLinks: NavLink[] = [
    { path: 'login', icon: 'pi-user' },
    { path: 'profile', icon: 'pi-user' },
    { path: 'wishlist', icon: 'pi-heart' },
    { path: 'cart', icon: 'pi-shopping-bag' },
  ];

  get filteredUserNavLinks(): NavLink[] {
    return this.userNavLinks.filter((link) =>
      this.userIsLoggedIn ? link.path !== 'login' : link.path !== 'profile'
    );
  }

  get filteredIconNavLinks(): NavLink[] {
    return this.iconNavLinks.filter((icon) =>
      this.userIsLoggedIn ? icon.path !== 'login' : icon.path !== 'profile'
    );
  }
}
