import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Wingman} from '../entities/wingman';

@Injectable({
  providedIn: 'root'
})
export class WingmanService {

  private baseUrl = 'http://localhost:8080/wingman';

  constructor(private http: HttpClient) {
  }


  registerWingman(data): Observable<Wingman> {
    return this.http.post<Wingman>(this.baseUrl + '/register', data);
  }

  sendCode(data): Observable<Wingman> {
    console.log(data);
    return this.http.post<Wingman>(this.baseUrl + '/reset', data);
  }

  editWingman(mail: string, name: string, surname: string, gender: string, birth: string, edu: string,
              job: string, country: string, state: string, county: string): Observable<any> {
    const params = new HttpParams().set('mail', mail).set('name', name).set('surname', surname)
      .set('gender', gender).set('birth', birth).set('edu', edu).set('job', job)
      .set('country', country).set('state', state).set('county', county);
    console.log(params);
    return this.http.get<any>(`${this.baseUrl}/edit`, {params});
  }


  getWingmanByMail(mail: string) {
    return this.http.get<any>(`${this.baseUrl}/find/${mail}`);
  }

  checkMail(mail: string) {
    return this.http.get<any>(`${this.baseUrl}/mail/${mail}`);
  }

  verify(code: string) {
    return this.http.get(`${this.baseUrl}/verify`, {
      params: new HttpParams().set('code', code)
    });
  }

  updateMail(mail: string, newmail: string, password: string) {
    return this.http.get(`${this.baseUrl}/changemail`, {
      params: new HttpParams().set('mail', mail).set('newmail', newmail).set('password', password)
    });
  }

  updatePasswordWithCode(code: string, newpassword: string) {
    return this.http.get(`${this.baseUrl}/password`, {
      params: new HttpParams().set('code', code).set('newpassword', newpassword)
    });
  }


  updatePassword(mail: string, newpassword: string, password: string) {
    return this.http.get(`${this.baseUrl}/changepw`, {
      params: new HttpParams().set('mail', mail).set('newpassword', newpassword).set('password', password)
    });
  }

  downloadImage(mail: string): Observable<any> {
    const params = new HttpParams().set('mail', mail);
    console.log(params);
    return this.http.get<any>(`${this.baseUrl}/photo/download`, {params});
  }

  loginVerification(mail: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/login/ver/${mail}`);
  }


}
