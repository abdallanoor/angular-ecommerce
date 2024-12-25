import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient = inject(HttpClient);

  register = (user: any): Observable<any> => {
    return this._httpClient.post(baseUrl + 'api/v1/auth/signup', user);
  };

  login = (user: any): Observable<any> => {
    return this._httpClient.post(baseUrl + 'api/v1/auth/signin', user);
  };

  saveUserData = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
      } catch (error) {
        localStorage.clear();
      }
    }
  };

  forgotPassword = (email: any): Observable<any> => {
    return this._httpClient.post(
      baseUrl + 'api/v1/auth/forgotPasswords',
      email
    );
  };

  verifyResetCode = (code: any): Observable<any> => {
    return this._httpClient.post(baseUrl + 'api/v1/auth/verifyResetCode', code);
  };

  resetPassword = (newPassword: any): Observable<any> => {
    return this._httpClient.put(
      baseUrl + 'api/v1/auth/resetPassword',
      newPassword
    );
  };
}
