import { baseUrl } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private httpCLient = inject(HttpClient);

  private cartBaseUrl = 'api/v1/cart';
  get headers() {
    return {
      token: localStorage.getItem('token') || '',
    };
  }

  cartCount: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart = (productId: string): Observable<any> => {
    return this.httpCLient.post(
      baseUrl + this.cartBaseUrl,
      {
        productId,
      },
      {
        headers: this.headers,
      }
    );
  };

  getLoggedUserCart = (): Observable<any> => {
    return this.httpCLient.get(
      baseUrl + this.cartBaseUrl,

      {
        headers: this.headers,
      }
    );
  };

  removeProductFromCart = (productId: string): Observable<any> => {
    return this.httpCLient.delete(
      `${baseUrl}${this.cartBaseUrl}/${productId}`,
      {
        headers: this.headers,
      }
    );
  };
}
