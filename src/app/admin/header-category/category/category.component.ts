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
      id: [null]
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
      this.categoryServices.updateHeaderCategory(this.categoryForm.value).subscribe(() => {
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
   let id = category._id
    this.categoryServices.deleteHeaderCategory(id).subscribe(() => {
      this.loadCategory();
    }, err => {
      console.log('delete category error', err);
    });
  }

  editCategory(category: any): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      id:category._id
    });
    this.editStatus = true;
  }

}
