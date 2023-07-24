import { Component, Input } from '@angular/core';
import { IMessage } from '@interfaces/message';
import { IUser } from '@interfaces/user';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
	@Input() messages: IMessage[] = [];
	@Input() currentUser!: IUser;
}
