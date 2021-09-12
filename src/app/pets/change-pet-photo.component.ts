import {Component, OnInit} from '@angular/core';
import {Wingman} from '../entities/wingman';
import {HttpClient} from '@angular/common/http';
import {PetService} from '../services/pet-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pet-photo',
  templateUrl: './change-pet-photo.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class ChangePetPhotoComponent implements OnInit {
  pet: Wingman = new Wingman();
  retrievedImage: any = null;
  retrieveResponse: any;
  message: string;
  selectedFile: File;
  received = false;
  gender;
  valid = true;
  size = true;
  selected;
  submitted;
  defaultdogphoto = 'assets/doge_default.jpg';
  defaultcatphoto = 'assets/cat_default.jpg';


  constructor(private http: HttpClient, private service: PetService, private router: Router) {
  }

  ngOnInit(): void {
    this.getImage();
    if (this.received === false) {
      if (JSON.parse(localStorage.getItem('petType')) === 'dog') {
        this.retrievedImage = this.defaultdogphoto;
      } else {
        this.retrievedImage = this.defaultcatphoto;
      }
    }
  }

  goToPets(): void {
    setTimeout(() => {
        const navigationDetails: string[] = ['/mydoges'];
        this.router.navigate(navigationDetails);
      }
      , 2000);
  }

  public onFileChanged(event) {
    this.selected = true;
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const file: File = event.target.files[0];
      const pattern = /jpeg/;

      if (!file.type.match(pattern)) {
        this.valid = false;
        return;
      } else if (file.size > 300001) {
        this.size = false;
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.retrievedImage = reader.result;
        };
        this.size = true;
        this.valid = true;
      }
    }
  }

  onUpload() {
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, JSON.parse(localStorage.getItem('currentPet')));
    this.http.post<any>('http://localhost:8080/pet/photo/upload', uploadImageData, {observe: 'response'})
      .subscribe((response) => {
          this.submitted = true;
          this.goToPets();
        }
      );
  }

  getImage() {
    this.service.downloadPetImage(JSON.parse(localStorage.getItem('currentPet')))
      .subscribe(
        response => {
          console.log(response);
          if (response != null) {
            this.retrieveResponse = response;
            this.retrievedImage = 'data:image/jpeg;base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(response)));
            this.received = true;
          }
        }
      );
  }

}
