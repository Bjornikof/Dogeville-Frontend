import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RegisterSuccessComponent} from './register/register-success.component';
import {AuthGuard} from './services/auth-guard';
import {ProfileComponent} from './profile/profile.component';
import {ChangePhotoComponent} from './profile/change-photo.component';
import {ChangeMailComponent} from './profile/change-mail.component';
import {ChangePasswordComponent} from './profile/change-password.component';
import {MydogesComponent} from './pets/mydoges.component';
import {ChangePetPhotoComponent} from './pets/change-pet-photo.component';
import {AddPetComponent} from './pets/add-pet.component';
import {EditPetComponent} from './pets/edit-pet.component';
import {SearchPetComponent} from './search/search-pet.component';
import {SearchPetProfileComponent} from './search/search-pet-profile.component';
import {ForgotPasswordComponent} from './login/forgot-password.component';
import {ResetComponent} from './login/reset-password.component';


const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'myprofile', component: ProfileComponent},
      {path: 'change/profile-photo', component: ChangePhotoComponent},
      {path: 'change/mail', component: ChangeMailComponent},
      {path: 'change/password', component: ChangePasswordComponent},
      {path: 'mydoges', component: MydogesComponent},
      {path: 'change/pet-photo', component: ChangePetPhotoComponent},
      {path: 'register/pet', component: AddPetComponent},
      {path: 'edit/pet', component: EditPetComponent},
      {path: 'pet', component: SearchPetProfileComponent},
    ]
  },
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'wingman/verify', component: RegisterSuccessComponent},
  {path: 'reset', component: ForgotPasswordComponent},
  {path: 'wingman/reset', component: ResetComponent},
  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchPetComponent},
  {path: '**', redirectTo: '/home'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

