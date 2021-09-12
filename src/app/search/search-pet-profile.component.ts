import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PetService} from '../services/pet-service';
import {WingmanService} from '../services/wingman-service';
import {
  faBirthdayCake,
  faSeedling,
  faFire,
  faPalette,
  faStar,
  faHeart,
  faHeartBroken,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pet-result',
  templateUrl: './search-pet-profile.component.html',
  styleUrls: ['./search-pet-profile.component.css']
})
export class SearchPetProfileComponent implements OnInit {
  petId;
  resultset;
  defaultdogphoto = 'assets/doge_default.jpg';
  defaultcatphoto = 'assets/cat_default.jpg';
  faBirthdayCake = faBirthdayCake;
  faSeedling = faSeedling;
  faFire = faFire;
  faPalette = faPalette;
  faStar = faStar;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faEnvelope = faEnvelope;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private petService: PetService,
              private wingmanService: WingmanService) {
  }

  ngOnInit(): void {
    this.petId = this.activatedRoute.snapshot.queryParamMap.get('result');
    this.getPet();
  }

  getPet(): void {
    this.wingmanService.getWingmanByMail(JSON.parse(localStorage.getItem('currentWingman')).mail).subscribe(
      response => {
        this.petService.getCurrentPet(this.petId).subscribe(res => {
          this.resultset = res;
          if (res.pphoto != null) {
            res.pphoto = 'data:image/jpeg;base64,' + res.pphoto;
          }else {
            if (res.ptype === 'cat') {
              res.pphoto = this.defaultcatphoto;
            } else {
              res.pphoto = this.defaultdogphoto;
            }
          }
          if (res.pdislike === '') {
            res.pdislike = null;
          }
          if (res.pcolor === '') {
            res.pcolor = null;
          }
          if (res.pfav === '') {
            res.pfav = null;
          }
          if (res.ptrick === '') {
            res.ptrick = null;
          }
          if (res.pletter === '') {
            res.pletter = null;
          }
          if (res.wmid.wmphoto != null) {
            res.wmid.wmphoto = 'data:image/jpeg;base64,' + res.wmid.wmphoto;
          } else {
            if (res.wmid.wmgender === 'Female') {
              res.wmid.wmphoto = 'assets/wingman_female_square.png';
            } else {
              res.wmid.wmphoto = 'assets/wingman_male_square.png';
            }
          }
        });
      });
  }

}
