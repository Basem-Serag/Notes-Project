import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: '' , redirectTo:'signin', pathMatch: 'full'},
  {path: 'signin' , component: SignInComponent},
  {path: 'signup' , component: SignUpComponent},
  {path: 'signout' , component: SignOutComponent},
  {path: 'profile' , component: ProfileComponent},
  {path: '**' , component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
