import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'product-details-loader',
  standalone: true,
  imports: [SkeletonModule],
  template: ` <div
    class="md:h-[calc(100vh-70px)] grid grid-cols-1 md:grid-cols-3 gap-1"
  >
    <div class="col-span-2 max-md:h-[442px]">
      <p-skeleton styleClass="!h-full" />
    </div>
    <div class="col-span-1 flex flex-col gap-5">
      <p-skeleton styleClass="!w-1/2 !h-7" />
      <p-skeleton styleClass="!w-1/3 !h-5" />
      <p-skeleton styleClass="!w-1/6 !h-4" />
      <p-skeleton styleClass="!w-full !h-9" />
      <p-skeleton styleClass="!w-full !h-9 " />
      <p-skeleton styleClass="!w-full !h-24 " />
      <p-skeleton styleClass="!w-1/6 !h-7 " />
      <p-skeleton styleClass="!w-2/5 !h-8 " />
    </div>
  </div>`,
})
export class ProductDetailsLoader {}
