import { IUser } from '@interfaces/user';

export interface IMessage {
	id: string;
	text: string;
	user?: IUser;
	userId?: string;
	createdAt?: string;
}
