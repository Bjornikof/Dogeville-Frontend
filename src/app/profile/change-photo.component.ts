import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Wingman} from '../entities/wingman';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {WingmanService} from '../services/wingman-service';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './change-photo.component.html',
  styleUrls: ['./profile.component.css']
})
export class ChangePhotoComponent implements OnInit {
  wingman: Wingman = new Wingman();
  retrievedImage: any = null;
  retrieveResponse: any;
  message: string;
  selectedFile: File;
  received = false;
  default_f = 'assets/wingman_female_square.png';
  default_m = 'assets/wingman_male_square.png';
  gender;
  valid = true;
  size = true;
  selected;
  submitted;


  constructor(private http: HttpClient, private service: WingmanService, private router: Router) {
  }

  ngOnInit(): void {
    this.gender = JSON.parse(localStorage.getItem('wingmanGender'));
    this.getImage();
    if (this.received === false) {
      if (this.gender === 'Female') {
        this.retrievedImage = this.default_f;
      } else {
        this.retrievedImage = this.default_m;
      }
    }
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
          this.size = true;
          this.valid = true;
        };
      }
    }
  }

  onUpload() {
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, JSON.parse(localStorage.getItem('currentWingman')).mail);
    this.http.post<any>('http://localhost:8080/wingman/photo/upload', uploadImageData, {observe: 'response'})
      .subscribe((response) => {
          this.submitted = true;
        this.goToProfile();
        }
      );
  }

  goToProfile(): void {
    setTimeout(() => {
        const navigationDetails: string[] = ['/myprofile'];
        this.router.navigate(navigationDetails);
    }
    , 2000);
  }

  getImage() {
    this.service.downloadImage(JSON.parse(localStorage.getItem('currentWingman')).mail)
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
