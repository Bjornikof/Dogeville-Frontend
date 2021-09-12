import {Component, OnInit} from '@angular/core';
import {Wingman} from '../entities/wingman';
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
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../helpers/must-match.validator';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Router} from '@angular/router';

class ValueAndText {
  constructor(public Value: string, public Text: string) {
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  wingman: Wingman = new Wingman();
  submitted = false;
  errors = null;
  model;
  country_values: ValueAndText[] = [ new ValueAndText(null, 'Country*'),
    new ValueAndText('TURKEY', 'TURKEY')];
  state_values: ValueAndText[] = [
    new ValueAndText(null, 'State*'),
    new ValueAndText('ANKARA', 'ANKARA'),
    new ValueAndText('İSTANBUL', 'İSTANBUL')];
  ist_values: ValueAndText[] = [
    new ValueAndText(null, 'County*'),
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
    new ValueAndText(null, 'County*'),
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
  register: FormGroup;
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
    this.register = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      surname: ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      education: ['', Validators.pattern('[^0-9]*')],
      job: ['', Validators.pattern('[^0-9]*')],
      country: ['', Validators.required],
      state: ['', Validators.required],
      county: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], this.mailValidator.bind(this)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'repeatPassword')
    });

    this.wingman.wmcountry = null;
    this.wingman.wmstate = null;
    this.wingman.wmcounty = null;

    this.register.controls['state'].valueChanges.pipe(
      distinctUntilChanged()).subscribe(data => {
      if (data === 'İSTANBUL') {
        this.register.controls.county.setValue(this.ist_values[0].Value);
        this.register.controls.county.updateValueAndValidity();
      } else {
        this.register.controls.county.setValue(this.ankara_values[0].Value);
        this.register.controls.county.updateValueAndValidity();
      }
    });
  }

  mailValidator(control: AbstractControl) {
    return this.wingmanService.checkMail(control.value).pipe(
      map(res => {
        if (!res) {
          return null;
        } else {
          return { mailExists : true };
        }
      })
    );
  }

  get controls() {
    return this.register.controls;
  }
  goToLogin(): void {
    setTimeout(() => {
        const navigationDetails: string[] = ['/login'];
        this.router.navigate(navigationDetails);
      }
      , 3000);
  }



  registerWingman(): void {
    if (this.register.invalid) {
      Object.keys(this.register.controls).forEach(key => {
        this.register.get(key).markAsDirty();
      });
      return;
    }
    this.wingman.wmbirth = this.parserFormatter.format(this.model);

    this.wingmanService.registerWingman(this.wingman).subscribe(
      response => {
        this.submitted = true;
        this.goToLogin();
      },
      error => {
        this.errors = error;
        console.log(error);
      });
  }
}



