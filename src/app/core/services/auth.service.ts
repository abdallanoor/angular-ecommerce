import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient = inject(HttpClient);

  register = (user: any): Observable<any> => {
    return this._httpClient.post(baseUrl + 'api/v1/auth/signup', user);
  };
}
