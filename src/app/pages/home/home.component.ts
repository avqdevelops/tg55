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

  
}
