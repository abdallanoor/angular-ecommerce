import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';

export function addToBag(
  cartService: CartService,
  toastService: ToastService,
  productId: string,
  setLoading: (loading: boolean) => void
): void {
  setLoading(true);
  cartService.addProductToCart(productId).subscribe({
    next: () => {
      setLoading(false);
      toastService.success('Product added to bag');
    },
    error: (err) => {
      setLoading(false);
      toastService.error(err.error.message);
    },
  });
}
