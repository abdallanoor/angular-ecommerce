import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/services/auth.service';
import { NavLink } from '../../core/interfaces/navbar';
import {
  authLinks,
  mainLinks,
  userLinks,
} from '../../shared/constants/navlinks.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DrawerModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private userDataSubscription: Subscription | null = null;

  visible = false;
  isLoggedIn = false;

  mainLinks: NavLink[] = mainLinks;

  ngOnInit(): void {
    this.userDataSubscription = this.authService.userData.subscribe(
      (userData) => (this.isLoggedIn = !!userData)
    );
  }

  get userNavLinks(): NavLink[] {
    return this.isLoggedIn ? userLinks : authLinks;
  }
}
