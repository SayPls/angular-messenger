import {User} from "./user";
import {Message} from "./message";

export interface Chat {
  id: number;
  author: User;
  messages: Message[];
}
