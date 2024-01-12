import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.set('Access-Control-Allow-Headers', 'Content-Type'),
    });
    req = req.clone({
      headers: req.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, OPTIONS'
      ),
    });
    req = req.clone({
      headers: req.headers.set('Access-Control-Allow-Origin', '*'),
    });

    //add the jwt token (LocalStorage) request
    let authRequest = req;
    const token = this.authService.getToken();
    if (token != null) {
      authRequest = authRequest.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
    }
    return next.handle(authRequest);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
