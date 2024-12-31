import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/services/auth.service';
import { NavLink } from '../../core/interfaces/navbar';
import {
  authLinks,
  mainLinks,
  userLinks,
} from '../../shared/constants/navlinks.constant';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DrawerModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  visible: boolean = false;
  isLoggedIn: boolean = false;
  cartCount: number = 0;
  mainLinks: NavLink[] = mainLinks;

  ngOnInit(): void {
    this.setupUserDataListener();
    this.setupCartCountListener();
  }

  get userNavLinks(): NavLink[] {
    return this.isLoggedIn ? userLinks : authLinks;
  }

  private setupUserDataListener(): void {
    this.authService.userData.subscribe({
      next: (userData) => {
        this.isLoggedIn = !!userData;
        if (this.isLoggedIn) {
          this.loadCartData();
        }
      },
    });
  }

  private setupCartCountListener(): void {
    this.cartService.cartCount.subscribe({
      next: (cartCount) => {
        this.cartCount = cartCount;
      },
    });
  }

  private loadCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.next(res.numOfCartItems);
      },
      error: (err) => {
        console.error('Error loading bag data:', err);
      },
    });
  }
}
