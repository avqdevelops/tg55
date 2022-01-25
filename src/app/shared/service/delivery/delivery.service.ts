import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private api =
  {
    NP: "https://api.novaposhta.ua/v2.0/json/"
  }

  constructor(private http:HttpClient) { }

  loadRegionNP():Observable<any>{
    const settings = {
      "modelName": "Address",
      "calledMethod": "getAreas",
      "methodProperties": {}
    }
   return  this.http.post(this.api.NP, settings)
  }
  loadCityNP(areaRef:string):Observable<any>{
    const settings = {
      "modelName": "Address",
      "calledMethod": "getCities",
      "methodProperties": {
        "AreaRef": areaRef
      },
    }
    return  this.http.post(this.api.NP, settings)
  }
  loadBranchNP(cityRef:string):Observable<any>{
    const settings = {
      "modelName": "Address",
      "calledMethod": "getWarehouses",
      "methodProperties": {
        "CityRef": cityRef
      },
    }
    return  this.http.post(this.api.NP, settings)
  }

}
