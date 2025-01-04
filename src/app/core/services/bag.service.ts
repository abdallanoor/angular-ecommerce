import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BagService {
  private httpCLient = inject(HttpClient);

  private bagBaseUrl = 'api/v1/cart';
  private baseUrl = environment.baseUrl;

  private get headers() {
    const token =
      typeof window !== 'undefined' && localStorage.getItem('token');
    return {
      token: token || '',
    };
  }

  bagCount: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToBag = (productId: string): Observable<any> => {
    return this.httpCLient.post(
      `${this.baseUrl}/${this.bagBaseUrl}`,
      {
        productId,
      },
      {
        headers: this.headers,
      }
    );
  };

  getLoggedUserBag = (): Observable<any> => {
    return this.httpCLient.get(`${this.baseUrl}/${this.bagBaseUrl}`, {
      headers: this.headers,
    });
  };

  removeProductFromBag = (productId: string): Observable<any> => {
    return this.httpCLient.delete(
      `${this.baseUrl}/${this.bagBaseUrl}/${productId}`,
      {
        headers: this.headers,
      }
    );
  };
}
