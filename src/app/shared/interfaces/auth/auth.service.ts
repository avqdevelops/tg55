import { ContentChild, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.BACKEND_URL;
  private api = { register: `${this.url}/api/auth/register` };
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private http: HttpClient) { }


  register(user: any): Observable<void> {
    return this.http.post<void>(this.api.register, user)
  }
}
