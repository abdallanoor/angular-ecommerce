import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  year: Number = new Date().getFullYear();
  socialMediaIcons = [
    { icon: 'pi pi-facebook' },
    { icon: 'pi pi-instagram' },
    { icon: 'pi pi-linkedin' },
    { icon: 'pi pi-tiktok' },
    { icon: 'pi pi-twitter' },
  ];
}
