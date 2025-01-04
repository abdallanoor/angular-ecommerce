import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private platform = inject(PLATFORM_ID);

  private authBaseUrl = 'api/v1/auth';
  private baseUrl = environment.baseUrl;

  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      if (localStorage.getItem('token')) {
        this.saveUserData();
      }
    }
  }

  register = (user: any): Observable<any> => {
    return this.httpClient.post(
      `${this.baseUrl}/${this.authBaseUrl}/signup`,
      user
    );
  };

  login = (user: any): Observable<any> => {
    return this.httpClient.post(
      `${this.baseUrl}/${this.authBaseUrl}/signin`,
      user
    );
  };

  forgotPassword = (email: any): Observable<any> => {
    return this.httpClient.post(
      `${this.baseUrl}/${this.authBaseUrl}/forgotPasswords`,
      email
    );
  };

  verifyResetCode = (code: any): Observable<any> => {
    return this.httpClient.post(
      `${this.baseUrl}/${this.authBaseUrl}/verifyResetCode`,
      code
    );
  };

  resetPassword = (newPassword: any): Observable<any> => {
    return this.httpClient.put(
      `${this.baseUrl}/${this.authBaseUrl}/resetPassword`,
      newPassword
    );
  };
  saveUserData = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        this.userData.next(decoded);
      } catch (error) {
        localStorage.clear();
      }
    }
  };
}
