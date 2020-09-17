import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user:User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
  userChanged = new Subject<User>()

  login(data:User){
    this.user = data;
    localStorage.setItem('user',JSON.stringify(data))
    this.userChanged.next(this.user)
  }
  
  logout(){
    this.user = undefined;
    localStorage.removeItem('user')
    this.userChanged.next(this.user)
  }

  getUser(){
    return this.user;
  }

  isAdmin(){
    if(this.user && this.user.role === 'admin')
      return true;
    else
      return false;
  }

}

export interface User {
  _id:string,
  email:string,
  password:string,
  name:string,
  role:string,
  blocked:boolean
}
