import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/service/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponentHeader implements OnInit {
  public categoryHead!: any
  public editStatus = false;
  public categoryForm!: FormGroup;
  public currentCategoryID!: any
  constructor(
    private categoryServices: CategoryService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initCategoryForm()
    this.loadCategory()
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      // imagePath: [null, Validators.required]
    })
  }

  resetForm():void{
    this.categoryForm.reset()
  }

  loadCategory():void{
    this.categoryServices.loadHeaderCategory().subscribe(e=>{
      this.categoryHead = e
      console.log(this.categoryHead);
    }, err=>{
      console.log(`load category error`, err);
    })
  }

  saveCategory(): void {
    if (this.editStatus) {
      this.categoryServices.updateHeaderCategory(this.categoryForm.value, this.currentCategoryID).subscribe(() => {
        this.loadCategory();
        this.editStatus = false;
        this.initCategoryForm();
      }, err => {
        console.log('update category error', err);
      });
    } else {
      this.categoryServices.createHeaderCategory(this.categoryForm.value).subscribe(() => {
        this.loadCategory();
        this.initCategoryForm();
      }, err => {
        console.log('create category error', err);
      });
    }
  }

  deleteCategory(category: any): void {
    this.categoryServices.deleteHeaderCategory(category).subscribe(() => {
      this.loadCategory();
    }, err => {
      console.log('delete category error', err);
    });
  }

  editCategory(category: any): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    });
    this.currentCategoryID = category.id;
    this.editStatus = true;
  }

}
