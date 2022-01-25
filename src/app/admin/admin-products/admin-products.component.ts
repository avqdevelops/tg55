import { UploadService } from './../../shared/service/upload/upload.service';
import { ProductService } from './../../shared/service/product/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from './../../shared/service/category/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
 
  constructor() { } 
  
  ngOnInit(): void {
      
  }
  
}
