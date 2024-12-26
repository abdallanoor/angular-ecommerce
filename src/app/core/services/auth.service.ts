import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  platform = inject(PLATFORM_ID);

  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      if (localStorage.getItem('token')) {
        this.saveUserData();
      }
    }
  }

  register = (user: any): Observable<any> => {
    return this.httpClient.post(baseUrl + 'api/v1/auth/signup', user);
  };

  login = (user: any): Observable<any> => {
    return this.httpClient.post(baseUrl + 'api/v1/auth/signin', user);
  };

  saveUserData = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        this.userData.next(decoded);
        console.log(this.userData);
      } catch (error) {
        localStorage.clear();
      }
    }
  };

  forgotPassword = (email: any): Observable<any> => {
    return this.httpClient.post(baseUrl + 'api/v1/auth/forgotPasswords', email);
  };

  verifyResetCode = (code: any): Observable<any> => {
    return this.httpClient.post(baseUrl + 'api/v1/auth/verifyResetCode', code);
  };

  resetPassword = (newPassword: any): Observable<any> => {
    return this.httpClient.put(
      baseUrl + 'api/v1/auth/resetPassword',
      newPassword
    );
  };
}
