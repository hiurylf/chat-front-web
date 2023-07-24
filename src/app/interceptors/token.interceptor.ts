import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private readonly authService: AuthService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const userToken = this.authService.userAuth$.value?.token;
		const modifiedReq = request.clone({
			headers: request.headers.set(
				'Authorization',
				userToken ? `Bearer ${userToken}` : ''
			),
		});

		return next.handle(modifiedReq);
	}
}
