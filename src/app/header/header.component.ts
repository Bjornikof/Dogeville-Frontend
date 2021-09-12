import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication-service';
import {
  faPaw,
  faEnvelopeOpen
} from '@fortawesome/free-solid-svg-icons';
import {Wingman} from '../entities/wingman';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: Wingman;
  faPaw = faPaw;
  faEnvelopeOpen = faEnvelopeOpen;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnInit() {
  }

  logoutWingman() {
    this.authenticationService.logout();
    location.reload(true);
  }
}
