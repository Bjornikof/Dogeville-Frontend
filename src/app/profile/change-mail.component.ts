import {Component, OnInit} from '@angular/core';
import {Wingman} from '../entities/wingman';
import {WingmanService} from '../services/wingman-service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-mail',
  templateUrl: './change-mail.component.html',
  styleUrls: ['./profile.component.css']
})
export class ChangeMailComponent implements OnInit {
  wingman: Wingman = new Wingman();
  mail: FormGroup;
  valid;
  password;

  constructor(private service: WingmanService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.mail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email], this.mailValidator.bind(this)],
      password: ['', Validators.required]
    });

  }

  get controls() {
    return this.mail.controls;
  }

  mailValidator(control: AbstractControl) {
    return this.service.checkMail(control.value).pipe(
      map(res => {
        if (!res) {
          return null;
        } else {
          return {mailExists: true};
        }
      })
    );
  }

  goToProfile(): void {
    setTimeout(() => {
        const navigationDetails: string[] = ['/myprofile'];
        this.router.navigate(navigationDetails);
      }
      , 2000);
  }

  changeMail(): void {
    if (this.mail.invalid) {
      Object.keys(this.mail.controls).forEach(key => {
        this.mail.get(key).markAsDirty();
      });
      return;
    }
    this.service.updateMail(JSON.parse(localStorage.getItem('currentWingman')).mail, this.controls.email.value,
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
