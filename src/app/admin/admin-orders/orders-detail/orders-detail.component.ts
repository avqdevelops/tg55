import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/service/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit , OnDestroy {
  private id:string = '';
  private orderSubscription!:Subscription;
  public order:any = {};

  constructor(
    private activatedRoute:ActivatedRoute,
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getOrderByID()
  }

  getOrderByID(){
   this.orderSubscription = this.orderService.getOrderByID(this.id).subscribe(order =>{
       this.order = order;
       console.log(order);
    })
  }

  back(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
      if(this.orderSubscription){
        this.orderSubscription.unsubscribe();
      }
  }

}
