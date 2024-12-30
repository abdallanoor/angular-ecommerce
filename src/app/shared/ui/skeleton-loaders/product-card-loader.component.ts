import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'product-card-loader',
  standalone: true,
  imports: [SkeletonModule],
  template: ` <div class="aspect-[5/7]">
    <p-skeleton styleClass="mb-2 !h-full" />
    <p-skeleton width="10rem" styleClass="mb-2" />
    <p-skeleton width="5rem" styleClass="mb-2" />
  </div>`,
})
export class ProductCardLoader {}
