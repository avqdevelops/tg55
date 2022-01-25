import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../shared/service/category/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header-category-actions',
  templateUrl: './header-category-actions.component.html',
  styleUrls: ['./header-category-actions.component.scss']
})
export class HeaderCategoryActionsComponent implements OnInit, OnDestroy {
  public categoryForm: FormGroup | any;
  public fields: any;
  private id: any;
  public editStatus: boolean = false;
  public categorySubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.initFormCategory();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.getCategoryById(this.id);
      this.editStatus = true;
      console.log(this.editStatus);

    } else {
      this.editStatus = false;
      console.log(this.editStatus);
    }

  }
  initFormCategory(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      subCategory: this.fb.array([])
    })
    this.fields = {
      subCategory: []
    }
  }

  getCategoryById(id: string): void {
    this.categoryService.loadHeaderCategoryById(id).subscribe((data:any) => {
          this.categoryForm.patchValue({
            name:data.name,
          });
          this.fields.subCategory = [];
          this.fields.subCategory = data.subCategory;
          this.patch();
    })
  }

  patch(): void {
    const control = <FormArray>this.categoryForm.get('subCategory');
    this.fields.subCategory.forEach((subCategory: { name: string, path: string }) => {
      control.push(this.patchValues(subCategory));
    })
  }
  patchValues(subCategory: any): FormGroup {
    return this.fb.group({
      name: [subCategory.name, Validators.required],
      path: [subCategory.path, Validators.required],
    });
  }
  deleteItem(index: any): void {
    let control = <FormArray>this.categoryForm.get('subCategory')
    control.removeAt(index);
  }
  submit(): void {
    this.fields.subCategory = [];
    this.fields.subCategory.push({});
    this.patch();
  }
  save(): void {
    if (this.editStatus) {
      this.categorySubscription = this.categoryService.updateHeaderCategory(this.categoryForm.value, this.id).subscribe(() => {
        this.editStatus = false;
        window.history.back();
        this.toastr.success('Збережено');
      }, err => {
        console.log(err);
      })
    } else {
      this.categorySubscription = this.categoryService.createHeaderCategory(this.categoryForm.value).subscribe(() => {
        this.initFormCategory();
        window.history.back();
        this.toastr.success('Збережено');
      }, err => {
        console.log(err);
      })
    }
  }
  back(): void {
    window.history.back();
    this.editStatus = false;
  }
  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe()
    }
  }

}
