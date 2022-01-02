import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-products',

  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public p: number = 1;
  public collection: any[] = []
  public rangeValue = 0
  public rangeValue2 = 0
  value: number = 0;
  maxvalue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 50000
  };
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.range()
  }
  range(): void {
    if (this.rangeValue >= this.rangeValue2) {
      this.rangeValue2 = this.rangeValue + 1
    }
  }
}
