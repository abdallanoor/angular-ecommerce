import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url.includes('cart') ||
    req.url.includes('wishlist') ||
    req.url.includes('orders') ||
    req.url.includes('users')
  ) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        req = req.clone({
          setHeaders: { token },
        });
      }
    }
  }

  return next(req);
};
