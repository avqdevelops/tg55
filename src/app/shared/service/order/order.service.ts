import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.BACKEND_URL;
  private api = {
     order: `${this.url}/api/order`
    }

  constructor(
    private http:HttpClient
  ) { }

  createOrder(order:any):Observable<void>{
    return this.http.post<void>(this.api.order , order )
  }
  
  getAllOrder():Observable<any>{
    return this.http.get<any>(this.api.order);
  }
  
  getOrderByID(id:string){
    return this.http.get(`${this.api.order}/${id}`)
  }

}
