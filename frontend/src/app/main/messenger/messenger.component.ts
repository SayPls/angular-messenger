import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Chat} from "../../core/model/chat";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Message} from "../../core/model/message";
import {ChatService} from "../../core/services/chat.service";
import {Subject, takeUntil} from "rxjs";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.sass']
})
export class MessengerComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scrollMe', {static: false}) private myScrollContainer!: ElementRef;
  currentChat = {} as Chat;
  chats: Chat[] = [];
  form!: FormGroup;
  destroy$ = new Subject<void>();
  name = '';

  constructor(
    public authService: AuthService,
    private chatService: ChatService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getChats();
    this.scrollToBottom();
    this.form = new FormGroup({
      message: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
      ])
    })
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getChats() {
    this.chatService.getChats().then((resp) => this.chats = resp);
  }

  onChange(chat: Chat) {
      this.currentChat = chat;
  }

  logout() {
    this.authService.logOut();
  }

  scrollToBottom() {
    try {
      this.myScrollContainer.nativeElement.scrollTo(0, this.myScrollContainer.nativeElement.scrollHeight)
    } catch(err) { }
  }

  onSubmit() {
    let message = {
      value: this.form.get('message')?.value,
      author: {uid: '11', displayName: 'I am'},
      date: new Date()
    } as Message;
    this.chatService.addMessage(this.currentChat.id, message).then((resp) => {
      this.currentChat = resp
      this.getChats();
      this.postFakeMassage();
    })
    this.form.reset();
  }

  postFakeMassage() {
    let newMes = {author: this.currentChat.author, date: new Date()} as Message;
    let id = this.currentChat.id;
    this.chatService.getFakeResp()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(resp) => {
          newMes.value = resp.value;
          this.chatService.addMessage(id, newMes).then((resp) => {
            if(this.currentChat.id === resp.id)
                this.currentChat = resp;
            this.getChats();
            this.notification.showInfoMessage(resp.messages[resp.messages.length - 1].value ,resp.author.displayName);
        }
      )
    },
        error:() => this.notification.showErrorMessage('Something went wrong', 'Error')
      });
  }

  chatMes(chat: Chat): Message[] {
    return chat.messages.filter(a => a.author.uid === chat.author.uid);
  }
}
