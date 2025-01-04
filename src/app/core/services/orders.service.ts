import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private httpCLient = inject(HttpClient);
  private checkoutBaseUrl = 'api/v1/orders';
  private baseUrl = environment.baseUrl;
  private appUrl = environment.appUrl;
  private get headers() {
    const token =
      typeof window !== 'undefined' && localStorage.getItem('token');
    return {
      token: token || '',
    };
  }

  paymentOnline = (bagId: string, shippingAddress: object): Observable<any> => {
    return this.httpCLient.post(
      `${this.baseUrl}/${this.checkoutBaseUrl}/checkout-session/${bagId}?url=${this.appUrl}`,
      {
        shippingAddress,
      },
      {
        headers: this.headers,
      }
    );
  };

  cashOnDelivery = (
    bagId: string,
    shippingAddress: object
  ): Observable<any> => {
    return this.httpCLient.post(
      `${this.baseUrl}/${this.checkoutBaseUrl}/${bagId}`,
      {
        shippingAddress,
      },
      {
        headers: this.headers,
      }
    );
  };

  getLoggedUserOrders = (userID: string): Observable<any> => {
    return this.httpCLient.get(
      `${this.baseUrl}/${this.checkoutBaseUrl}/user/${userID}`
    );
  };
}
