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
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {Pet} from '../entities/pet';
import {PetService} from '../services/pet-service';
import {WingmanService} from '../services/wingman-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  registerPet: FormGroup;
  pet: Pet = new Pet();
  submitted = false;
  errors = null;
  model;
  petType;
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
              private parserFormatter: NgbDateParserFormatter,
              private router: Router) {
  }

  ngOnInit(): void {
    this.petType = JSON.parse(localStorage.getItem('petType'));
    this.breed_dog_values = ['Doge\'s breed', 'Affenpinscher',
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
    this.breed_cat_values = ['Cat\'s breed', 'American Bobtail', 'American Curl', 'American Shorthair', 'American Wirehair', 'Balinese',
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
    this.registerPet = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      breed: ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      isBred: ['', Validators.required],
      color: ['', Validators.maxLength(20)],
      tricks: ['', Validators.maxLength(30)],
      favs: ['', Validators.maxLength(30)],
      dislikes: ['', Validators.maxLength(30)],
      letter: ['', Validators.maxLength(75)]
    });
  }

  get controls() {
    return this.registerPet.controls;
  }

  goToPets(): void {
    setTimeout(() => {
        const navigationDetails: string[] = ['/mydoges'];
        this.router.navigate(navigationDetails);
      }
      , 2000);
  }


  registerThisPet(): void {
    if (this.registerPet.invalid) {
      Object.keys(this.registerPet.controls).forEach(key => {
        this.registerPet.get(key).markAsDirty();
      });
      return;
    }
    this.pet.pbirth = this.parserFormatter.format(this.model);
    this.pet.ptype = this.petType;
    this.wingmanService.getWingmanByMail(JSON.parse(localStorage.getItem('currentWingman')).mail).subscribe(
      response => {
        this.pet.wmid = response;
        console.log(response);
        this.petService.addPet(this.pet).subscribe(
          res => {
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



