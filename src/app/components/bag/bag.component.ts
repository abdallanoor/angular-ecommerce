import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../core/services/toast.service';
import { RouterLink } from '@angular/router';
import { BagLoader } from '../../shared/ui/skeleton-loaders/bag-loader.component';
import { Bag } from '../../core/interfaces/bag';
import { BagService } from '../../core/services/bag.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [ProductCardComponent, ButtonModule, RouterLink, BagLoader],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css',
})
export class BagComponent implements OnInit {
  private bagService = inject(BagService);
  private toastService = inject(ToastService);
  private platform = inject(PLATFORM_ID);

  bag: Bag = {
    data: {
      products: [],
    },
  };
  isLoading: boolean = true;
  removeIsLoading: boolean = false;
  isClickedId!: string;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.getBag();
    }
  }

  getBag() {
    this.bagService.getLoggedUserBag().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.bag = res;
      },
      error: () => {
        this.isLoading = false;
        this.toastService.error('Failed to load Bag');
      },
    });
  }

  removeProductFromBag(id: string) {
    this.removeIsLoading = true;
    this.isClickedId = id;
    this.bagService.removeProductFromBag(id).subscribe({
      next: (res) => {
        this.removeIsLoading = false;
        this.bag = res;
        this.toastService.success('Product removed');
        this.bagService.bagCount.next(res.numOfCartItems);
      },
      error: () => {
        this.removeIsLoading = false;
        this.toastService.error('Failed to remove product');
      },
    });
  }
}
