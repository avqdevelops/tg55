import { IHeaderCategoryResponce } from './../../shared/interface/headerCategory/headerCategory.interface';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header-category',
  templateUrl: './header-category.component.html',
  styleUrls: ['./header-category.component.scss']
})
export class HeaderCategoryComponent implements OnInit {
 


  constructor() { }

  ngOnInit(): void {

  }

}
