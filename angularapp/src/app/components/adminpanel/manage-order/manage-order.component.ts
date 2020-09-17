import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/service/product.service';
import { Order } from 'src/app/service/order.service';
import { HttpService } from 'src/app/service/http.service';
import { DisposeBag } from '@ronas-it/dispose-bag'
import * as _ from 'lodash'

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit, OnDestroy {

  
  key:string='';
  dispBag = new DisposeBag();
  orderList:Array<Order> = [];

  constructor(
    private httpService:HttpService
  ) { }
  
  ngOnDestroy(): void {
    this.dispBag.unsubscribe()
  }

  ngOnInit(): void {
    this.fetchOrders()
  }

  filter(key){
    this.key = key;
  }

  delete(order:Order){
    let result = confirm('Want to delete ?')
    if(result){
      this.dispBag.add(
        this.httpService.deleteOrder(order).subscribe(
          (order:Order)=>{
            this.fetchOrders()
          }
        )
      )
    }
  }

  fetchOrders(){
    this.dispBag.add(
      this.httpService.getOrders().subscribe(
        (orders:Array<Order>)=>this.orderList = _.cloneDeep(orders),
        err=>console.log(err)
      )
    )
  }

  markCompleted(order:Order){
    let result = confirm('Mark complete ?')
    if(result){
      this.dispBag.add(
        this.httpService.completeOrder(order).subscribe(
          (order:Order)=>{
            this.fetchOrders()
          }
        )
      )
    }
  }

  totalPrice(order:Order){
    let sum = 0;
    order.items.forEach((product:Product)=>{
      sum = sum+(product.cost * product.quantity)
    })
    return sum;
  }

}

