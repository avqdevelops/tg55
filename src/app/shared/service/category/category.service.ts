import { IHeaderCategoryResponce } from './../../interface/headerCategory/headerCategory.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.BACKEND_URL;
  private api = {
     category: `${this.url}/api/header-category`
    }
  constructor(private http: HttpClient) { }

  loadHeaderCategory(): Observable<IHeaderCategoryResponce[]>{
    return this.http.get<IHeaderCategoryResponce[]>(this.api.category)
  }
  loadHeaderCategoryById(id:string): Observable<IHeaderCategoryResponce[]>{
    return this.http.get<IHeaderCategoryResponce[]>(`${this.api.category}/${id}`)
  }
  
  createHeaderCategory(category: any): Observable<void> {
    return this.http.post<void>(this.api.category, category)
  }

  updateHeaderCategory(category: any, id:string): Observable<void> {
    return this.http.patch<void>(`${this.api.category}/${id}`, category);
  }

  deleteHeaderCategory(id: any): Observable<void> {
    return this.http.delete<void>(`${this.api.category}/${id}`);
  }

}
