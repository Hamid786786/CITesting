import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {
      // interceptor aded
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const authHeader = localStorage.getItem('AuthorizationToken') || 'Bearer 123';
        // Clone the request to add the new header.
        const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
}
