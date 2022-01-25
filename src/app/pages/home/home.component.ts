import { ProductService } from './../../shared/service/product/product.service';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public ImageData = [
    'assets/images/151021-SKODA-Superb-Black-Crystal-4.jpg',
  ]
  public startIndex = 0;
  public newProducts:any = [];

  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
  this.loadProducts()
  }
  public brands = [
    { img: "assets/images/brands/bosch.svg" },
    { img: "assets/images/brands/brembo.svg" },
    { img: "assets/images/brands/kayaba.svg" },
    { img: "assets/images/brands/contitech.png" },
    { img: "assets/images/brands/febi.svg" },
    { img: "assets/images/brands/trw.svg" },
    { img: "assets/images/brands/ngk.svg" },
    { img: "assets/images/brands/sachs.png" },
    { img: "assets/images/brands/schaffler.png" },
    { img: "assets/images/brands/textar.svg" },
  ]
  public slides = [
    { img: "http://placehold.it/350x150/000000" },
    { img: "http://placehold.it/350x150/111111" },
    { img: "http://placehold.it/350x150/333333" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" }
  ];
  public slideConfig = { "slidesToShow": 4, "slidesToScroll": 1 };

  loadProducts() {
    this.ProductService.loadProducts().subscribe(data => {
      this.newProducts = data;
    })
  }

  slickInit(e: any) {
  }
  breakpoint(e: any) {
  }
  afterChange(e: any) {
  }
  beforeChange(e: any) {
  }


}
