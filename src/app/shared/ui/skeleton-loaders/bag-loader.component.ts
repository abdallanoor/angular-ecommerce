import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductCardLoader } from './product-card-loader.component';

@Component({
  selector: 'bag-loader',
  standalone: true,
  imports: [SkeletonModule, ProductCardLoader],
  template: ` <div class="">
    <p-skeleton width="10rem" height="1.5rem" styleClass="mb-4" />
    <div class="h-full grid grid-cols-1 md:grid-cols-3 md:gap-4">
      <div
        class="col-span-2 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-y-4"
      >
        <product-card-loader />
        <product-card-loader />
        <product-card-loader />
        <product-card-loader />
      </div>
      <div>
        <div class="flex justify-between">
          <p-skeleton width="5rem" styleClass="mb-4" />
          <p-skeleton width="7rem" styleClass="mb-4" />
        </div>
        <div class="flex justify-between">
          <p-skeleton width="5rem" styleClass="mb-4" />
          <p-skeleton width="7rem" styleClass="mb-4" />
        </div>
        <div class="flex justify-between">
          <p-skeleton width="5rem" styleClass="mb-4" />
          <p-skeleton width="7rem" styleClass="mb-4" />
        </div>
        <p-skeleton height="2rem" styleClass="mb-4" />
      </div>
    </div>
  </div>`,
})
export class BagLoader {}
