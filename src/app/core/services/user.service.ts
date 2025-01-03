import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  private usersBaseUrl = 'api/v1/users';
  private get headers() {
    const token =
      typeof window !== 'undefined' && localStorage.getItem('token');
    return {
      token: token || '',
    };
  }

  changePassword = (newPassword: any): Observable<any> => {
    return this.httpClient.put(
      `${baseUrl}/${this.usersBaseUrl}/changeMyPassword`,
      newPassword,
      {
        headers: this.headers,
      }
    );
  };
}
