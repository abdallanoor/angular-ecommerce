import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { Image } from 'primeng/image';
import { Title } from '@angular/platform-browser';
import { PaymentFeatures, Product } from '../../core/interfaces/product';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { ProductDetailsLoader } from '../../shared/ui/skeleton-loaders/product-details-loader.component';
import { paymentFeatures } from '../../shared/constants/products.constants';
import { addProductToBag } from '../../shared/utils/bag.utils';
import { addToProductToFavorites } from '../../shared/utils/favorites.utils';
import { FavoritesService } from '../../core/services/favorites.service';
import { BagService } from '../../core/services/bag.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    Image,
    ButtonModule,
    TagModule,
    Rating,
    FormsModule,
    SkeletonModule,
    ProductCardComponent,
    ProductDetailsLoader,
  ],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private bagService = inject(BagService);
  private favoritesService = inject(FavoritesService);
  private toastService = inject(ToastService);
  private titleService = inject(Title);

  private subscription = new Subscription();

  isLoading: boolean = false;
  addToBagIsLoading: boolean = false;
  addToFavoritesIsLoading: boolean = false;
  productDetails!: Product;
  relatedProducts: Product[] = [];

  paymentFeatures: PaymentFeatures[] = paymentFeatures;

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.paramMap.subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            this.loadProductDetails(id);
          } else {
            this.toastService.error('Invalid product ID');
          }
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadProductDetails(id: string): void {
    this.isLoading = true;

    this.productDetails = undefined!;
    this.relatedProducts = [];

    this.subscription.add(
      this.productsService.getSpecificProduct(id).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.productDetails = response.data;
          this.titleService.setTitle(this.productDetails.title);
          this.loadRelatedProducts(this.productDetails.brand._id);
        },
        error: (error) => {
          this.toastService.error('Failed to load product');
          this.isLoading = false;
        },
      })
    );
  }

  private loadRelatedProducts(brandId: string): void {
    this.subscription.add(
      this.productsService.getProductsByBrand(brandId).subscribe({
        next: (response) => {
          this.relatedProducts = response.data;
        },
        error: () => {
          this.toastService.error('Failed to load related products');
        },
      })
    );
  }

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
