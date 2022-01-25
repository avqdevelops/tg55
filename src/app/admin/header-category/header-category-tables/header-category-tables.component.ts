import { CategoryService } from './../../../shared/service/category/category.service';
import { IHeaderCategoryResponce } from './../../../shared/interface/headerCategory/headerCategory.interface';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header-category-tables',
  templateUrl: './header-category-tables.component.html',
  styleUrls: ['./header-category-tables.component.scss']
})
export class HeaderCategoryTablesComponent implements OnInit {
  public categoryHead: IHeaderCategoryResponce[] = [];
  public categorySubscription!: Subscription;
  public categoryID:Array<string>=[];
  public disabled = true;

  constructor( 
    private categoryService: CategoryService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(): void {
    this.categorySubscription = this.categoryService.loadHeaderCategory().subscribe((headerCategory:any) => {
      this.categoryHead = headerCategory
    }, err => {
      console.log(err);
    })
  } 
  chooseCategory(item:boolean,id:string):void{
    if(item){
     this.categoryID.push(id);
    }else{
     const index = this.categoryID.findIndex(el => el === id);
     this.categoryID.splice(index,1);
    }
    if(this.categoryID.length !=0){
      this.disabled = false;
     }else{
       this.disabled = true;
     }
  }
  deleteCategory():void{
    const CONFIRM  = confirm("Ви впевнені?");
    if(CONFIRM){
      this.categoryID.forEach(elem =>{
        this.categorySubscription = this.categoryService.deleteHeaderCategory(elem).subscribe(()=>{
           this.getAllCategory();
           this.toastr.success('Видалено')
         })
       })
    }
  }

  ngOnDestroy(): void {
    if(this.categorySubscription){
      this.categorySubscription.unsubscribe();
    }
  }
}
