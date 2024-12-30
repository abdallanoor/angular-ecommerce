import { Component, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;
}
