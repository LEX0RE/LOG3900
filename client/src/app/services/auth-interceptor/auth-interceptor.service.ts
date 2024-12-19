import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID_TOKEN } from '@common/constants/authentication';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
    // source : https://blog.angular-university.io/angular-jwt-authentication/
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const idToken = localStorage.getItem(ID_TOKEN);

        if (!idToken) return next.handle(req);
        const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + idToken),
        });

        return next.handle(cloned);
    }
}
