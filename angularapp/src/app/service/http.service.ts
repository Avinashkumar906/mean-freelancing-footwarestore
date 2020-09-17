import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { User } from './user.service';
import { Order } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http : HttpClient
  ) { }

  // User registration api calls
  signUp(data){
    return this.http.post(`${environment.api}/signup`,data)
  }
  signIn(data){
    return this.http.post(`${environment.api}/signin`,data)
  }

  // Product http services
  postProduct(data){
    return this.http.post(`${environment.api}/product`,data)
  }
  updateProduct(data,_id){
    return this.http.patch(`${environment.api}/product?_id=${_id}`,data)
  }
  deleteProduct(data){
    return this.http.delete(`${environment.api}/product?_id=${data._id}`)
  }
  getProducts(){
    return this.http.get(`${environment.api}/products`)
  }
  getProduct(id){
    return this.http.get(`${environment.api}/product?_id=${id}`)
  }

  // Manage user http request
  getUsers(){
    return this.http.get(`${environment.api}/users`)
  }
  deleteUser(user:User){
    return this.http.delete(`${environment.api}/user?_id=${user._id}`)
  }
  switchRole(user:User){
    return this.http.get(`${environment.api}/switchrole?_id=${user._id}`)
  }
  
  // Manage Order http requests
  getOrders(){
    return this.http.get(`${environment.api}/orders`)
  }
  getOrderById(id){
    return this.http.get(`${environment.api}/order?_id=${id}`)
  }
  deleteOrder(order:Order){
    return this.http.delete(`${environment.api}/order?_id=${order._id}`)
  }
  completeOrder(order:Order){
    return this.http.patch(`${environment.api}/order?_id=${order._id}`,order)
  }
  placeOrder(order:Order){
    return this.http.post(`${environment.api}/order`,order)
  }
  getOrdersByMail(user:User){
    return this.http.get(`${environment.api}/ordersbymail?email=${user.email}`)
  }

}
