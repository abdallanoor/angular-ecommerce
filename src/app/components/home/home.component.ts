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
    { image: 'bg-[url(/landing-1.jpg)]', title: 'NEW NOW' },
    { image: 'bg-[url(/landing-3.jpg)]', title: 'LATEST STYLE' },
    { image: 'bg-[url(/landing-2.jpg)]', title: 'TRENDING NOW' },
  ];
}
