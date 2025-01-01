import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../core/services/toast.service';
import { RouterLink } from '@angular/router';
import { BagLoader } from '../../shared/ui/skeleton-loaders/bag-loader.component';
import { Bag } from '../../core/interfaces/bag';
import { BagService } from '../../core/services/bag.service';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [ProductCardComponent, ButtonModule, RouterLink, BagLoader],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css',
})
export class BagComponent implements OnInit {
  private bagService = inject(BagService);
  private toast = inject(ToastService);

  bag!: Bag;
  isLoading: boolean = false;
  removeIsLoading: boolean = false;
  isClickedId!: string;

  ngOnInit(): void {
    this.getBag();
  }

  getBag() {
    this.isLoading = true;
    this.bagService.getLoggedUserBag().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.bag = res;
      },
      error: () => {
        this.isLoading = false;
        this.toast.error('Failed to load Bag');
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
        this.toast.success('Product removed');
        this.bagService.bagCount.next(res.numOfCartItems);
      },
      error: () => {
        this.removeIsLoading = false;
        this.toast.error('Failed to remove product');
      },
    });
  }
}
