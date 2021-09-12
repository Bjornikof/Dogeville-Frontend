import {Component, OnInit} from '@angular/core';
import {
  faDog,
  faVenusMars,
  faBirthdayCake,
  faPalette,
  faHeartBroken,
  faHeart,
  faStar,
  faQuestionCircle,
  faCalendar,
  faPaw,
  faCat
} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Pet} from '../entities/pet';
import {PetService} from '../services/pet-service';
import {WingmanService} from '../services/wingman-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  editPet: FormGroup;
  pet: Pet = new Pet();
  submitted = false;
  errors = null;
  model;
  petType;
  photo;
  breed_dog_values: any;
  breed_cat_values: any;
  faDog = faDog;
  faPaw = faPaw;
  faVenusMars = faVenusMars;
  faBirthdayCake = faBirthdayCake;
  faPalette = faPalette;
  faStar = faStar;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faQuestionCircle = faQuestionCircle;
  faCalendar = faCalendar;
  faCat = faCat;

  constructor(private petService: PetService, private wingmanService: WingmanService, private formBuilder: FormBuilder,
              private parserFormatter: NgbDateParserFormatter, private router: Router) {
  }

  ngOnInit(): void {
    this.getPet();
    this.petType = JSON.parse(localStorage.getItem('petType'));
    this.breed_dog_values = ['Affenpinscher',
      'Afghan Hound', 'Airedale Terrier', 'Akita Inu', 'Alaskan Klee Kai', 'Alaskan Malamute',
      'American Akita', 'American Bulldog', 'American Bully', 'American English Coonhound',
      'American Eskimo Dog',
      'American Foxhound',
      'American Pit Bull Terrier',
      'American Staffordshire Terrier',
      'American Water Spaniel',
      'Anatolian Shepherd Dog',
      'Appenzeller Sennenhunde',
      'Australian Bulldog',
      'Australian Cattle',
      'Australian Kelpie',
      'Australian Shepherd',
      'Australian Terrier',
      'Azawakh',
      'Barbet',
      'Basenji',
      'Basset Hound',
      'Beagle',
      'Bearded Collie',
      'Beauceron',
      'Bedlington Terrier',
      'Belgian Griffon',
      'Berger Picard',
      'Bernedoodle',
      'Bernese Mountain Dog',
      'Bichon Frise',
      'Black and Tan Coonhound',
      'Black Mouth Cur',
      'Black Russian Terrier',
      'Bloodhound',
      'Blue Lacy',
      'Bluetick Coonhound',
      'Boerboel',
      'Bolognese',
      'Border Collie',
      'Border Terrier',
      'Borzoi',
      'Boston Terrier',
      'Bouvier des Flandres',
      'Boxer',
      'Boykin Spaniel',
      'Bracco Italiano',
      'Briard',
      'Brittany',
      'Brussels Griffon',
      'Bullmastiff',
      'Cairn Terrier',
      'Canaan Dog',
      'Canary Mastiff',
      'Cane Corso',
      'Cardigan Welsh Corgi',
      'Catahoula Leopard Dog',
      'Caucasian Shepherd',
      'Cavalier King Charles Spaniel',
      'Cesky Terrier',
      'Chesapeake Bay Retriever',
      'Chihuahua',
      'Chinese Crested Dog',
      'Chinook Dog',
      'Chow Chow',
      'Clumber Spaniel',
      'Cockapoo',
      'Cocker Spaniel',
      'Coton de Tuléar',
      'Curly Coated Retriever',
      'Czechoslovakian Wolfdog',
      'Dachshund',
      'Dalmatian',
      'Dandie Dinmont Terrier',
      'Doberman Pinscher',
      'Dogo Argentino',
      'Dogue de Bordeaux',
      'Dutch Shepherd',
      'English Bull Dog',
      'English Bull Terrier',
      'English Cocker Spaniel',
      'English Foxhound',
      'English Pointer',
      'English Setter',
      'English Springer Spaniel',
      'Entlebucher Mountain Dog',
      'Field Spaniel',
      'Finnish Lapphund',
      'Finnish Spitz',
      'Flat Coated Retriever',
      'Fox Terrier',
      'French Bulldog',
      'German Shepherd',
      'German Shorthaired Pointer',
      'German Spitz',
      'German Wirehaired Pointer',
      'Giant Schnauzer',
      'Glen of Imaal Terrier',
      'Goldador',
      'Golden Retriever',
      'Goldendoodle',
      'Gordon Setter',
      'Great Dane',
      'Great Pyrenees',
      'Greater Swiss Mountain Dog',
      'Greyhound',
      'Harrier',
      'Havanese',
      'Ibizan Dog',
      'Icelandic Sheepdog',
      'Irish Red and White Setter',
      'Irish Setter',
      'Irish Terrier',
      'Irish Water Spaniel',
      'Irish Wolfhound',
      'Italian Greyhound',
      'Jack Russell Terrier',
      'Japanese Chin',
      'Japanese Spitz',
      'Kai Ken',
      'Kangal',
      'Karelian Bear Dog',
      'Keeshond',
      'Kerry Blue Terrier',
      'Komondor',
      'Kooikerhondje',
      'Korean Jindo Dog',
      'Kuvasz',
      'Labradoodle',
      'Labrador Retriever',
      'Lagotto Romagnolo',
      'Lancashire Heeler',
      'Lhasa Apso',
      'Maltese',
      'Miniature Bull Terrier',
      'Miniature Schnauzer',
      'Newfoundland',
      'Norfolk Terrier',
      'Papillon',
      'Parague Ratter',
      'Pekingese',
      'Pembroke Welsh Corgi',
      'Pomeranian',
      'Pug',
      'Rottweiler',
      'Rough Collie',
      'Samoyed',
      'Scottish Terrier',
      'Shar Pei',
      'Shiba Inu',
      'Shih Tzu',
      'Siberian Husky',
      'Smooth Collie',
      'Smooth Fox Terrier',
      'Spanish Greyhound',
      'St.Bernard',
      'Standard Poodle',
      'Standard Schnauzer',
      'Swiss White Shepherd',
      'Tibetan Mastiff',
      'Vizsla',
      'West Highland White Terrier',
      'Whippet',
      'Yorkshire Terrier',
      'Lakeland Terrier',
      'Leonberger',
      'Lowchen',
      'Maltipoo',
      'Manchester Terrier',
      'Miniature Pinscher',
      'Mudi Dog',
      'Neapolitan Mastiff',
      'Norwegian Buhund',
      'Norwegian Lundehund',
      'Norwich Terrier',
      'Nova Scotia Duck Tolling Retriever',
      'Old English Sheepdog',
      'Otterhound',
      'Peekapoo',
      'Petit Basset Griffon Vendeen',
      'Pharaoh Hound',
      'Plott Dog',
      'Pocket Beagle',
      'Polish Lowland Sheepdog',
      'Pomsky',
      'Poodle',
      'Portuguese Water Dog',
      'Puggle',
      'Puli',
      'Pyrenean Shepherd',
      'Rat Terrier',
      'Redbone Coonhound',
      'Rhodesian Ridgeback',
      'Saluki',
      'Schipperke',
      'Schnoodle',
      'Scottish Deerhound',
      'Sealyham Terrier',
      'Shetland Sheepdog',
      'Silken Windhound',
      'Australian Silky Terrier',
      'Skye Terrier',
      'Sloughi',
      'Small Munsterlander Pointer',
      'Soft Coated Wheaten Terrier',
      'Stabyhoun',
      'Staffordshire Bull Terrier',
      'Swedish Vallhund',
      'Sussex Spaniel',
      'Tibetan Spaniel',
      'Tibetan Terrier',
      'Toy Fox Terrier',
      'Treeing Tennessee Brindle',
      'Treeing Walker Coonhound',
      'Weimaraner',
      'Welsh Springer Spaniel',
      'Welsh Terrier',
      'Wirehaired Pointing Griffon',
      'Xoloitzcuintli',
      'Yorkipoo'];
    this.breed_cat_values = ['American Bobtail', 'American Curl', 'American Shorthair', 'American Wirehair', 'Balinese',
      'Bengal', 'Birman', 'Bombay', 'British Shorthair', 'Burmese', 'Chartreux', 'Chausie', 'Colorpoint Shorthair',
      'Cornish Rex',
      'Devon Rex',
      'Domestic ShortHair',
      'Egyptian Mau',
      'European Burmese',
      'Exotic',
      'Havana Brown',
      'Highlander',
      'Himalayan',
      'Japanese Bobtail',
      'Javanese',
      'Korat',
      'Kurilian Bobtail',
      'LaPerm',
      'Maine Coon',
      'Manx',
      'Munchkin',
      'Norwegian Forest',
      'Ocicat',
      'Oriental',
      'Oriental Longhair',
      'Persian',
      'Peterbald',
      'Pixiebob',
      'Ragamuffin',
      'Ragdoll',
      'Russian Blue',
      'Savannah',
      'Scottish Fold',
      'Selkirk Rex',
      'Siamese',
      'Siberian',
      'Singapura',
      'Snowshoe',
      'Somali',
      'Sphynx',
      'Thai',
      'Tonkinese',
      'Toyger',
      'Turkish Angora',
      'Turkish Van'];
    this.editPet = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      breed: ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      isBred: ['', Validators.required],
      color: ['', Validators.maxLength(25)],
      tricks: ['', Validators.maxLength(50)],
      favs: ['', Validators.maxLength(50)],
      dislikes: ['', Validators.maxLength(50)],
      letter: ['', Validators.maxLength(125)]
    });
  }

  get controls() {
    return this.editPet.controls;
  }

  goToPets(): void {
    setTimeout(() => {
        const navigationDetails: string[] = ['/mydoges'];
        this.router.navigate(navigationDetails);
      }
      , 2000);
  }

  getPet(): void {
    this.wingmanService.getWingmanByMail(JSON.parse(localStorage.getItem('currentWingman')).mail).subscribe(
      res => {
        this.pet.wmid = res.wmid;
        this.petService.getCurrentPet(JSON.parse(localStorage.getItem('currentPet'))).subscribe(
          response => {
            const ngbDate: NgbDateStruct = {
              // tslint:disable-next-line:radix
              year: parseInt(response.pbirth.substring(0, 4)),
              // tslint:disable-next-line:radix
              month: parseInt(response.pbirth.substring(5, 7)),
              // tslint:disable-next-line:radix
              day: parseInt(response.pbirth.substring(8, 10)),
            };
            this.editPet.patchValue({
              name: response.pname,
              breed: response.pbreed,
              gender: response.pgender,
              birthday: ngbDate,
              isBred: response.pisbred,
              color: response.pcolor,
              tricks: response.ptrick,
              favs: response.pfav,
              dislikes: response.pdislike,
              letter: response.pletter
            });
            this.photo = response.pphoto;
          },
          error => {
            this.errors = error;
            console.log(error);
          });
      });
  }

  editThisPet(): void {
    if (this.editPet.invalid) {
      Object.keys(this.editPet.controls).forEach(key => {
        this.editPet.get(key).markAsDirty();
      });
      return;
    }
    this.pet.pbirth = this.parserFormatter.format(this.model);
    this.pet.ptype = this.petType;
    this.pet.pphoto = this.photo;
    this.pet.pid = JSON.parse(localStorage.getItem('currentPet'));
    this.wingmanService.getWingmanByMail(JSON.parse(localStorage.getItem('currentWingman')).mail).subscribe(
      res => {
        this.pet.wmid = res;
        this.petService.editPet(this.pet).subscribe(
          response => {
            this.submitted = true;
            this.goToPets();
          },
          error => {
            this.errors = error;
            console.log(error);
          });
      });
  }
}



