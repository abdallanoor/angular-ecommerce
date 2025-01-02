import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FavoritesService } from '../../core/services/favorites.service';
import { Favorites } from '../../core/interfaces/favorites';
import { ToastService } from '../../core/services/toast.service';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { FavoritesLoader } from '../../shared/ui/skeleton-loaders/favorites-loader.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ButtonModule, ProductCardComponent, FavoritesLoader],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  private favoritesService = inject(FavoritesService);
  private toastService = inject(ToastService);
  private platform = inject(PLATFORM_ID);

  favorites: Favorites = {
    count: 0,
    data: [],
  };
  isLoading: boolean = true;
  removeIsLoading: boolean = false;
  addIsLoading: boolean = false;
  isClickedId!: string;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.getFavorites();
    }
  }

  getFavorites() {
    this.favoritesService.getLoggedUserFavorites().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.favorites = res;
      },
      error: () => {
        this.isLoading = false;
        this.toastService.error('Failed to load favorites');
      },
    });
  }

  removeProductFromFavorites(id: string) {
    this.removeIsLoading = true;
    this.isClickedId = id;
    this.favoritesService.removeProductFromFavorites(id).subscribe({
      next: () => {
        this.favoritesService
          .getLoggedUserFavorites()
          .subscribe((res) => (this.favorites = res));
        this.removeIsLoading = false;
        this.toastService.success('Product removed');
      },
      error: () => {
        this.removeIsLoading = false;
        this.toastService.error('Failed to remove product');
      },
    });
  }
}
