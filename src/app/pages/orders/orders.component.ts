import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private api = "https://api.novaposhta.ua/v2.0/json/"
  public city: any;
  public obl: any;
  public branch:any;
  public value = ''
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadObl();
  }
  loadObl() {
    const settings = {
      "modelName": "Address",
      "calledMethod": "getAreas",
      "methodProperties": {}
    }
    this.http.post(this.api, settings).subscribe((obl: any) => {
      this.obl = obl.data
    })
  }


  loadCity(event: any) {
    const settings = {
      "modelName": "Address",
      "calledMethod": "getCities",
      "methodProperties": {
        "AreaRef": event.Ref
      },
    }
    this.http.post(this.api, settings).subscribe((item: any) => {
      this.city = item.data
    })
  }
  loadItem(event:any) {
    const settings = {
      "modelName": "Address",
      "calledMethod": "getWarehouses",
      "methodProperties": {
        "CityRef": event.Ref
      },
    }
    this.http.post(this.api, settings).subscribe((item: any) => {
      this.branch = item.data
    })
  }
  saveDelivery(item:any){
   console.log(item);
   
  }
}
