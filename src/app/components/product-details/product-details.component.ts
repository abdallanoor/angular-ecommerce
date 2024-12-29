import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { Image } from 'primeng/image';
import { Title } from '@angular/platform-browser';

interface Product {
  _id: number;
  title: string;
  price: number;
  imageCover: string;
  description: string;
  images: [];
}
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [Image],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  title = inject(Title);

  subscription: Subscription = new Subscription();

  isLoading: boolean = false;
  productDetails!: Product;
  ngOnInit(): void {
    let id: string | null = '';
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        id = params.get('id');
      },
    });
    this.isLoading = true;
    this.subscription.add(
      this.productsService.getSpecificProduct(id).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.productDetails = res.data;
          this.title.setTitle(this.productDetails.title);
          // console.log(this.productDetails);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Failed to load product details:', err);
        },
      })
    );
  }
}
