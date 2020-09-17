import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserService } from 'src/app/service/user.service';
import * as _ from 'lodash'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService, Order } from 'src/app/service/order.service';
import { Product, ProductService } from 'src/app/service/product.service';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';
import { DisposeBag } from '@ronas-it/dispose-bag';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  constructor(
    private userService:UserService,
    private formbuilder:FormBuilder,
    private orderService:OrderService,
    private productService:ProductService,
    private httpService:HttpService,
    private router :Router
  ) { 
    this.userForm = this.formbuilder.group({
      name:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.email]],
      address:['',[Validators.required]]
    })
  }
  
  userForm:FormGroup;
  submitted:boolean = false;
  dispBag = new DisposeBag();
  order:Order = this.orderService.getOrder();
  user:User = _.cloneDeep(this.userService.getUser());
  
  ngOnInit(): void {
    this.user ? this.userForm.patchValue(this.user) : '';
    this.dispBag.add(
      this.userService.userChanged.subscribe(
        (user:User)=>{
          user ? this.userForm.patchValue(user) : '';
          this.user = user;
        },
        err=>console.log(err)
      )
    )
    this.dispBag.add(
      this.orderService.orderChanged.subscribe(
        (order:Order)=>this.order = order,
        err=>console.log(err)
      )
    )
  }

  ngOnDestroy(): void {
		this.dispBag.unsubscribe()
  }
  
  addMore(item:Product){
    let dummy = _.cloneDeep(item)
    dummy.quantity = 1;
    if(this.productService.removeQuantity(dummy)){
      this.orderService.addToOrder(dummy)
    } else {
      alert('out of stock !')
    }
  }

  remove(item:Product){
    let dummy = _.cloneDeep(item)
    dummy.quantity = 1;
    this.orderService.removeFromOrder(dummy)
    this.productService.addQuantity(dummy)
  }

  getTotal(){
    let total = 0;
    this.order.items.forEach((item)=>{
      total = total + (item.quantity * item.cost)
    })
    return total
  }

  get userFormControl(){
    return this.userForm.controls;
  }

  checkOut(){
    this.submitted = true;
    this.order.name =this.userForm.value.name;
    this.order.email =this.userForm.value.email;
    this.order.address =this.userForm.value.address;
    this.dispBag.add(
      this.httpService.placeOrder(this.order).subscribe(
        (order:Order)=>{
          this.orderService.clearCart();
          this.router.navigate(['orderdetail',order._id])
        },
        err=>{
          this.submitted = false;
        }
      )
    )
  }
}
