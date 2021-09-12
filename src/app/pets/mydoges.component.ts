import {Component, OnInit} from '@angular/core';
import {
  faPlus,
  faBirthdayCake,
  faSeedling,
  faFire,
  faPalette,
  faStar,
  faHeart,
  faHeartBroken,
  faPenAlt,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {PetService} from '../services/pet-service';
import {Pet} from '../entities/pet';
import {WingmanService} from '../services/wingman-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-doges',
  templateUrl: './mydoges.component.html',
  styleUrls: ['./mydoges.component.css']
})
export class MydogesComponent implements OnInit {
  pet: Pet = new Pet();
  id;
  submitted = false;
  photo;
  errors = null;
  dogs = null;
  cats = null;
  faPlus = faPlus;
  defaultdogphoto = 'assets/doge_default.jpg';
  defaultcatphoto = 'assets/cat_default.jpg';
  faBirthdayCake = faBirthdayCake;
  faSeedling = faSeedling;
  faFire = faFire;
  faPalette = faPalette;
  faStar = faStar;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faPenAlt = faPenAlt;
  faTrashAlt = faTrashAlt;

  constructor(private petService: PetService, private wingmanService: WingmanService, private router: Router) {
  }

  ngOnInit(): void {
    this.getDogs();
    this.getCats();
    console.log(this.dogs);
  }

  changePhoto(id: string, type: string): void {
    localStorage.setItem('currentPet', JSON.stringify(id));
    localStorage.setItem('petType', JSON.stringify(type));
    const navigationDetails: string[] = ['/change/pet-photo'];
    this.router.navigate(navigationDetails);
  }

  goToEdit(id: string, type: string): void {
    localStorage.setItem('currentPet', JSON.stringify(id));
    localStorage.setItem('petType', JSON.stringify(type));
    const navigationDetails: string[] = ['/edit/pet'];
    this.router.navigate(navigationDetails);
  }

  goToAdd(type: string): void {
    localStorage.setItem('petType', JSON.stringify(type));
    const navigationDetails: string[] = ['/register/pet'];
    this.router.navigate(navigationDetails);
  }

  getDogs(): void {
    this.wingmanService.getWingmanByMail(JSON.parse(localStorage.getItem('currentWingman')).mail).subscribe(
      response => {
        this.petService.getDogsByWingman(response.wmid).subscribe(res => {
          this.dogs = res;
          for (const dog of this.dogs) {
            if (dog.pphoto != null) {
              dog.pphoto = 'data:image/jpeg;base64,' + dog.pphoto;
            }
            if (dog.pdislike === '') {
              dog.pdislike = null;
            }
            if (dog.pcolor === '') {
              dog.pcolor = null;
            }
            if (dog.pfav === '') {
              dog.pfav = null;
            }
            if (dog.ptrick === '') {
              dog.ptrick = null;
            }
            if (dog.pletter === '') {
              dog.pletter = null;
            }
          }
        });
      });
  }

  deletePet(id: string, name: string) {
    if (confirm(name + ' will be deleted. Are you sure?')) {
      this.wingmanService.getWingmanByMail(JSON.parse(localStorage.getItem('currentWingman')).mail).subscribe(
        res => {
          this.pet.wmid = res.wmid;
          this.petService.deletePet(id).subscribe(
            response => {
              setTimeout(() => {
                  window.location.reload();
                }
                , 1000);
            },
            error => {
              this.errors = error;
              console.log(error);
            });
        });
    }
  }

  getCats(): void {
    this.wingmanService.getWingmanByMail(JSON.parse(localStorage.getItem('currentWingman')).mail).subscribe(
      response => {
        this.petService.getCatsByWingman(response.wmid).subscribe(res => {
          this.cats = res;
          for (const cat of this.cats) {
            if (cat.pphoto != null) {
              cat.pphoto = 'data:image/jpeg;base64,' + cat.pphoto;
            }
            if (cat.pdislike === '') {
              cat.pdislike = null;
            }
            if (cat.pcolor === '') {
              cat.pcolor = null;
            }
            if (cat.pfav === '') {
              cat.pfav = null;
            }
            if (cat.ptrick === '') {
              cat.ptrick = null;
            }
            if (cat.pletter === '') {
              cat.pletter = null;
            }
          }
        });
      });
  }

}



