import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appUrl, baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private httpCLient = inject(HttpClient);
  private checkoutBaseUrl = 'api/v1/orders';
  private get headers() {
    const token =
      typeof window !== 'undefined' && localStorage.getItem('token');
    return {
      token: token || '',
    };
  }

  paymentOnline = (bagId: string, shippingAddress: object): Observable<any> => {
    return this.httpCLient.post(
      `${baseUrl}${this.checkoutBaseUrl}/checkout-session/${bagId}?url=${appUrl}`,
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
      `${baseUrl}${this.checkoutBaseUrl}/${bagId}`,
      {
        shippingAddress,
      },
      {
        headers: this.headers,
      }
    );
  };
}
