import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  goToRegister(): void {
    const navigationDetails: string[] = ['/register'];
    this.router.navigate(navigationDetails);
  }

}
