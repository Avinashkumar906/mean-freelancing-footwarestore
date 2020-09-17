import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from 'src/app/service/user.service';
import { DisposeBag } from '@ronas-it/dispose-bag';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit, OnDestroy {

  constructor(
    private userService:UserService,
    private router:Router,
    private orderService:OrderService
  ) { 
    this.user = this.userService.getUser();
  }
  
  user:User;
  dispBag = new DisposeBag();

  ngOnInit(): void {
    this.checkUser();
    this.dispBag.add(
      this.userService.userChanged.subscribe(
        (user:User)=>{
          this.user = user;
          this.checkUser()
        }
      )
    )
  }

  checkUser(){
    if(this.user && this.user.role === 'admin'){
    } else {
      this.router.navigate(['/home'])
    }
  }

  ngOnDestroy(): void {
		this.dispBag.unsubscribe()
	}
  
}
