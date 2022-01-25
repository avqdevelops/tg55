import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/service/product/product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit ,OnDestroy {
  public basketSubscription!: Subscription;
  public totalCart: number = 0;
  public cart: any;
  public countItem: any;

  constructor(
    private productServices: ProductService
  ) { }

  ngOnInit(): void {
    this.loadCard();
    this.getTotalCart();
    this.checkChangeBasket();
  }

  loadCard() {
    if (localStorage.length > 0 && localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart') as string);
      this.countItem = this.cart.length
    } else {
      this.countItem = false;
      this.cart = false;
    }
  }
  deleteProduct(item: any) {
    let index = this.cart.findIndex((elem: any) => {
      if (elem._id === item._id) {
        return elem
      }
    })
    this.cart.splice(index, 1);
    if (this.cart.length === 0) {
      localStorage.removeItem('cart');
      this.productServices.$checkBasket.next(false);
    } else {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
    this.getTotalCart();
    this.productServices.$checkBasket.next(false)
  }
  getTotalCart(): void {
    this.totalCart = 0;
    if (localStorage.length > 0 && localStorage.getItem('cart')) {
      const basket = JSON.parse(localStorage.getItem('cart') as string);
      basket.forEach((elem: any) => {
        this.totalCart += elem.count * elem.price;
      });
    }
  }
  checkChangeBasket(){
    this.basketSubscription =  this.productServices.$checkBasket.subscribe(()=>{
      this.loadCard();
      this.getTotalCart();
    })
  }

  ngOnDestroy(): void {
      if(this.basketSubscription){
        this.basketSubscription.unsubscribe()
      }
  }
}
