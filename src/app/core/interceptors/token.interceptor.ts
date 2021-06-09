import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Optional, Inject, InjectionToken } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { TokenService } from "../services/token.service";

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private token: TokenService,
        private router: Router,
        @Optional() @Inject(BASE_URL) private baseUrl?: string
    ) { }


    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const logoutHandler = () => {
            if (request.url.includes('/auth/logout')) {
                this.router.navigateByUrl('/auth/login');
            }
        };
        if (this.token.valid() && this.shouldAppendToken(request.url)) {
            return next
                .handle(
                    request.clone({
                        headers: request.headers.append('Authorization', this.token.headerValue()),
                        withCredentials: true,
                    })
                )
                .pipe(
                    tap(() => logoutHandler()),
                    catchError((error: HttpErrorResponse) => {
                        if (error.status === 401) {
                            this.token.clear();
                        }
                        return throwError(error);
                    })
                );
        }

        return next.handle(request).pipe(tap(() => logoutHandler()));
    }
    private shouldAppendToken(url: string) {
        return !this.hasHttpScheme(url) || this.includeBaseUrl(url);
    }

    private hasHttpScheme(url: string) {
        return new RegExp('^http(s)?://', 'i').test(url);
    }

    private includeBaseUrl(url: string) {
        if (!this.baseUrl) {
          return false;
        }
        const baseUrl = this.baseUrl.replace(/\/$/, '');
        return new RegExp(`^${baseUrl}`, 'i').test(url);
      }

}