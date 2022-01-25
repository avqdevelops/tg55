import { Subscription } from 'rxjs';
import { ProductService } from './../../shared/service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public id: any;
  private productSubscription!: Subscription;
  public product: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProduct();
  }

  getProduct(): void {
    this.productSubscription = this.productService.loadProductById(this.id).subscribe(product => {
      this.product = product;
      console.log(this.product);

    })
  }


  addToCart() {
    let cart = [];
    if(localStorage.length > 0 && localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart') as string);
    }
    let index = cart.findIndex((elem:any) => elem._id === this.product._id);
    console.log(cart[index]);
    
    if(index >= 0){
      cart[index].count++;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.productService.$checkBasket.next(true);
      this.toastr.success('Товар успішно доданий в корзину');
    }else{
      cart.push(this.product)
      localStorage.setItem('cart', JSON.stringify(cart));
      this.toastr.success('Товар успішно доданий в корзину');
      this.productService.$checkBasket.next(true);
    }
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe()
    }
  }

}
