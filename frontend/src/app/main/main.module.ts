import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import { MessengerComponent } from './messenger/messenger.component';
import {MainRoutingModule} from "./main-routing.module";
import { ChatComponent } from './chat/chat.component';
import {CoreModule} from "../core/core.module";

@NgModule({
  declarations: [
    MessengerComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    CoreModule,
  ]
})
export class MainModule { }
