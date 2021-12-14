import { ContentChild, Injectable, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public $checkLogin = new Subject<boolean>()
  private httpOptions = {
    headers: new HttpHeaders({ "Access-Control-Allow-Origin": "window.location.origin" })
  };
  private url = environment.BACKEND_URL;
  private api = { register: `${this.url}/api/auth/register`, login:`${this.url}/api/auth/login` };
  constructor(private http: HttpClient) { }


  register(user: any): Observable<void> {
    return this.http.post<void>(this.api.register, user, this.httpOptions)
  }
  login(user:any):Observable<void>{
    return this.http.post<void>(this.api.login , user , this.httpOptions)
  }
  logOut():void{
    localStorage.removeItem('user')
  }
  
}
