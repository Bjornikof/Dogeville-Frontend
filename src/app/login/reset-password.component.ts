import {Component, OnInit} from '@angular/core';
import {Wingman} from '../entities/wingman';
import {WingmanService} from '../services/wingman-service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../helpers/must-match.validator';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-change-pw',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ResetComponent implements OnInit {
  wingman: Wingman = new Wingman();
  resetPw: FormGroup;
  valid;
  code;
  password;

  constructor(private service: WingmanService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.queryParamMap.get('code');
    this.resetPw = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'repeatPassword')
    });
  }

  get controls() {
    return this.resetPw.controls;
  }

  goToLogin(): void {
    setTimeout(() => {
        const navigationDetails: string[] = ['/login'];
        this.router.navigate(navigationDetails);
      }
      , 2000);
  }

  changePassword(): void {
    if (this.resetPw.invalid) {
      Object.keys(this.resetPw.controls).forEach(key => {
        this.resetPw.get(key).markAsDirty();
      });
      return;
    }
    this.service.updatePasswordWithCode(this.code, this.controls.newPassword.value).subscribe(
      response => {
        if (response) {
          this.valid = true;
          this.password = false;
          this.goToLogin();
        } else {
          this.password = true;
          this.valid = false;
        }
      }
    );
  }
}
