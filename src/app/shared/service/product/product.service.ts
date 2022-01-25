import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public $checkBasket = new Subject<boolean>()
  private url = environment.BACKEND_URL;
  private api = {
     product: `${this.url}/api/products`
    }

  constructor(private http: HttpClient) { }

  loadProducts(): Observable<any>{
    return this.http.get<any>(this.api.product)
  }
  loadProductByCategory(category:any){
    return this.http.post<any>(`${this.api.product}/category`, category)
  }
  loadProductById(id:string){
    return this.http.get<any>(`${this.api.product}/${id}`)
  }
  
  createProduct(product: any): Observable<void> {
    return this.http.post<void>(this.api.product, product)
  }

  updateProduct(product: any, id:string): Observable<void> {
    return this.http.patch<void>(`${this.api.product}/${id}`, product);
  }

  deleteProduct(id: any): Observable<void> {
    return this.http.delete<void>(`${this.api.product}/${id}`);
  }
}
