import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { ContentChild, Injectable, OnDestroy, Type } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private url = environment.BACKEND_URL;
  private subScr!: Subscription;
  public userSubject: BehaviorSubject<any>;
  public $changeLoginSubject = new Subject<boolean>();
  public token:string = '';

  private api = {
    register: `${this.url}/api/auth/register`,
    login: `${this.url}/api/auth/login`,
    logout: `${this.url}/api/auth/logout`,
    refreshToken: `${this.url}/api/auth/refresh`,
    getUser: `${this.url}/api/auth/user`,
    loginGoogle: `${this.url}/api/auth/google/callback`
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<any>(null);
  }


  register(user:any){
    return this.http.post<any>(this.api.register, user,{ withCredentials: true })
    .pipe(map(user =>{
      this.token = user.token
        let userInfo: any = jwt_decode(user.token);
        this.userSubject.next(userInfo);
        this.$changeLoginSubject.next(true);
    }))
  }

  login(user: any) {
    return this.http.post<any>(this.api.login, user, { withCredentials: true })
      .pipe(map(user => {
        this.token = user.token
        let userInfo: any = jwt_decode(user.token);
        this.userSubject.next(userInfo);
        this.$changeLoginSubject.next(true);
      }));
  }

  logOut() {
    this.http.post<any>(this.api.logout, {}, { withCredentials: true }).subscribe();
    this.userSubject.next(null);
    this.$changeLoginSubject.next(true);
    this.token = '';
    this.router.navigate(['']);
    this.stopRefreshTokenTimer();
  }

  googleAuth():Observable<any>{
     return this.http.get<any>(this.api.loginGoogle)
  }

  refreshToken() {
    return this.http.post<any>(this.api.refreshToken, {}, { withCredentials: true })
      .pipe(map(user => {
        this.token = user.token
        let userInfo = jwt_decode(user.token);
        this.userSubject.next(userInfo);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  private refreshTokenTimeout: any;

  private startRefreshTokenTimer() {
    this.refreshTokenTimeout = setTimeout(() => this.subScr = this.refreshToken().subscribe(), 1680000);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  ngOnDestroy(): void {
    if (this.subScr) {
      this.subScr.unsubscribe()
    }
  }

}
