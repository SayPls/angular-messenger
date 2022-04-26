import {User} from "./user";
import {Message} from "./message";

export interface Chat {
  id: number;
  author: User;
  lastMessage: Date;
  messages: Message[];
}
