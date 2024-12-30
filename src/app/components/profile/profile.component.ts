import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  userName: string = '';

  constructor() {
    this.authService.userData.subscribe((res) => {
      this.userName = res?.name;
    });
  }

  profileLinks = [
    { path: '/orders', label: 'My orders' },
    { path: '/personalInfo', label: 'My details' },
    { path: '/address', label: 'My address' },
    { path: '/favorites', label: 'My favorites' },
    { path: '/change-password', label: 'Change password' },
  ];

  logout() {
    localStorage.removeItem('token');
    this.authService.userData.next(null);
    this.router.navigate(['/']);
    this.toast.success('Logged out successfully');
  }
}
