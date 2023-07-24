import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IMessage } from '@interfaces/message';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	serviceUrl = environment['api'] + '/message';

	constructor(private readonly http: HttpClient) {}

	public getMany(): Observable<IMessage[]> {
		return this.http.get<IMessage[]>(this.serviceUrl);
	}
}
