import { Injectable } from '@angular/core';
import {Auth, authState, signInWithPopup, signOut} from "@angular/fire/auth";
import {GoogleAuthProvider} from "firebase/auth"
import {from} from "rxjs";
import {Router} from "@angular/router";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = authState(this.auth);

  constructor(
    private auth: Auth,
    private router: Router,
    private notification: NotificationService
  ) {}

  signInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(() => this.router.navigate(['main'])
        .then(() => this.notification.showSuccessMessage('You have successfully logged in', 'Welcome back!'))
    ));
  }

  logOut() {
    return from(signOut(this.auth).then(() => this.router.navigate([''])));
  }
}
