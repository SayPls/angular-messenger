import {Injectable, OnDestroy} from '@angular/core';
import {Message} from "../model/message";
import {Chat} from "../model/chat";
import {HttpClient} from "@angular/common/http";
import { mergeMap, Subject, timer} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy{

  destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getChats() {
    let data = JSON.parse(localStorage.getItem('data') || '') as Chat[];
    return Promise.resolve(data);
  }
  addMessage(id: number, message: Message) {
    let data = JSON.parse(localStorage.getItem('data') || '') as Chat[];
    let chat = data.find(c => c.id === id);
    if(chat) {
      chat.messages.push(message);
      data = data.filter(s => s.id !== chat!.id);
      data.unshift(chat);
      localStorage.setItem('data', JSON.stringify(data))
      return Promise.resolve(chat);
    }
    return Promise.resolve({} as Chat);
  }

  getFakeResp() {
    return timer(10000).pipe(mergeMap(() => this.http.get<Message>(environment.apiUrl)));
  }
}
