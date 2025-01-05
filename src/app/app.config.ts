import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { MyPreset } from './mytheme';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';
import { headersInterceptor } from './core/interceptors/headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false,
          // cssLayer: {
          //   name: 'primeng',
          //   order: 'tailwind-base, primeng, tailwind-utilities',
          // },
        },
      },
    }),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
  ],
};
