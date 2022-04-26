import {Injectable} from '@angular/core';
import {Message} from "../model/message";
import {Chat} from "../model/chat";
import {HttpClient} from "@angular/common/http";
import { mergeMap, timer} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {}

  getChatsServer() {
    return  this.http.get<Chat[]>(environment.apiFakeUrl);
  }

  createMessage(id: number, chat: Chat) {
    return this.http.put<Chat>(`${environment.apiFakeUrl}/${id}`, chat);
  }

  getFakeResp() {
    return timer(10000).pipe(mergeMap(() => this.http.get<Message>(environment.apiUrl)));
  }
}
