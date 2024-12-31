import { FavoritesService } from '../../core/services/favorites.service';
import { ToastService } from '../../core/services/toast.service';

export function addToProductToFavorites(
  favoritesService: FavoritesService,
  toastService: ToastService,
  productId: string,
  setLoading: (loading: boolean) => void
): void {
  setLoading(true);
  favoritesService.addProductToFavorites(productId).subscribe({
    next: () => {
      setLoading(false);
      toastService.success('Product added to favorites');
    },
    error: (err) => {
      setLoading(false);
      toastService.error(err.error.message);
    },
  });
}
