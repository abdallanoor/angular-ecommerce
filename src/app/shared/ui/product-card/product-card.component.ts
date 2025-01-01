import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../../core/services/toast.service';
import { addProductToBag } from '../../utils/bag.utils';
import { NgClass } from '@angular/common';
import { addToProductToFavorites } from '../../utils/favorites.utils';
import { FavoritesService } from '../../../core/services/favorites.service';
import { BagService } from '../../../core/services/bag.service';

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
  @Input() bagProductCount: number = 0;
  @Input() bagProductPrice: number = 0;
  @Input() isBagProduct: boolean = false;
  @Input() isFavoriteProduct: boolean = false;

  bagService = inject(BagService);
  favoritesService = inject(FavoritesService);
  toastService = inject(ToastService);

  addToBagIsLoading: boolean = false;
  addToFavoritesIsLoading: boolean = false;

  addToBag(id: string) {
    addProductToBag(this.bagService, this.toastService, id, (loading) => {
      this.addToBagIsLoading = loading;
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
