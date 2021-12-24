import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/service/category/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponentHeader implements OnInit {
  public subCategoryHead!: any;
  public categoryHead!: any;
  public editStatus = false;
  public subCategoryForm!: FormGroup;
  public currentSubCategoryID!: any;

  constructor(
    private categoryServices: CategoryService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initSubCategoryForm()
    this.loadCategory()
    this.loadSubCategory()
  }


  initSubCategoryForm(): void {
    this.subCategoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      category: [null, Validators.required]
      // imagePath: [null, Validators.required]
    })
  }
  
  resetForm():void{
    this.subCategoryForm.reset()
  }

  loadCategory():void{
    this.categoryServices.loadHeaderCategory().subscribe(e=>{
      this.categoryHead = e
      console.log(this.categoryHead);
    }, err=>{
      console.log(`load category error`, err);
    })
  }

  loadSubCategory():void{
    this.categoryServices.loadHeaderSubCategory().subscribe(e=>{
      this.subCategoryHead = e
      console.log(this.subCategoryHead);
    }, err=>{
      console.log(`load subcategory error`, err);
    })
  }

  saveCategory(): void {
    if (this.editStatus) {
      this.categoryServices.updateHeaderSubCategory(this.subCategoryForm.value, this.currentSubCategoryID).subscribe(() => {
        this.loadSubCategory();
        this.editStatus = false;
        this.initSubCategoryForm();
      }, err => {
        console.log('update subCategory error', err);
      });
    } else {
      console.log(this.subCategoryForm.value);
      
      this.categoryServices.createHeaderSubCategory(this.subCategoryForm.value).subscribe(() => {
        this.loadSubCategory();
        this.initSubCategoryForm();
      }, err => {
        console.log('create subCategory error', err);
      });
    }
  }

  deleteCategory(subcategory: any): void {
    this.categoryServices.deleteHeaderSubCategory(subcategory).subscribe(() => {
      this.loadSubCategory();
    }, err => {
      console.log('delete category error', err);
    });
  }
  
  editCategory(subcategory: any): void {
    this.subCategoryForm.patchValue({
      name: subcategory.name,
      path: subcategory.path,
      category: subcategory.category
      // imagePath: category.imagePath
    });
    this.currentSubCategoryID = subcategory.id;
    this.editStatus = true;
  }
}
