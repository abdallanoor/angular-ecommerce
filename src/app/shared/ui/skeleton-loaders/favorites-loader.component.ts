import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductCardLoader } from './product-card-loader.component';

@Component({
  selector: 'favorites-loader',
  standalone: true,
  imports: [SkeletonModule, ProductCardLoader],
  template: `
    <div>
      <p-skeleton width="10rem" height="1.5rem" styleClass="mb-4" />

      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-6 my-4"
      >
        @for (skeleton of productSkeletons; track $index) {
        <product-card-loader />
        }
      </div>
    </div>
  `,
})
export class FavoritesLoader {
  productSkeletons = Array(10);
}
