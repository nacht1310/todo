import { HttpInterceptorFn } from '@angular/common/http';
import { API } from '../constant/constant';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;

  req = req.clone({
    url: API.BASE_URL + url,
  });

  return next(req);
};
