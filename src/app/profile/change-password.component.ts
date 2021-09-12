import {Component, OnInit} from '@angular/core';
import {Wingman} from '../entities/wingman';
import {WingmanService} from '../services/wingman-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../helpers/must-match.validator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-password.component.html',
  styleUrls: ['./profile.component.css']
})
export class ChangePasswordComponent implements OnInit {
  wingman: Wingman = new Wingman();
  pw: FormGroup;
  valid;
  password;

  constructor(private service: WingmanService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.pw = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'repeatPassword')
    });
  }


  get controls() {
    return this.pw.controls;
  }

  goToProfile(): void {
    setTimeout(() => {
        const navigationDetails: string[] = ['/myprofile'];
        this.router.navigate(navigationDetails);
      }
      , 2000);
  }


  changePassword(): void {
    if (this.pw.invalid) {
      Object.keys(this.pw.controls).forEach(key => {
        this.pw.get(key).markAsDirty();
      });
      return;
    }
    this.service.updatePassword(JSON.parse(localStorage.getItem('currentWingman')).mail, this.controls.newPassword.value,
      this.controls.password.value).subscribe(
      response => {
        if (response) {
          this.valid = true;
          this.password = false;
          this.goToProfile();
        } else {
          this.password = true;
          this.valid = false;
        }
      }
    );
  }
}
