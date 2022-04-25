import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      tapToDismiss: true,
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
