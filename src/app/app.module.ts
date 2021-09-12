import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JwtInterceptor} from './services/jwt-interceptor';
import {WingmanService} from './services/wingman-service';
import {AuthGuard} from './services/auth-guard';
import {ErrorInterceptor} from './services/authentication-interceptor';
import {AuthenticationService} from './services/authentication-service';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {RegisterComponent} from './register/register.component';
import {RegisterSuccessComponent} from './register/register-success.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {ChangePhotoComponent} from './profile/change-photo.component';
import {ChangePasswordComponent} from './profile/change-password.component';
import {ChangeMailComponent} from './profile/change-mail.component';
import {PetService} from './services/pet-service';
import {MydogesComponent} from './pets/mydoges.component';
import {ChangePetPhotoComponent} from './pets/change-pet-photo.component';
import {AddPetComponent} from './pets/add-pet.component';
import {EditPetComponent} from './pets/edit-pet.component';
import {SearchPetComponent} from './search/search-pet.component';
import {SearchPetProfileComponent} from './search/search-pet-profile.component';
import {ForgotPasswordComponent} from './login/forgot-password.component';
import {ResetComponent} from './login/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    ProfileComponent,
    ChangePhotoComponent,
    ChangePasswordComponent,
    ChangeMailComponent,
    MydogesComponent,
    ChangePetPhotoComponent,
    AddPetComponent,
    EditPetComponent,
    SearchPetComponent,
    SearchPetProfileComponent,
    ForgotPasswordComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [WingmanService,
    AuthenticationService,
    AuthGuard,
    PetService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
