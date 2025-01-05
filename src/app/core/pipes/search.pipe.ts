import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchKey: string): Product[] {
    return products.filter((product) =>
      product.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
    );
  }
}
