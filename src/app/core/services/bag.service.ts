import { baseUrl } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BagService {
  private httpCLient = inject(HttpClient);

  private bagBaseUrl = 'api/v1/cart';
  get headers() {
    return {
      token: localStorage.getItem('token') || '',
    };
  }

  bagCount: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToBag = (productId: string): Observable<any> => {
    return this.httpCLient.post(
      baseUrl + this.bagBaseUrl,
      {
        productId,
      },
      {
        headers: this.headers,
      }
    );
  };

  getLoggedUserBag = (): Observable<any> => {
    return this.httpCLient.get(
      baseUrl + this.bagBaseUrl,

      {
        headers: this.headers,
      }
    );
  };

  removeProductFromBag = (productId: string): Observable<any> => {
    return this.httpCLient.delete(`${baseUrl}${this.bagBaseUrl}/${productId}`, {
      headers: this.headers,
    });
  };
}
