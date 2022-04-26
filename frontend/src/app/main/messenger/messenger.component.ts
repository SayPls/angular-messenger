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
    this.chatService.getChatsServer().pipe(takeUntil(this.destroy$)).subscribe({
      next:(resp) => {
        this.chats = resp.sort((a, b) => new Date(b.lastMessage).getTime() - new Date(a.lastMessage).getTime());
    },
      error:() => this.notification.showErrorMessage('Something went wrong', 'Error')
    })
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
      author: {uid: '1000', displayName: 'I am'},
      date: new Date()
    } as Message;
    this.currentChat.messages.push(message);
    this.currentChat.lastMessage = message.date;
    this.chatService.createMessage(this.currentChat.id, this.currentChat).pipe(takeUntil(this.destroy$)).subscribe((resp) => {
      this.getChats();
      this.postFakeMassage(resp);
    })
    this.form.reset();
  }

  postFakeMassage(chatForMessage: Chat) {
    this.chatService.getFakeResp()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(resp) => {
          chatForMessage.messages.push({value: resp.value, author: chatForMessage.author, date: new Date} as Message)
          chatForMessage.lastMessage = new Date();
          this.chatService.createMessage(chatForMessage.id, chatForMessage).pipe(takeUntil(this.destroy$)).subscribe((resp) => {
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
}
