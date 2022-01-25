import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/service/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit , OnDestroy {
  public product:any;
  public disabled = true;
  public collection: any[] = [];
  public page: number = 1;
  public productID:Array<any>= [];
  public productSubscription!:Subscription;
  public totalLength!: number;

  constructor(
    private productService:ProductService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    this.productSubscription=this.productService.loadProducts().subscribe(data =>{
      this.product = data;
      this.totalLength = data.length
    })
  }
  chooseProduct(item:boolean,id:string):void{
    if(item){
     this.productID.push(id);
    }else{
     const index = this.productID.findIndex(el => el === id);
     this.productID.splice(index,1);
    }
    if(this.productID.length !=0){
      this.disabled = false;
     }else{
       this.disabled = true;
     }
  }
  deleteProduct():void{
    const CONFIRM  = confirm("Ви впевнені?");
    if(CONFIRM){
      this.productID.forEach(elem =>{
        this.productSubscription = this.productService.deleteProduct(elem).subscribe(()=>{
           this.loadProduct();
           this.toastr.success('Видалено');
         })
       })
    }
  }

  ngOnDestroy(): void {
      if(this.productSubscription){
        this.productSubscription.unsubscribe()
      }
  }

}
