import { HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthInterceptorService } from '@app/services/auth-interceptor/auth-interceptor.service';
import { of } from 'rxjs';

describe('AuthInterceptorService', () => {
    let service: AuthInterceptorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthInterceptorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('intercept should call clone if token', () => {
        const getSpy = spyOn(localStorage, 'getItem').and.returnValue('1234');
        const request = new HttpRequest<unknown>('GET', '/home');
        const requestCloneSpy = spyOn(request, 'clone');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- sert pour stub le HttpHandler
        const next: any = {
            handle: () => {
                return of({ status: 200 });
            },
        };

        service.intercept(request, next).subscribe(() => {
            expect(getSpy).toHaveBeenCalled();
            expect(requestCloneSpy).toHaveBeenCalled();
        });
    });

    it('intercept should not call clone if not token', () => {
        const getSpy = spyOn(localStorage, 'getItem');
        const request = new HttpRequest<unknown>('GET', '/home');
        const requestCloneSpy = spyOn(request, 'clone');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- sert pour stub le HttpHandler
        const next: any = {
            handle: () => {
                return of({ status: 200 });
            },
        };

        service.intercept(request, next).subscribe(() => {
            expect(getSpy).toHaveBeenCalled();
            expect(requestCloneSpy).not.toHaveBeenCalled();
        });
    });
});
