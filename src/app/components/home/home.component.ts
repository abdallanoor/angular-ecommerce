import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  landingData = [
    { image: 'bg-[url(/landing-1.jpg)]', title: 'THE COAT EDIT' },
    { image: 'bg-[url(/landing-3.jpg)]', title: 'THE SUIT GUIDE' },
    { image: 'bg-[url(/landing-2.jpg)]', title: 'NEW NOW' },
  ];
}
