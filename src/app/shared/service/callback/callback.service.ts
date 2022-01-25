import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallbackService {
  private url = environment.BACKEND_URL;
  private api = {
    callback: `${this.url}/api/callback`
   }
  constructor(
    private http:HttpClient
  ) { }

  createCallback(callback:any):Observable<void>{
    return this.http.post<void>(this.api.callback, callback);
  }

  getCallback():Observable<any>{
    return this.http.get<any>(this.api.callback);
  }

  getCallbackById(id:any):Observable<any>{
   return this.http.get<any>(`${this.api.callback}/${id}`)
  }

  removeCallback(id:any):Observable<void>{
    return this.http.delete<void>(`${this.api.callback}/${id}`)
  }

}
