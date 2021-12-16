import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public rangeValue = 0
  public rangeValue2 = 0
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
