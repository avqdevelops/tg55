import { ProductService } from './../../shared/service/product/product.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { OrderService } from './../../shared/service/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryService } from './../../shared/service/delivery/delivery.service';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  public subscription!: Subscription;
  public city: any;
  public region: any;
  public branch: any;
  public value = '';
  public basket: any;
  public orderForm!: FormGroup;
  public orderSubscription!: Subscription;
  public total = 0;
  private date = new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString().slice(0, -3);
  constructor(
    private elem: ElementRef,
    private deliveryService: DeliveryService,
    private fb: FormBuilder,
    private OrderService: OrderService,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private elemRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.getTotalBasket();
    this.initFormGroup();
    console.log(this.date);

  }

  initFormGroup() {
    this.orderForm = this.fb.group({
      firstName: null,
      lastName: null,
      middleName: null,
      email: null,
      phoneNumber: null,
      deliveryInfo: null,
      basket: null,
      date: null,
      total: null,
      payment: [null, Validators.required],
      status: 'Очікує підтвердження'
    })
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('cart')) {
      this.basket = JSON.parse(localStorage.getItem('cart') as string)
    }
    console.log(this.basket);

  }

  getTotalBasket(): void {
    this.basket.forEach((elem: any) => {
      this.total += elem.price * elem.count;
    });
  }

  loadRegion(status: boolean) {
    if (status) {
      this.subscription = this.deliveryService.loadRegionNP().subscribe(region => {
        this.region = region.data;
      }, err => {
        console.log(err)
      })
      this.elem.nativeElement.querySelector('.region-wrapper').style.display = 'block';
    } else {
      this.elem.nativeElement.querySelector('.region-wrapper').style.display = 'none';
      this.elem.nativeElement.querySelector('.city-wrapper').style.display = 'none';
      this.elem.nativeElement.querySelector('.branch-wrapper').style.display = 'none';
    }
  }
  loadCity(event: any) {
    this.subscription = this.deliveryService.loadCityNP(event.Ref).subscribe(city => {
      this.city = city.data;
    }, err => {
      console.log(err)
    })
    this.elem.nativeElement.querySelector('.city-wrapper').style.display = 'block';
  }
  loadBranch(item: any) {
    this.subscription = this.deliveryService.loadBranchNP(item.Ref).subscribe(branch => {
      this.branch = branch.data;
      console.log(branch)
    }, err => {
      console.log(err)
    })
    this.elem.nativeElement.querySelector('.branch-wrapper').style.display = 'block';
  }

  checkPayment(event: any) {
    this.orderForm.patchValue({
      payment: event.target.value,
    })
  }

  saveDelivery(item: any) {
    this.orderForm.patchValue({
      deliveryInfo: item
    })
  }
  saveOrder(): void {
    this.orderForm.patchValue({
      basket: this.basket,
      total: this.total,
      date: this.date
    })
    this.orderSubscription = this.OrderService.createOrder(this.orderForm.value).subscribe(() => {
      localStorage.removeItem('cart');
      this.productService.$checkBasket.next(false);
      this.router.navigate(['']);
      this.toastr.success('Дякуємо за замовлення');
    })
  }
  moveToDelivery(status: boolean) {
    let elem = this.elemRef.nativeElement.querySelector('.delivery-wrapper');
    console.log(elem);
    if (status) {
      elem.style.left = '0'
    } else {
      elem.style.left = ''
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    } else if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }
}
