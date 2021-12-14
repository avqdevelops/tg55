import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/shared/service/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit , OnDestroy {
  public categoryForm!:FormGroup;
  public category:any = [];
  public categorySubscription!:Subscription;
  constructor(private fb:FormBuilder,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.initFormCategory();
    this.loadCategory()
  }
  initFormCategory(){
    this.categoryForm = this.fb.group({
      name:[null,Validators.required],
      path:[null,Validators.required]
    })
  }

  saveCategory(){
    this.categorySubscription = this.categoryService.createCategory(this.categoryForm.value).subscribe(()=>{
      this.initFormCategory();
      this.loadCategory();
    }, err =>{
      console.log(err);
    })
  }
  loadCategory(){
    this.categoryService.loadCategory().subscribe(data =>{
      this.category = data;
      console.log(this.category);
      
    })
  }

  ngOnDestroy():void{
   if(this.categorySubscription){
     this.categorySubscription.unsubscribe()
   }
  }
  
}
