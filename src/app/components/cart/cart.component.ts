import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { ButtonModule } from 'primeng/button';
import { Cart } from '../../core/interfaces/cart';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { CartLoader } from '../../shared/ui/skeleton-loaders/cart-loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCardComponent, ButtonModule, CartLoader, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private toast = inject(ToastService);

  cart!: Cart;
  isLoading: boolean = false;
  removeIsLoading: boolean = false;
  isClickedId!: string;

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.isLoading = true;
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.cart = res;
        console.log(res);
      },
      error: () => {
        this.isLoading = false;
        this.toast.error('Failed to load Bag');
      },
    });
  }

  removeProductFromBag(id: string) {
    this.removeIsLoading = true;
    this.isClickedId = id;
    this.cartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        this.removeIsLoading = false;
        this.cart = res;
        this.toast.success('Product removed');
        this.cartService.cartCount.next(res.numOfCartItems);
      },
      error: () => {
        this.removeIsLoading = false;
        this.toast.error('Failed to remove product');
      },
    });
  }
}
