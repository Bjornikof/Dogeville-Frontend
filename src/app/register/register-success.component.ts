import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WingmanService} from '../services/wingman-service';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: []
})
export class RegisterSuccessComponent implements OnInit {
  code;
  verified = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private wingmanService: WingmanService) {
  }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.queryParamMap.get('code');

    this.wingmanService.verify(this.code).subscribe(
      response => {
        if (response === true) {
          this.verified = true;
        }
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  goToLogin(): void {
    const navigationDetails: string[] = ['/login'];
    this.router.navigate(navigationDetails);
  }

}
