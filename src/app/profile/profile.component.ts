import {Component, OnInit} from '@angular/core';
import {WingmanService} from '../services/wingman-service';
import {
  faGraduationCap,
  faVenusMars,
  faBirthdayCake,
  faUserMd,
  faGlobeEurope,
  faMap,
  faMapMarkedAlt,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Wingman} from '../entities/wingman';
import {distinctUntilChanged} from 'rxjs/operators';
import {Router} from '@angular/router';

class ValueAndText {
  constructor(public Value: string, public Text: string) {
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  wingman: Wingman = new Wingman();
  submitted = false;
  errors = null;
  profilephoto;
  gender;
  mail;
  model;
  country_values: ValueAndText[] = [new ValueAndText('TURKEY', 'TURKEY')];
  state_values: ValueAndText[] = [
    new ValueAndText('ANKARA', 'ANKARA'),
    new ValueAndText('İSTANBUL', 'İSTANBUL')];
  ist_values: ValueAndText[] = [
    new ValueAndText('ADALAR', 'ADALAR'),
    new ValueAndText('ARNAVUTKÖY', 'ARNAVUTKÖY'),
    new ValueAndText('ATAŞEHİR', 'ATAŞEHİR'),
    new ValueAndText('AVCILAR', 'AVCILAR'),
    new ValueAndText('BAĞCILAR', 'BAĞCILAR'),
    new ValueAndText('BAHÇELİEVLER', 'BAHÇELİEVLER'),
    new ValueAndText('BAKIRKÖY', 'BAKIRKÖY'),
    new ValueAndText('BAŞAKŞEHİR', 'BAŞAKŞEHİR'),
    new ValueAndText('BAYRAMPAŞA', 'BAYRAMPAŞA'),
    new ValueAndText('BEŞİKTAŞ', 'BEŞİKTAŞ'),
    new ValueAndText('BEYKOZ', 'BEYKOZ'),
    new ValueAndText('BEYLİKDÜZÜ', 'BEYLİKDÜZÜ'),
    new ValueAndText('BEYOĞLU', 'BEYOĞLU'),
    new ValueAndText('BÜYÜKÇEKMECE', 'BÜYÜKÇEKMECE'),
    new ValueAndText('ÇATALCA', 'ÇATALCA'),
    new ValueAndText('ÇEKMEKÖY', 'ÇEKMEKÖY'),
    new ValueAndText('ESENLER', 'ESENLER'),
    new ValueAndText('ESENYURT', 'ESENYURT'),
    new ValueAndText('EYÜPSULTAN', 'EYÜPSULTAN'),
    new ValueAndText('FATİH', 'FATİH'),
    new ValueAndText('GAZİOSMANPAŞA', 'GAZİOSMANPAŞA'),
    new ValueAndText('GÜNGÖREN', 'GÜNGÖREN'),
    new ValueAndText('KADIKÖY', 'KADIKÖY'),
    new ValueAndText('KAĞITHANE', 'KAĞITHANE'),
    new ValueAndText('KARTAL', 'KARTAL'),
    new ValueAndText('KÜÇÜKÇEKMECE', 'KÜÇÜKÇEKMECE'),
    new ValueAndText('MALTEPE', 'MALTEPE'),
    new ValueAndText('PENDİK', 'PENDİK'),
    new ValueAndText('SANCAKTEPE', 'SANCAKTEPE'),
    new ValueAndText('SARIYER', 'SARIYER'),
    new ValueAndText('SİLİVRİ', 'SİLİVRİ'),
    new ValueAndText('SULTANBEYLİ', 'SULTANBEYLİ'),
    new ValueAndText('SULTANGAZİ', 'SULTANGAZİ'),
    new ValueAndText('ŞİLE', 'ŞİLE'),
    new ValueAndText('ŞİŞLİ', 'ŞİŞLİ'),
    new ValueAndText('TUZLA', 'TUZLA'),
    new ValueAndText('ÜMRANİYE', 'ÜMRANİYE'),
    new ValueAndText('ÜSKÜDAR', 'ÜSKÜDAR'),
    new ValueAndText('ZEYTİNBURNU', 'ZEYTİNBURNU')];

  ankara_values: ValueAndText[] = [
    new ValueAndText('AKYURT', 'AKYURT'),
    new ValueAndText('ALTINDAĞ', 'ALTINDAĞ'),
    new ValueAndText('AYAŞ', 'AYAŞ'),
    new ValueAndText('BALA', 'BALA'),
    new ValueAndText('BEYPAZARI', 'BEYPAZARI'),
    new ValueAndText('ÇAMLIDERE', 'ÇAMLIDERE'),
    new ValueAndText('ÇANKAYA', 'ÇANKAYA'),
    new ValueAndText('ÇUBUK', 'ÇUBUK'),
    new ValueAndText('ELMADAĞ', 'ELMADAĞ'),
    new ValueAndText('ETİMESGUT', 'ETİMESGUT'),
    new ValueAndText('EVREN', 'EVREN'),
    new ValueAndText('GÖLBAŞI', 'GÖLBAŞI'),
    new ValueAndText('GÜDÜL', 'GÜDÜL'),
    new ValueAndText('HAYMANA', 'HAYMANA'),
    new ValueAndText('KAHRAMANKAZAN', 'KAHRAMANKAZAN'),
    new ValueAndText('KALECİK', 'KALECİK'),
    new ValueAndText('KEÇİÖREN', 'KEÇİÖREN'),
    new ValueAndText('KIZILCAHAMAM', 'KIZILCAHAMAM'),
    new ValueAndText('MAMAK', 'MAMAK'),
    new ValueAndText('NALLIHAN', 'NALLIHAN'),
    new ValueAndText('POLATLI', 'POLATLI'),
    new ValueAndText('PURSAKLAR', 'PURSAKLAR'),
    new ValueAndText('SİNCAN', 'SİNCAN'),
    new ValueAndText('ŞEREFLİKOÇHİSAR', 'ŞEREFLİKOÇHİSAR'),
    new ValueAndText('YENİMAHALLE', 'YENİMAHALLE')];
  profile: FormGroup;
  faGraduationCap = faGraduationCap;
  faVenusMars = faVenusMars;
  faBirthdayCake = faBirthdayCake;
  faUserMd = faUserMd;
  faGlobeEurope = faGlobeEurope;
  faMap = faMap;
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;

  constructor(private wingmanService: WingmanService, private formBuilder: FormBuilder, private parserFormatter: NgbDateParserFormatter,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getWingman();
    this.profile = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      surname: ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      education: ['', Validators.pattern('[^0-9]*')],
      job: ['', Validators.pattern('[^0-9]*')],
      country: ['', Validators.required],
      state: ['', Validators.required],
      county: ['', Validators.required]
    });

    this.profile.controls['state'].valueChanges.pipe(
      distinctUntilChanged()).subscribe(data => {
      if (data === 'İSTANBUL') {
        this.profile.controls.county.setValue(this.ist_values[0].Value);
        this.profile.controls.county.updateValueAndValidity();
      } else {
        this.profile.controls.county.setValue(this.ankara_values[0].Value);
        this.profile.controls.county.updateValueAndValidity();
      }
    });

  }

  get controls() {
    return this.profile.controls;
  }

  getProfile(pp, gender): void {
    if (pp === null) {
      if (gender === 'Female') {
        this.profilephoto = 'assets/wingman_female_square.png';
      } else {
        this.profilephoto = 'assets/wingman_male_square.png';
      }
    } else {
      this.getImage();
    }
  }

  goToProfile(): void {
    setTimeout(() => {
        window.location.reload();
      }
      , 2000);
  }


  getWingman(): void {
    this.wingmanService.getWingmanByMail(JSON.parse(localStorage.getItem('currentWingman')).mail).subscribe(
      response => {
        const ngbDate: NgbDateStruct = {
          // tslint:disable-next-line:radix
          year: parseInt(response.wmbirth.substring(0, 4)),
          // tslint:disable-next-line:radix
          month: parseInt(response.wmbirth.substring(5, 7)),
          // tslint:disable-next-line:radix
          day: parseInt(response.wmbirth.substring(8, 10)),
        };
        console.log(ngbDate);
        this.mail = response.wmmail;
        this.profile.patchValue({
          name: response.wmname,
          surname: response.wmsurname,
          gender: response.wmgender,
          education: response.wmedu,
          birthday: ngbDate,
          job: response.wmjob,
          country: response.wmcountry,
          state: response.wmstate,
          county: response.wmcounty,
        });
        localStorage.setItem('wingmanGender', JSON.stringify(response.wmgender));
        this.getProfile(response.wmphoto, response.wmgender);
      },
      error => {
        this.errors = error;
        console.log(error);
      });
  }

  getImage() {
    this.wingmanService.downloadImage(JSON.parse(localStorage.getItem('currentWingman')).mail)
      .subscribe(
        response => {
          this.profilephoto = 'data:image/jpeg;base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(response)));
        },
        error => {
          console.log(error);
        }
      );
  }


  editWingman(): void {
    if (this.profile.invalid) {
      Object.keys(this.profile.controls).forEach(key => {
        this.profile.get(key).markAsDirty();
      });
      return;
    }
    this.wingman.wmbirth = this.parserFormatter.format(this.model);
    console.log(this.wingman.wmbirth);
    this.wingman.wmmail = this.mail;
    this.submitted = true;
    this.wingmanService.editWingman(this.wingman.wmmail, this.wingman.wmname, this.wingman.wmsurname,
      this.wingman.wmgender, this.wingman.wmbirth, this.wingman.wmedu, this.wingman.wmjob,
      this.wingman.wmcountry, this.wingman.wmstate, this.wingman.wmcounty).subscribe(
      response => {
        this.submitted = true;
        this.goToProfile();
      },
      error => {
        this.errors = error;
        console.log(error);
      });
  }
}



