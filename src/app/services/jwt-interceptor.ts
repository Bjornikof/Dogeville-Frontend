import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentWingman = JSON.parse(localStorage.getItem('currentWingman'));
    if (currentWingman && currentWingman.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentWingman.token}`
        }
      });
    }
    return next.handle(req);
  }

}
