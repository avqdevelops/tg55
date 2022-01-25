import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './../../../shared/service/product/product.service';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { UploadService } from 'src/app/shared/service/upload/upload.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-actions',
  templateUrl: './products-actions.component.html',
  styleUrls: ['./products-actions.component.scss']
})
export class ProductsActionsComponent implements OnInit, OnDestroy {
  private editStatus = false;
  public imgUrl: string = '';
  public categorySubscription!: Subscription;
  public productSubscription!: Subscription;
  private product: any;
  public category: any;
  public subCategory: any;
  public subCategoryDisplay = { "display": "none" };
  public productForm!: FormGroup;
  private id: any;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private uploadeService: UploadService,
    private elemRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCategory();
    this.initProductForm();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.getProductById(this.id);
      this.editStatus = true;
    } else {
      this.editStatus = false;
    }
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      description: [null, Validators.required],
      articleNumber: [null, Validators.required],
      originalNumber: [null],
      category: [null],
      imagePath: [null],
      recomented: [false],
      price: [null, Validators.required],
      count: 1
    })
  }

  getProductById(id: string): void {
    this.productSubscription = this.productService.loadProductById(id).subscribe(product => {
      this.productForm.patchValue({
        name: product.name,
        brand: product.brand,
        description: product.description,
        articleNumber: product.articleNumber,
        originalNumber: product.originalNumber,
        category: product.category,
        imagePath: product.imagePath,
        recomented: product.recomented,
        price: product.price,
        count: product.count
      })
      this.imgUrl = product.imagePath;
    })
  }

  uploadImage(event: any) {
    const data = new FormData;
    data.append('image', event.target.files[0])
    this.uploadeService.uploadeImage(data).subscribe(name => {
      this.imgUrl = `http://localhost:7000/upload/${name}`;
      this.productForm.patchValue({
        imagePath: this.imgUrl
      })
    })
  }

  loadCategory(): void {
    this.categorySubscription = this.categoryService.loadHeaderCategory().subscribe(category => {
      this.category = category;
      console.log(this.category);
    })
  }
  checkRecomented(status: boolean) {
    this.productForm.patchValue({
      recomented: status,
    })
  }
  loadSubCategory(event: any) {
    this.category.forEach((elem: any) => {
      if (elem.name === event.target.value) {
        this.subCategory = elem.subCategory
      }
    });
    this.elemRef.nativeElement.querySelector('.sub-category').style.display = "block";
  }


  chooseFilter(status: boolean): void {
    if (status) {
      this.elemRef.nativeElement.querySelector('.sub-category').style.display = "none";
      this.elemRef.nativeElement.querySelector('.category-wrapper').style.display = "none";
      this.elemRef.nativeElement.querySelector('.filter-wrapper').style.display = "block";
      this.elemRef.nativeElement.querySelector('.oe-number').style.display = "block";
    } else {
      this.elemRef.nativeElement.querySelector('.oe-number').style.display = "none";
      this.elemRef.nativeElement.querySelector('.filter-wrapper').style.display = "block";
      this.elemRef.nativeElement.querySelector('.category-wrapper').style.display = "block";
    }

  }
  saveProduct() {
    if (this.editStatus) {
      this.productSubscription = this.productService.updateProduct(this.productForm.value, this.id).subscribe(() => {
        window.history.back();
        this.toastr.success('Обновлено');
      })
    } else {
      this.productService.createProduct(this.productForm.value).subscribe(() => {
        window.history.back();
        this.toastr.success('Створено');
      })
    }
  }

  back(): void {
    window.history.back();
    this.editStatus = false;
  }
  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    } else if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
