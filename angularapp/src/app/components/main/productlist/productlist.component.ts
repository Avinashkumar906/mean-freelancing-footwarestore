import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, Product } from 'src/app/service/product.service';
import * as _ from 'lodash'
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/service/order.service';
import { Router } from '@angular/router';
import { DisposeBag } from '@ronas-it/dispose-bag';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit, OnDestroy {

  constructor(
    private productService:ProductService,
    private orderService:OrderService,
    private router:Router,
    ) { }
    
    key:string = '';
    env = environment;
    dispBag = new DisposeBag();
    productList:Array<Product> = this.productService.getProducts();

  ngOnInit(): void {
    this.dispBag.add(
      this.productService.productsChanged.subscribe(
        (products:Array<Product>)=>this.productList = _.cloneDeep(products)
      )
    )
  }

  ngOnDestroy(): void {
		this.dispBag.unsubscribe()
	}

  buyNow(product:Product){
    let dummy = _.cloneDeep(product)
    dummy.quantity = 1;
    if(this.productService.removeQuantity(dummy)){
      this.orderService.addToOrder(dummy)
    } else {
      alert('out of stock !')
    }
    this.router.navigate(['/checkout']);
  }

}
