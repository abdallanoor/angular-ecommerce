import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../core/services/toast.service';
import { SkeletonModule } from 'primeng/skeleton';

interface Products {
  _id: number;
  title: string;
  price: number;
  imageCover: string;
}
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, ButtonModule, SkeletonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  isLoading: boolean = false;
  products: Products[] = [];

  productsService = inject(ProductsService);
  toast = inject(ToastService);

  subscription: Subscription = new Subscription();

  skeleton = new Array(10);

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription.add(
      this.productsService.getProducts().subscribe({
        next: (res) => {
          this.products = res.data;
        },
        error: (err) => {
          this.isLoading = false;
          this.toast.error('Failed to load products');
        },
        complete: () => {
          this.isLoading = false;
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
