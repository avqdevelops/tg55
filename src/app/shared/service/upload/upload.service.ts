import { AppRoutingModule } from './../../../app-routing.module';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = environment.BACKEND_URL;
  private api = {
     upload: `${this.url}/api/img/upload`,
     delete: `${this.url}/api/img/delete`
    }
  constructor(private http:HttpClient) { }

  uploadeImage(image:any):Observable<string>{
    return this.http.post<string>(this.api.upload, image);
  }

  deleteImage(name:string):Observable<void>{
  return this.http.post<void>(this.api.delete , name);
  }



}
