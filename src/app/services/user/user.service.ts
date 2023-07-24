import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IUser } from '@interfaces/user';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	serviceUrl = environment['api'] + '/user';

	constructor(private readonly http: HttpClient) {}

	public getMany(): Observable<IUser[]> {
		return this.http.get<IUser[]>(this.serviceUrl);
	}
}
