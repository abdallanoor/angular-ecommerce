import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../../core/services/cart.service';
import { ToastService } from '../../../core/services/toast.service';
import { addToBag } from '../../utils/cart.utils';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, ButtonModule, NgClass],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() removeProduct?: (id: string) => void;
  @Input() removeIsLoading = false;
  @Input() isClickedId?: string;
  @Input() product!: Product;
  @Input() CartProductCount: number = 0;
  @Input() CartProductPrice: number = 0;
  @Input() isCartProduct: boolean = false;

  cartService = inject(CartService);
  toast = inject(ToastService);

  addToCartIsLoading: boolean = false;

  addToCart(id: string) {
    addToBag(this.cartService, this.toast, id, (loading) => {
      this.addToCartIsLoading = loading;
    });
  }
}
