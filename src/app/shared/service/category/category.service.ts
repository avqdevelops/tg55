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
     createCategory: `${this.url}/api/category/post-category`,
     getCategory: `${this.url}/api/category/get-category`,
     headerCategory: `${this.url}/api/headerCategory`
    }
  constructor(private http: HttpClient) { }

  createCategory(category: any): Observable<any> {
    return this.http.post(this.api.createCategory, category)
  }
  loadCategory(): Observable<any> {
    return this.http.get(this.api.getCategory)
  }

  // headerCategory
  loadHeaderCategory(): Observable<any>{
    return this.http.get(this.api.headerCategory)
  }
  
  createHeaderCategory(category: any): Observable<any> {
    return this.http.post(this.api.headerCategory, category)
  }

  updateHeaderCategory(category: any, id: any): Observable<void> {
    return this.http.put<void>(this.api.headerCategory, category);
  }

  deleteHeaderCategory(id: any): Observable<void> {
    return this.http.delete<void>(`${this.api.headerCategory}/${id}`);
  }
}
