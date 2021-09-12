import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Wingman} from '../entities/wingman';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Wingman>;
  public currentUser: Observable<Wingman>;
  private baseUrl = 'http://localhost:8080/wingman';

  public get currentUserValue(): Wingman {
    return this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Wingman>(JSON.parse(localStorage.getItem('currentWingman')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  loginWingman(mail: string, password: string) {
    return this.http.post<any>(this.baseUrl + '/login', {mail, password}).pipe(
      map(wingman => {
        if (wingman && wingman.token) {
          localStorage.setItem('currentWingman', JSON.stringify(wingman));
          this.currentUserSubject.next(wingman);
        }
        return wingman;
      }));
  }


  logout() {
    localStorage.removeItem('currentWingman');
    this.currentUserSubject.next(null);
  }
}
