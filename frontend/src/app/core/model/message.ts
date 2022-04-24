import {User} from "./user";

export interface Message {
  author: User;
  value: string;
  date: Date;
}
