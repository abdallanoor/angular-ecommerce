import { Component, inject, PLATFORM_ID } from '@angular/core';
import { TableModule } from 'primeng/table';
import {
  CurrencyPipe,
  DatePipe,
  isPlatformBrowser,
  NgClass,
} from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { OrdersService } from '../../core/services/orders.service';
import { Order } from '../../core/interfaces/order';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [
    TableModule,
    ChipModule,
    TagModule,
    ButtonModule,
    Dialog,
    RouterLink,
    NgClass,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './all-orders.component.html',
})
export class AllOrdersComponent {
  private authService = inject(AuthService);
  private ordersService = inject(OrdersService);
  private platform = inject(PLATFORM_ID);

  orders: Order[] = [] as Order[];
  orderDetails: Partial<Order> = {};
  isLoading = true;
  visible: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.getUserOrders();
    }
  }

  getUserOrders() {
    this.authService.userData.subscribe({
      next: (userData) => {
        this.ordersService.getLoggedUserOrders(userData.id).subscribe({
          next: (orders: Order[]) => {
            this.isLoading = false;
            this.orders = orders.reverse();
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Failed to load orders:', error);
          },
        });
      },
    });
  }

  getOrderData(order: Order) {
    this.visible = true;
    this.orderDetails = order;
  }
}
