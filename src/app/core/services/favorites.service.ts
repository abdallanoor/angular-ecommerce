import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private httpCLient = inject(HttpClient);

  private FavoritesBaseUrl = 'api/v1/wishlist';
  private baseUrl = environment.baseUrl;

  addProductToFavorites = (productId: string): Observable<any> => {
    return this.httpCLient.post(`${this.baseUrl}/${this.FavoritesBaseUrl}`, {
      productId,
    });
  };

  getLoggedUserFavorites = (): Observable<any> => {
    return this.httpCLient.get(`${this.baseUrl}/${this.FavoritesBaseUrl}`);
  };

  removeProductFromFavorites = (productId: string): Observable<any> => {
    return this.httpCLient.delete(
      `${this.baseUrl}/${this.FavoritesBaseUrl}/${productId}`
    );
  };
}
