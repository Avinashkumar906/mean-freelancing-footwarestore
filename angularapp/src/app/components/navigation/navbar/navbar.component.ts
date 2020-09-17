import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserService } from 'src/app/service/user.service';
import { OrderService } from 'src/app/service/order.service';
import { DisposeBag } from '@ronas-it/dispose-bag';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user:User = this.userService.getUser()
  dispBag = new DisposeBag();

  constructor(
    private userService:UserService,
    private orderService:OrderService,
  ) { }

  ngOnInit(): void {
    this.dispBag.add(
      this.userService.userChanged.subscribe(
        (user:User)=>this.user=user,
      )
    )
  }

  ngOnDestroy(): void {
		this.dispBag.unsubscribe()
  }
  
  logout(){
    this.userService.logout()
  }

  getCount(){
    return this.orderService.getCount()
  }
}
