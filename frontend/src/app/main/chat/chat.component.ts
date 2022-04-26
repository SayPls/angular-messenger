import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../core/model/chat";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent {
  @Input() chat!: Chat;

  constructor(public authService: AuthService) { }
}
