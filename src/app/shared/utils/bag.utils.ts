import { BagService } from '../../core/services/bag.service';
import { ToastService } from '../../core/services/toast.service';

export function addProductToBag(
  bagService: BagService,
  toastService: ToastService,
  productId: string,
  setLoading: (loading: boolean) => void
): void {
  setLoading(true);
  bagService.addProductToBag(productId).subscribe({
    next: (res) => {
      setLoading(false);
      toastService.success('Product added to bag');
      bagService.bagCount.next(res.numOfCartItems);
    },
    error: (err) => {
      setLoading(false);
      toastService.error(err.error.message);
    },
  });
}
