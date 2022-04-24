import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToMain = () => redirectLoggedInTo(['main']);

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./main/main.module')
      .then(m => m.MainModule),
    ...canActivate(redirectToLogin),
  },
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module')
        .then(m => m.AuthModule),
    ...canActivate(redirectToMain),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
