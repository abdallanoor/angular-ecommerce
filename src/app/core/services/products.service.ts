import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpCLient = inject(HttpClient);

  private productsBaseUrl = 'api/v1/products';

  getProducts(): Observable<any> {
    return this.httpCLient.get(
      `${baseUrl}/${this.productsBaseUrl}?category[in]=6439d5b90049ad0b52b90048`
    );
  }

  getSpecificProduct(id: string): Observable<any> {
    return this.httpCLient.get(`${baseUrl}/${this.productsBaseUrl}/${id}`);
  }

  getProductsByBrand(id: string): Observable<any> {
    return this.httpCLient.get(
      `${baseUrl}/${this.productsBaseUrl}/?brand=${id}`
    );
  }
}
