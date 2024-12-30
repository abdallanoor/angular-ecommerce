import { baseUrl } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  httpCLient = inject(HttpClient);

  cartBaseUrl = 'api/v1/cart';

  addProductToCart = (productId: string): Observable<any> => {
    return this.httpCLient.post(
      baseUrl + this.cartBaseUrl,
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  };
}
