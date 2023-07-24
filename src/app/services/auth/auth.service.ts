import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { IUser } from '@interfaces/user';

interface IAuthResponse {
	token: string;
	user: IUser;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	serviceUrl = environment['api'];
	localStorageAuthKey = 'chat-web-auth';
	userAuth$ = new BehaviorSubject<IAuthResponse | null>(null);

	constructor(private readonly http: HttpClient) {
		const localData = window.localStorage.getItem(this.localStorageAuthKey);
		if (localData) {
			this.userAuth$.next(JSON.parse(localData));
		}
	}

	public signIn(params: IUser): Observable<IAuthResponse | string> {
		return this.http
			.post<IAuthResponse | string>(`${this.serviceUrl}/signup`, params)
			.pipe(
				catchError(error => throwError(error.error)),
				tap(
					data => {
						this.setAuth(data);
					},
					() => this.setAuth(null)
				)
			);
	}

	public login(params: IUser): Observable<IAuthResponse | string> {
		return this.http
			.post<IAuthResponse | string>(`${this.serviceUrl}/login`, params)
			.pipe(
				catchError(error => throwError(error.error)),
				tap(
					data => {
						this.setAuth(data);
					},
					() => this.setAuth(null)
				)
			);
	}

	public setAuth(data: IAuthResponse | string | null): void {
		if (data && typeof data === 'object') {
			window.localStorage.setItem(
				this.localStorageAuthKey,
				JSON.stringify(data)
			);
			this.userAuth$.next(data);
		} else {
			window.localStorage.setItem(this.localStorageAuthKey, '');
			this.userAuth$.next(null);
		}
	}
}
