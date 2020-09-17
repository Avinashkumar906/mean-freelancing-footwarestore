import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, ProductService } from 'src/app/service/product.service';
import { HttpService } from 'src/app/service/http.service';
import { DisposeBag } from '@ronas-it/dispose-bag';
import { OrderService } from 'src/app/service/order.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.scss']
})
export class UpdateproductComponent implements OnInit, OnDestroy {

  dispBag = new DisposeBag();
  key:string = '';
  
  constructor(
    private productService:ProductService,
    private httpService:HttpService,
    private orderService:OrderService
  ) { }

  productList:Array<Product> = this.productService.getProducts();
  tempList:Array<Product>;
  ngOnInit(): void {
    this.tempList = this.productList;
    this.productService.productsChanged.subscribe(
      (products:Array<Product>)=>{
        this.productList = products;
        this.tempList = products;
      }
    )
  }

  filter(key){
    this.key = key;
      if(key === 'ost'){
        this.tempList = _.filter(this.productList,(item)=>item.quantity <= 0)
      } else if(key === 'ist'){
        this.tempList = _.filter(this.productList,(item)=>item.quantity > 0)
      } else {
      this.tempList = _.cloneDeep(this.productList)
    }
  }

  ngOnDestroy(): void {
		this.dispBag.unsubscribe()
	}

  delete(product:Product){
    var result = confirm("Want to delete?");
    if(result){
      this.dispBag.add(
        this.httpService.deleteProduct(product).subscribe(
          (data:Product)=>{
            this.orderService.clearCart()
            this.productService.removeProduct(data)
          }
        )
      )
    }
  }
}
