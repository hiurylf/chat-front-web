import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '@env/environment';
import { Socket } from 'socket.io-client/build/esm/socket';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class WebsocketService {
	private serviceUrl = environment['api'];
	private socket?: Socket;

	constructor(private readonly authService: AuthService) {}

	setupSocketConnection(): Socket {
		const { token } = this.authService.userAuth$.value!;
		this.socket = io(this.serviceUrl, { auth: { token } });
		return this.socket;
	}

	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
		}
	}
}
