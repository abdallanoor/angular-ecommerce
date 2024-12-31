import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../../core/services/cart.service';
import { ToastService } from '../../../core/services/toast.service';
import { addToBag } from '../../utils/cart.utils';
import { NgClass } from '@angular/common';
import { addToProductToFavorites } from '../../utils/favorites.utils';
import { FavoritesService } from '../../../core/services/favorites.service';

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
  @Input() isFavoriteProduct: boolean = false;

  cartService = inject(CartService);
  favoritesService = inject(FavoritesService);
  toastService = inject(ToastService);

  addToCartIsLoading: boolean = false;
  addToFavoritesIsLoading: boolean = false;

  addToCart(id: string) {
    addToBag(this.cartService, this.toastService, id, (loading) => {
      this.addToCartIsLoading = loading;
    });
  }

  addToFavorites(id: string) {
    addToProductToFavorites(
      this.favoritesService,
      this.toastService,
      id,
      (loading) => {
        this.addToFavoritesIsLoading = loading;
      }
    );
  }
}
