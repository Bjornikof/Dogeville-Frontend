import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first, map} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication-service';
import {WingmanService} from '../services/wingman-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  resetPassword: FormGroup;
  submitted: boolean;


  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder,
              private router: Router, private route: ActivatedRoute, private wingmanService: WingmanService) {
    this.resetPassword = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email], this.mailValidator.bind(this)],
    });

  }

  get controls() {
    return this.resetPassword.controls;
  }

  mailValidator(control: AbstractControl) {
    return this.wingmanService.checkMail(control.value).pipe(
      map(res => {
        if (!res) {
          return {mailExists: true};
        } else {
          return null;
        }
      })
    );
  }


  goToLogin(): void {
    setTimeout(() => {
        const navigationDetails: string[] = ['/login'];
        this.router.navigate(navigationDetails);
      }
      , 2000);
  }

  sendCode() {
    if (this.resetPassword.invalid) {
      return;
    }
    this.wingmanService.getWingmanByMail(this.controls.mail.value).subscribe(
      response => {
        console.log(response);
        this.wingmanService.sendCode(response).subscribe(
          res => {
            console.log(res);
            this.submitted = true;
            this.goToLogin();
          }
        );
      }
    );
  }

}
