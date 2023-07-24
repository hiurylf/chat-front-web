import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable } from 'rxjs';
import { IUser } from '@interfaces/user';
import { IMessage } from '@interfaces/message';
import { AuthService } from '@services/auth/auth.service';
import { WebsocketService } from '@services/websocket/websocket.service';
import { Socket } from 'socket.io-client/build/esm/socket';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	socket: Socket;
	messageFormControl = new FormControl('');
	user$: Observable<IUser>;

	messages: IMessage[] = [];
	users: IUser[] = [];
	lastMessage?: IMessage;

	constructor(
		private readonly authService: AuthService,
		private readonly websocketService: WebsocketService
	) {
		this.user$ = this.authService.userAuth$.pipe(
			filter(data => !!data?.user),
			map(data => data!.user)
		);

		this.socket = this.websocketService.setupSocketConnection();
	}

	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (event.key === 'Enter' && this.messageFormControl.value) {
			this.onSendMessage();
		}
	}

	public onSendMessage(): void {
		const newMessage = structuredClone(this.messageFormControl.value);
		this.socket.emit('new-message', newMessage);

		this.messageFormControl.reset();
	}

	public ngOnInit(): void {
		this.socket.on('messages', (data: IMessage[]) => {
			this.messages = data;
		});

		this.socket.on('users', (data: IUser[]) => {
			this.users = data;
		});

		this.socket.on('new-message', (data: IMessage) => {
			console.log('new-message', data);
			this.lastMessage = data;

			setInterval(() => {
				this.lastMessage = undefined;
			}, 3000);
		});
	}

	public ngOnDestroy(): void {
		this.websocketService.disconnect();
	}
}
