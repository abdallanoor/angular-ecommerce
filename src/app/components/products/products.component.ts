import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../core/services/toast.service';
import { SkeletonModule } from 'primeng/skeleton';
import { Product } from '../../core/interfaces/product';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { ProductCardLoader } from '../../shared/ui/skeleton-loaders/product-card-loader.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ButtonModule,
    SkeletonModule,
    ProductCardComponent,
    ProductCardLoader,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit, OnDestroy {
  isLoading = false;
  products: Product[] = [];
  productSkeletons = Array(10);

  private productsService = inject(ProductsService);
  private toastService = inject(ToastService);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.subscription.add(
      this.productsService.getProducts().subscribe({
        next: (res) => {
          this.products = res.data;
        },
        error: () => {
          this.toastService.error('Failed to load products');
        },
        complete: () => {
          this.isLoading = false;
        },
      })
    );
  }
}
