import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pet} from '../entities/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl = 'http://localhost:8080/pet';

  constructor(private http: HttpClient) {
  }

  getDogsByWingman(uuid: string) {
    return this.http.get<any>(`${this.baseUrl}/find/dog/${uuid}`);
  }

  getCatsByWingman(uuid: string) {
    return this.http.get<any>(`${this.baseUrl}/find/cat/${uuid}`);
  }

  getCurrentPet(uuid: string) {
    console.log(uuid);
    return this.http.get<any>(`${this.baseUrl}/find/${uuid}`);
  }

  downloadPetImage(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    console.log(params);
    return this.http.get<any>(`${this.baseUrl}/photo/download`, {params});
  }

  addPet(data): Observable<Pet> {
    return this.http.post<Pet>(this.baseUrl, data);
  }

  editPet(data) {
    console.log(data);
    return this.http.put<Pet>(`${this.baseUrl}/edit`, data);
  }

  deletePet(uuid: string) {
    return this.http.delete<any>(`${this.baseUrl}/delete/${uuid}`);
  }

  searchPet(type: string, breed: string, gender: string, country: string, state: string, county: string): Observable<any> {
    const params = new HttpParams().set('type', type).set('breed', breed).set('gender', gender)
      .set('country', country).set('state', state).set('county', county);
    console.log(params);
    return this.http.get<any>(`${this.baseUrl}/search`, {params});
  }

}
