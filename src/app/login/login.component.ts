import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first, map} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication-service';
import {WingmanService} from '../services/wingman-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: FormGroup;
  returnUrl: string;
  submitted: boolean;


  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder,
              private router: Router, private route: ActivatedRoute, private wingmanService: WingmanService) {
    this.login = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email], this.loginValidator.bind(this)],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get controls() {
    return this.login.controls;
  }

  loginValidator(control: AbstractControl) {
    return this.wingmanService.loginVerification(control.value).pipe(
      map(res => {
        console.log(res, this.controls.password.value);
        if (res === 'noverification') {
          return {noVer: true};
        } else if (res === 'nomail') {
          return {noCred: true};
        } else {
          return null;
        }
      })
    );
  }


  goToRegister(): void {
    const navigationDetails: string[] = ['/register'];
    this.router.navigate(navigationDetails);
  }

  loginWingman() {
    this.submitted = true;
    if (this.login.invalid) {
      return;
    }
    this.authenticationService.loginWingman(this.controls.mail.value, this.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          Object.keys(this.login.controls).forEach(key => {
            this.login.get(key).markAsDirty();
          });
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
        });
  }

}
