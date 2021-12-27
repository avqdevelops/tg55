import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public ImageData = [
    'assets/images/151021-SKODA-Superb-Black-Crystal-4.jpg',
    'assets/images/Octavia-RS-iV-header.JPG.jpg'
  ]
public startIndex = 0;

  constructor() { }

  ngOnInit(): void {
   
  }
  public brands = [ 
    {img: "assets/images/brands/bosch.svg"},
    {img: "assets/images/brands/brembo.svg"},
    {img: "assets/images/brands/kayaba.svg"},
    {img: "assets/images/brands/contitech.png"},
    {img: "assets/images/brands/febi.svg"},
    {img: "assets/images/brands/trw.svg"},
    {img: "assets/images/brands/ngk.svg"},
    {img: "assets/images/brands/sachs.png"},
    {img: "assets/images/brands/schaffler.png"},
    {img: "assets/images/brands/textar.svg"},
  ]
  public slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  public slideConfig = {"slidesToShow": 4, "slidesToScroll": 1};
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e:any) {
    console.log('slick initialized');
  }
  
  breakpoint(e:any) {
    console.log('breakpoint');
  }
  
  afterChange(e:any) {
    console.log('afterChange');
  }
  
  beforeChange(e:any) {
    console.log('beforeChange');
  }

  
}
