import { Injectable } from '@angular/core';
import {Auth, authState, signInWithPopup, signOut} from "@angular/fire/auth";
import {GoogleAuthProvider} from "firebase/auth"
import {from} from "rxjs";
import {Router} from "@angular/router";
import {Chats} from "../../shared/helpers/chats";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = authState(this.auth);

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  signInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(() => this.router.navigate(['main'])
        .then(() => localStorage.setItem('data', JSON.stringify(Chats)))
    ));
  }

  logOut() {
    return from(signOut(this.auth).then(() => this.router.navigate(['login'])));
  }
}
