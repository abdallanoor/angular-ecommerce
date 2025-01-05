import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  private usersBaseUrl = 'api/v1/users';
  private baseUrl = environment.baseUrl;

  changePassword = (newPassword: any): Observable<any> => {
    return this.httpClient.put(
      `${this.baseUrl}/${this.usersBaseUrl}/changeMyPassword`,
      newPassword
    );
  };
  getLoggedUserData = (userId: any): Observable<any> => {
    return this.httpClient.get(
      `${this.baseUrl}/${this.usersBaseUrl}/${userId}`
    );
  };
  updateLoggedUserData = (userData: any): Observable<any> => {
    return this.httpClient.put(
      `${this.baseUrl}/${this.usersBaseUrl}/updateMe`,
      userData
    );
  };
}
