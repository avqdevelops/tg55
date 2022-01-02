import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-cars',
  templateUrl: './catalog-cars.component.html',
  styleUrls: ['./catalog-cars.component.scss']
})
export class CatalogCarsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  openSubModel(event:any){
    let subModel = event.target.parentNode.parentNode.parentNode.parentNode.children[1];
    subModel.style.display = 'block'
  }

}
