import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/service/order/order.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit , OnDestroy {
  private orderSubscription!:Subscription;
  public order:any;

  constructor(
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    this.getAllOrder()
  }
  getAllOrder():void{
    this.orderSubscription = this.orderService.getAllOrder().subscribe(data =>{
     this.order = data;
     console.log(data);
     
    })
   }
 
   ngOnDestroy(): void {
       if(this.orderSubscription){
         this.orderSubscription.unsubscribe()
       }
   }
}
