import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { ToastService } from '../../core/services/toast.service';
import { SkeletonModule } from 'primeng/skeleton';
import { profileLinks } from '../../shared/constants/profile.constants';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, SkeletonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private platform = inject(PLATFORM_ID);

  userName = '';
  profileLinks = profileLinks;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platform)) return;

    this.authService.userData.subscribe({
      next: (userData) => this.loadUserData(userData.id),
      error: () => this.toastService.error('Failed to retrieve user data'),
    });
  }

  private loadUserData(userId: string): void {
    this.userService.getLoggedUserData(userId).subscribe({
      next: (user) => (this.userName = user.data.name),
      error: () => this.toastService.error('Failed to load user data'),
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.userData.next(null);
    this.router.navigate(['/']);
    this.toastService.success('Logged out successfully');
  }
}
