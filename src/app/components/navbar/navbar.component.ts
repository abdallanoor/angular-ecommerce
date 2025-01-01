import { Component, inject, OnInit } from '@angular/core';
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
import { BagService } from '../../core/services/bag.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DrawerModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private bagService = inject(BagService);

  visible: boolean = false;
  isLoggedIn: boolean = false;
  bagCount: number = 0;
  mainLinks: NavLink[] = mainLinks;

  ngOnInit(): void {
    this.setupUserDataListener();
    this.setupBagCountListener();
  }

  get userNavLinks(): NavLink[] {
    return this.isLoggedIn ? userLinks : authLinks;
  }

  private setupUserDataListener(): void {
    this.authService.userData.subscribe({
      next: (userData) => {
        this.isLoggedIn = !!userData;
        if (this.isLoggedIn) {
          this.loadBagData();
        }
      },
    });
  }

  private setupBagCountListener(): void {
    this.bagService.bagCount.subscribe({
      next: (bagCount) => {
        this.bagCount = bagCount;
      },
    });
  }

  private loadBagData(): void {
    this.bagService.getLoggedUserBag().subscribe({
      next: (res) => {
        this.bagService.bagCount.next(res.numOfCartItems);
      },
    });
  }
}
