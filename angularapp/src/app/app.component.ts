import { Component, OnInit } from '@angular/core';
import { HttpService } from './service/http.service';
import { ProductService, Product } from './service/product.service';
import { OrderService } from './service/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'angularapp';
  isAppLoaded:boolean;
  err:any;
  
  constructor(
    private httpService:HttpService,
    private produtService:ProductService,
    private orderService:OrderService
  ){}

  ngOnInit(): void {
    this.httpService.getProducts().subscribe(
      (products:Array<Product>)=>{
        this.produtService.putProducts(products);
        this.isAppLoaded = true;
        this.adjustStock();
      },
      err=>{
        this.isAppLoaded = false;
        this.err = err;
      }
    )
  }

  adjustStock(){
    let order = this.orderService.getOrder()
    order.items.forEach((item:Product)=>{
      this.produtService.removeQuantity(item)
    })
  }
}
