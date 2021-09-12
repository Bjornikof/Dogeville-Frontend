import {Component, OnInit} from '@angular/core';
import {
  faCat,
  faDog,
  faPaw,
  faVenusMars,
  faGlobeEurope,
  faMap,
  faMapMarkedAlt,
  faBirthdayCake,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {PetService} from '../services/pet-service';
import {Pet} from '../entities/pet';
import {WingmanService} from '../services/wingman-service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {distinctUntilChanged} from 'rxjs/operators';

class ValueAndText {
  constructor(public Value: string, public Text: string) {
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search-pet.component.html',
  styleUrls: ['./search-pet.component.css']
})
export class SearchPetComponent implements OnInit {
  pet: Pet = new Pet();
  resultset = [];
  pageSize = 5;
  clicked = false;
  page = 1;
  search: FormGroup;
  photo;
  errors = null;
  breed_dog_values: ValueAndText[] = [new ValueAndText('null', 'Breed (ALL)'),
    new ValueAndText('Affenpinscher', 'Affenpinscher'),
    new ValueAndText('Afghan Hound', 'Afghan Hound'),
    new ValueAndText('Airedale Terrier', 'Airedale Terrier'),
    new ValueAndText('Akita Inu', 'Akita Inu'),
    new ValueAndText('Alaskan Klee Kai', 'Alaskan Klee Kai'),
    new ValueAndText('Alaskan Malamute', 'Alaskan Malamute'),
    new ValueAndText('American Akita', 'American Akita'),
    new ValueAndText('American Bulldog', 'American Bulldog'),
    new ValueAndText('American Bully', 'American Bully'),
    new ValueAndText('American English Coonhound', 'American English Coonhound'),
    new ValueAndText('American Eskimo Dog', 'American Eskimo Dog'),
    new ValueAndText('American Foxhound', 'American Foxhound'),
    new ValueAndText('American Pit Bull Terrier', 'American Pit Bull Terrier'),
    new ValueAndText('American Staffordshire Terrier', 'American Staffordshire Terrier'),
    new ValueAndText('American Water Spaniel', 'American Water Spaniel'),
    new ValueAndText('Anatolian Shepherd Dog', 'Anatolian Shepherd Dog'),
    new ValueAndText('Appenzeller Sennenhunde', 'Appenzeller Sennenhunde'),
    new ValueAndText('Australian Bulldog', 'Australian Bulldog'),
    new ValueAndText('Australian Cattle', 'Australian Cattle'),
    new ValueAndText('Australian Kelpie', 'Australian Kelpie'),
    new ValueAndText('Australian Shepherd', 'Australian Shepherd'),
    new ValueAndText('Australian Terrier', 'Australian Terrier'),
    new ValueAndText('Azawakh', 'Azawakh'),
    new ValueAndText('Barbet', 'Barbet'),
    new ValueAndText('Basenji', 'Basenji'),
    new ValueAndText('Basset Hound', 'Basset Hound'),
    new ValueAndText('Beagle', 'Beagle'),
    new ValueAndText('Bearded Collie', 'Bearded Collie'),
    new ValueAndText('Beauceron', 'Beauceron'),
    new ValueAndText('Bedlington Terrier', 'Bedlington Terrier'),
    new ValueAndText('Belgian Griffon', 'Belgian Griffon'),
    new ValueAndText('Berger Picard', 'Berger Picard'),
    new ValueAndText('Bernedoodle', 'Bernedoodle'),
    new ValueAndText('Bernese Mountain Dog', 'Bernese Mountain Dog'),
    new ValueAndText('Bichon Frise', 'Bichon Frise'),
    new ValueAndText('Black and Tan Coonhound', 'Black and Tan Coonhound'),
    new ValueAndText('Black Mouth Cur', 'Black Mouth Cur'),
    new ValueAndText('Black Russian Terrier', 'Black Russian Terrier'),
    new ValueAndText('Bloodhound', 'Bloodhound'),
    new ValueAndText('Blue Lacy', 'Blue Lacy'),
    new ValueAndText('Bluetick Coonhound', 'Bluetick Coonhound'),
    new ValueAndText('Boerboel', 'Boerboel'),
    new ValueAndText('Bolognese', 'Bolognese'),
    new ValueAndText('Border Collie', 'Border Collie'),
    new ValueAndText('Border Terrier', 'Border Terrier'),
    new ValueAndText('Borzoi', 'Borzoi'),
    new ValueAndText('Boston Terrier', 'Boston Terrier'),
    new ValueAndText('Bouvier des Flandres', 'Bouvier des Flandres'),
    new ValueAndText('Boxer', 'Boxer'),
    new ValueAndText('Boykin Spaniel', 'Boykin Spaniel'),
    new ValueAndText('Bracco Italiano', 'Bracco Italiano'),
    new ValueAndText('Briard', 'Briard'),
    new ValueAndText('Brittany', 'Brittany'),
    new ValueAndText('Brussels Griffon', 'Brussels Griffon'),
    new ValueAndText('Bullmastiff', 'Bullmastiff'),
    new ValueAndText('Cairn Terrier', 'Cairn Terrier'),
    new ValueAndText('Canaan Dog', 'Canaan Dog'),
    new ValueAndText('Canary Mastiff', 'Canary Mastiff'),
    new ValueAndText('Cane Corso', 'Cane Corso'),
    new ValueAndText('Cardigan Welsh Corgi', 'Cardigan Welsh Corgi'),
    new ValueAndText('Catahoula Leopard Dog', 'Catahoula Leopard Dog'),
    new ValueAndText('Caucasian Shepherd', 'Caucasian Shepherd'),
    new ValueAndText('Cavalier King Charles Spaniel', 'Cavalier King Charles Spaniel'),
    new ValueAndText('Cesky Terrier', 'Cesky Terrier'),
    new ValueAndText('Chesapeake Bay Retriever', 'Chesapeake Bay Retriever'),
    new ValueAndText('Chihuahua', 'Chihuahua'),
    new ValueAndText('Chinese Crested Dog', 'Chinese Crested Dog'),
    new ValueAndText('Chinook Dog', 'Chinook Dog'),
    new ValueAndText('Chow Chow', 'Chow Chow'),
    new ValueAndText('Clumber Spaniel', 'Clumber Spaniel'),
    new ValueAndText('Cockapoo', 'Cockapoo'),
    new ValueAndText('Cocker Spaniel', 'Cocker Spaniel'),
    new ValueAndText('Coton de Tuléar', 'Coton de Tuléar'),
    new ValueAndText('Curly Coated Retriever', 'Curly Coated Retriever'),
    new ValueAndText('Czechoslovakian Wolfdog', 'Czechoslovakian Wolfdog'),
    new ValueAndText('Dachshund', 'Dachshund'),
    new ValueAndText('Dalmatian', 'Dalmatian'),
    new ValueAndText('Dandie Dinmont Terrier', 'Dandie Dinmont Terrier'),
    new ValueAndText('Doberman Pinscher', 'Doberman Pinscher'),
    new ValueAndText('Dogo Argentino', 'Dogo Argentino'),
    new ValueAndText('Dogue de Bordeaux', 'Dogue de Bordeaux'),
    new ValueAndText('Dutch Shepherd', 'Dutch Shepherd'),
    new ValueAndText('English Bull Dog', 'English Bull Dog'),
    new ValueAndText('English Bull Terrier', 'English Bull Terrier'),
    new ValueAndText('English Cocker Spaniel', 'English Cocker Spaniel'),
    new ValueAndText('English Foxhound', 'English Foxhound'),
    new ValueAndText('English Pointer', 'English Pointer'),
    new ValueAndText('English Setter', 'English Setter'),
    new ValueAndText('English Springer Spaniel', 'English Springer Spaniel'),
    new ValueAndText('Entlebucher Mountain Dog', 'Entlebucher Mountain Dog'),
    new ValueAndText('Field Spaniel', 'Field Spaniel'),
    new ValueAndText('Finnish Lapphund', 'Finnish Lapphund'),
    new ValueAndText('Finnish Spitz', 'Finnish Spitz'),
    new ValueAndText('Flat Coated Retriever', 'Flat Coated Retriever'),
    new ValueAndText('Fox Terrier', 'Fox Terrier'),
    new ValueAndText('French Bulldog', 'French Bulldog'),
    new ValueAndText('German Shepherd', 'German Shepherd'),
    new ValueAndText('German Shorthaired Pointer', 'German Shorthaired Pointer'),
    new ValueAndText('German Spitz', 'German Spitz'),
    new ValueAndText('German Wirehaired Pointer', 'German Wirehaired Pointer'),
    new ValueAndText('Giant Schnauzer', 'Giant Schnauzer'),
    new ValueAndText('Glen of Imaal Terrier', 'Glen of Imaal Terrier'),
    new ValueAndText('Goldador', 'Goldador'),
    new ValueAndText('Golden Retriever', 'Golden Retriever'),
    new ValueAndText('Goldendoodle', 'Goldendoodle'),
    new ValueAndText('Gordon Setter', 'Gordon Setter'),
    new ValueAndText('Great Dane', 'Great Dane'),
    new ValueAndText('Great Pyrenees', 'Great Pyrenees'),
    new ValueAndText('Greater Swiss Mountain Dog', 'Greater Swiss Mountain Dog'),
    new ValueAndText('Greyhound', 'Greyhound'),
    new ValueAndText('Harrier', 'Harrier'),
    new ValueAndText('Havanese', 'Havanese'),
    new ValueAndText('Ibizan Dog', 'Ibizan Dog'),
    new ValueAndText('Icelandic Sheepdog', 'Icelandic Sheepdog'),
    new ValueAndText('Irish Red and White Setter', 'Irish Red and White Setter'),
    new ValueAndText('Irish Setter', 'Irish Setter'),
    new ValueAndText('Irish Terrier', 'Irish Terrier'),
    new ValueAndText('Irish Water Spaniel', 'Irish Water Spaniel'),
    new ValueAndText('Irish Wolfhound', 'Irish Wolfhound'),
    new ValueAndText('Italian Greyhound', 'Italian Greyhound'),
    new ValueAndText('Jack Russell Terrier', 'Jack Russell Terrier'),
    new ValueAndText('Japanese Chin', 'Japanese Chin'),
    new ValueAndText('Japanese Spitz', 'Japanese Spitz'),
    new ValueAndText('Kai Ken', 'Kai Ken'),
    new ValueAndText('Kangal', 'Kangal'),
    new ValueAndText('Karelian Bear Dog', 'Karelian Bear Dog'),
    new ValueAndText('Keeshond', 'Keeshond'),
    new ValueAndText('Kerry Blue Terrier', 'Kerry Blue Terrier'),
    new ValueAndText('Komondor', 'Komondor'),
    new ValueAndText('Kooikerhondje', 'Kooikerhondje'),
    new ValueAndText('Korean Jindo Dog', 'Korean Jindo Dog'),
    new ValueAndText('Kuvasz', 'Kuvasz'),
    new ValueAndText('Labradoodle', 'Labradoodle'),
    new ValueAndText('Labrador Retriever', 'Labrador Retriever'),
    new ValueAndText('Lagotto Romagnolo', 'Lagotto Romagnolo'),
    new ValueAndText('Lancashire Heeler', 'Lancashire Heeler'),
    new ValueAndText('Lhasa Apso', 'Lhasa Apso'),
    new ValueAndText('Maltese', 'Maltese'),
    new ValueAndText('Miniature Bull Terrier', 'Miniature Bull Terrier'),
    new ValueAndText('Miniature Schnauzer', 'Miniature Schnauzer'),
    new ValueAndText('Newfoundland', 'Newfoundland'),
    new ValueAndText('Norfolk Terrier', 'Norfolk Terrier'),
    new ValueAndText('Papillon', 'Papillon'),
    new ValueAndText('Parague Ratter', 'Parague Ratter'),
    new ValueAndText('Pekingese', 'Pekingese'),
    new ValueAndText('Pembroke Welsh Corgi', 'Pembroke Welsh Corgi'),
    new ValueAndText('Pomeranian', 'Pomeranian'),
    new ValueAndText('Pug', 'Pug'),
    new ValueAndText('Rottweiler', 'Rottweiler'),
    new ValueAndText('Rough Collie', 'Rough Collie'),
    new ValueAndText('Samoyed', 'Samoyed'),
    new ValueAndText('Scottish Terrier', 'Scottish Terrier'),
    new ValueAndText('Shar Pei', 'Shar Pei'),
    new ValueAndText('Shiba Inu', 'Shiba Inu'),
    new ValueAndText('Shih Tzu', 'Shih Tzu'),
    new ValueAndText('Siberian Husky', 'Siberian Husky'),
    new ValueAndText('Smooth Collie', 'Smooth Collie'),
    new ValueAndText('Smooth Fox Terrier', 'Smooth Fox Terrier'),
    new ValueAndText('Spanish Greyhound', 'Spanish Greyhound'),
    new ValueAndText('St.Bernard', 'St.Bernard'),
    new ValueAndText('Standard Poodle', 'Standard Poodle'),
    new ValueAndText('Standard Schnauzer', 'Standard Schnauzer'),
    new ValueAndText('Swiss White Shepherd', 'Swiss White Shepherd'),
    new ValueAndText('Tibetan Mastiff', 'Tibetan Mastiff'),
    new ValueAndText('Vizsla', 'Vizsla'),
    new ValueAndText('West Highland White Terrier', 'West Highland White Terrier'),
    new ValueAndText('Whippet', 'Whippet'),
    new ValueAndText('Yorkshire Terrier', 'Yorkshire Terrier'),
    new ValueAndText('Lakeland Terrier', 'Lakeland Terrier'),
    new ValueAndText('Leonberger', 'Leonberger'),
    new ValueAndText('Lowchen', 'Lowchen'),
    new ValueAndText('Maltipoo', 'Maltipoo'),
    new ValueAndText('Manchester Terrier', 'Manchester Terrier'),
    new ValueAndText('Miniature Pinscher', 'Miniature Pinscher'),
    new ValueAndText('Mudi Dog', 'Mudi Dog'),
    new ValueAndText('Neapolitan Mastiff', 'Neapolitan Mastiff'),
    new ValueAndText('Norwegian Buhund', 'Norwegian Buhund'),
    new ValueAndText('Norwegian Lundehund', 'Norwegian Lundehund'),
    new ValueAndText('Norwich Terrier', 'Norwich Terrier'),
    new ValueAndText('Nova Scotia Duck Tolling Retriever', 'Nova Scotia Duck Tolling Retriever'),
    new ValueAndText('Old English Sheepdog', 'Old English Sheepdog'),
    new ValueAndText('Otterhound', 'Otterhound'),
    new ValueAndText('Peekapoo', 'Peekapoo'),
    new ValueAndText('Petit Basset Griffon Vendeen', 'Petit Basset Griffon Vendeen'),
    new ValueAndText('Pharaoh Hound', 'Pharaoh Hound'),
    new ValueAndText('Plott Dog', 'Plott Dog'),
    new ValueAndText('Pocket Beagle', 'Pocket Beagle'),
    new ValueAndText('Polish Lowland Sheepdog', 'Polish Lowland Sheepdog'),
    new ValueAndText('Pomsky', 'Pomsky'),
    new ValueAndText('Poodle', 'Poodle'),
    new ValueAndText('Portuguese Water Dog', 'Portuguese Water Dog'),
    new ValueAndText('Puggle', 'Puggle'),
    new ValueAndText('Puli', 'Puli'),
    new ValueAndText('Pyrenean Shepherd', 'Pyrenean Shepherd'),
    new ValueAndText('Rat Terrier', 'Rat Terrier'),
    new ValueAndText('Redbone Coonhound', 'Redbone Coonhound'),
    new ValueAndText('Rhodesian Ridgeback', 'Rhodesian Ridgeback'),
    new ValueAndText('Saluki', 'Saluki'),
    new ValueAndText('Schipperke', 'Schipperke'),
    new ValueAndText('Schnoodle', 'Schnoodle'),
    new ValueAndText('Scottish Deerhound', 'Scottish Deerhound'),
    new ValueAndText('Sealyham Terrier', 'Sealyham Terrier'),
    new ValueAndText('Shetland Sheepdog', 'Shetland Sheepdog'),
    new ValueAndText('Silken Windhound', 'Silken Windhound'),
    new ValueAndText('Australian Silky Terrier', 'Australian Silky Terrier'),
    new ValueAndText('Skye Terrier', 'Skye Terrier'),
    new ValueAndText('Sloughi', 'Sloughi'),
    new ValueAndText('Small Munsterlander Pointer', 'Small Munsterlander Pointer'),
    new ValueAndText('Soft Coated Wheaten Terrier', 'Soft Coated Wheaten Terrier'),
    new ValueAndText('Stabyhoun', 'Stabyhoun'),
    new ValueAndText('Staffordshire Bull Terrier', 'Staffordshire Bull Terrier'),
    new ValueAndText('Swedish Vallhund', 'Swedish Vallhund'),
    new ValueAndText('Sussex Spaniel', 'Sussex Spaniel'),
    new ValueAndText('Tibetan Spaniel', 'Tibetan Spaniel'),
    new ValueAndText('Tibetan Terrier', 'Tibetan Terrier'),
    new ValueAndText('Toy Fox Terrier', 'Toy Fox Terrier'),
    new ValueAndText('Treeing Tennessee Brindle', 'Treeing Tennessee Brindle'),
    new ValueAndText('Treeing Walker Coonhound', 'Treeing Walker Coonhound'),
    new ValueAndText('Weimaraner', 'Weimaraner'),
    new ValueAndText('Welsh Springer Spaniel', 'Welsh Springer Spaniel'),
    new ValueAndText('Welsh Terrier', 'Welsh Terrier'),
    new ValueAndText('Wirehaired Pointing Griffon', 'Wirehaired Pointing Griffon'),
    new ValueAndText('Xoloitzcuintli', 'Xoloitzcuintli'),
    new ValueAndText('Yorkipoo', 'Yorkipoo')];
  breed_cat_values: ValueAndText[] = [new ValueAndText('null', 'Breed (ALL)'),
    new ValueAndText('American Bobtail', 'American Bobtail'),
    new ValueAndText('American Curl', 'American Curl'),
    new ValueAndText('American Shorthair', 'American Shorthair'),
    new ValueAndText('American Wirehair', 'American Wirehair'),
    new ValueAndText('Balinese', 'Balinese'),
    new ValueAndText('Bengal', 'Bengal'),
    new ValueAndText('Birman', 'Birman'),
    new ValueAndText('Bombay', 'Bombay'),
    new ValueAndText('British Shorthair', 'British Shorthair'),
    new ValueAndText('Burmese', 'Burmese'),
    new ValueAndText('Chartreux', 'Chartreux'),
    new ValueAndText('Chausie', 'Chausie'),
    new ValueAndText('Colorpoint Shorthair', 'Colorpoint Shorthair'),
    new ValueAndText('Cornish Rex', 'Cornish Rex'),
    new ValueAndText('Devon Rex', 'Devon Rex'),
    new ValueAndText('Domestic ShortHair', 'Domestic ShortHair'),
    new ValueAndText('Egyptian Mau', 'Egyptian Mau'),
    new ValueAndText('European Burmese', 'European Burmese'),
    new ValueAndText('Exotic', 'Exotic'),
    new ValueAndText('Havana Brown', 'Havana Brown'),
    new ValueAndText('Highlander', 'Highlander'),
    new ValueAndText('Himalayan', 'Himalayan'),
    new ValueAndText('Japanese Bobtail', 'Japanese Bobtail'),
    new ValueAndText('Javanese', 'Javanese'),
    new ValueAndText('Korat', 'Korat'),
    new ValueAndText('Kurilian Bobtail', 'Kurilian Bobtail'),
    new ValueAndText('LaPerm', 'LaPerm'),
    new ValueAndText('Maine Coon', 'Maine Coon'),
    new ValueAndText('Manx', 'Manx'),
    new ValueAndText('Munchkin', 'Munchkin'),
    new ValueAndText('Norwegian Forest', 'Norwegian Forest'),
    new ValueAndText('Ocicat', 'Ocicat'),
    new ValueAndText('Oriental', 'Oriental'),
    new ValueAndText('Oriental Longhair', 'Oriental Longhair'),
    new ValueAndText('Persian', 'Persian'),
    new ValueAndText('Peterbald', 'Peterbald'),
    new ValueAndText('Pixiebob', 'Pixiebob'),
    new ValueAndText('Ragamuffin', 'Ragamuffin'),
    new ValueAndText('Ragdoll', 'Ragdoll'),
    new ValueAndText('Russian Blue', 'Russian Blue'),
    new ValueAndText('Savannah', 'Savannah'),
    new ValueAndText('Scottish Fold', 'Scottish Fold'),
    new ValueAndText('Selkirk Rex', 'Selkirk Rex'),
    new ValueAndText('Siamese', 'Siamese'),
    new ValueAndText('Siberian', 'Siberian'),
    new ValueAndText('Singapura', 'Singapura'),
    new ValueAndText('Snowshoe', 'Snowshoe'),
    new ValueAndText('Somali', 'Somali'),
    new ValueAndText('Sphynx', 'Sphynx'),
    new ValueAndText('Thai', 'Thai'),
    new ValueAndText('Tonkinese', 'Tonkinese'),
    new ValueAndText('Toyger', 'Toyger'),
    new ValueAndText('Turkish Angora', 'Turkish Angora'),
    new ValueAndText('Turkish Van', 'Turkish Van')];

  country_values: ValueAndText[] = [new ValueAndText('TURKEY', 'TURKEY')];

  state_values: ValueAndText[] = [new ValueAndText('null', 'State (ALL)'),
    new ValueAndText('ANKARA', 'ANKARA'),
    new ValueAndText('İSTANBUL', 'İSTANBUL')];
  ist_values: ValueAndText[] = [new ValueAndText('null', 'County (ALL)'),
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

  ankara_values: ValueAndText[] = [new ValueAndText(null, 'County (ALL)'),
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

  def_state: ValueAndText[] = [new ValueAndText('null', 'State (ALL)')];
  def_county: ValueAndText[] = [new ValueAndText('null', 'County (ALL)')];

  gender_values: ValueAndText[] = [new ValueAndText('null', 'Gender (ALL)'),
    new ValueAndText('Female', 'Female'),
    new ValueAndText('Male', 'Male')];
  type_values: ValueAndText[] = [new ValueAndText('dog', 'Dog'),
    new ValueAndText('cat', 'Cat')];
  faCat = faCat;
  defaultdogphoto = 'assets/doge_default.jpg';
  defaultcatphoto = 'assets/cat_default.jpg';
  faDog = faDog;
  faPaw = faPaw;
  faVenusMars = faVenusMars;
  faGlobeEurope = faGlobeEurope;
  faMap = faMap;
  faMapMarkedAlt = faMapMarkedAlt;
  faBirthdayCake = faBirthdayCake;
  faEnvelope = faEnvelope;
  type;
  breed;
  gender;
  country;
  state;
  county;
  county_select;
  breed_select;

  constructor(private petService: PetService, private wingmanService: WingmanService,
              private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.search = this.formBuilder.group({
      type: [this.type_values[0].Value],
      breed: [this.breed_dog_values[0].Value],
      gender: [this.gender_values[0].Value],
      country: [this.country_values[0].Value],
      state: [this.def_state[0].Value],
      county: [this.def_county[0].Value]
    });

    this.search.controls.type.valueChanges.pipe(
      distinctUntilChanged()).subscribe(data => {
      if (data === 'cat') {
        this.search.controls.breed.setValue(this.breed_cat_values[0].Value);
      } else {
        this.search.controls.breed.setValue(this.breed_dog_values[0].Value);
      }
      this.search.controls.breed.updateValueAndValidity();
    });

    this.search.controls['state'].valueChanges.pipe(
      distinctUntilChanged()).subscribe(data => {
      this.search.controls.county.setValue(this.def_county[0].Value);
      this.search.controls.county.updateValueAndValidity();
    });

    console.log(this.type_values[0].Value, this.gender_values[0].Value);
    this.county_select = 'County (ALL)';
    this.breed_select = 'Breed (ALL)';
  }

  get controls() {
    return this.search.controls;
  }

  getResults(): void {
    console.log(this.controls.type.value, this.controls.breed.value, this.controls.gender.value,
      this.controls.country.value, this.controls.state.value, this.controls.county.value);
    this.petService.searchPet(this.controls.type.value, this.controls.breed.value, this.controls.gender.value,
      this.controls.country.value, this.controls.state.value, this.controls.county.value).subscribe(res => {
      this.resultset = res;
      console.log(res);
      for (const result of this.resultset) {
        if (result.pphoto != null) {
          result.pphoto = 'data:image/jpeg;base64,' + result.pphoto;
        }
        if (result.wmid.wmphoto != null) {
          result.wmid.wmphoto = 'data:image/jpeg;base64,' + result.wmid.wmphoto;
        } else {
          if (result.wmid.wmgender === 'Female') {
            result.wmid.wmphoto = 'assets/wingman_female_square.png';
          } else {
            result.wmid.wmphoto = 'assets/wingman_male_square.png';
          }
        }
      }
    });
    setTimeout(() => {
        this.clicked = true;
      }
      , 1000);

  }

}



