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

  paymentOnline = (bagId: string, shippingAddress: object): Observable<any> => {
    return this.httpCLient.post(
      `${this.baseUrl}/${this.checkoutBaseUrl}/checkout-session/${bagId}?url=${this.appUrl}`,
      {
        shippingAddress,
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
      }
    );
  };

  getLoggedUserOrders = (userID: string): Observable<any> => {
    return this.httpCLient.get(
      `${this.baseUrl}/${this.checkoutBaseUrl}/user/${userID}`
    );
  };
}
