import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule  } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { WelcomeComponent } from './components/main/welcome/welcome.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProductlistComponent } from './components/main/productlist/productlist.component';
import { ProductdetailComponent } from './components/main/productdetail/productdetail.component';
import { OrderdetailComponent } from './components/main/orderdetail/orderdetail.component';

import { HttpService } from './service/http.service'
import { UserService } from './service/user.service'
import { OrderService } from './service/order.service'
import { ProductService } from './service/product.service';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { ManageProductComponent } from './components/adminpanel/manage-product/manage-product.component';
import { ManageOrderComponent } from './components/adminpanel/manage-order/manage-order.component';
import { ManageuserComponent } from './components/adminpanel/manageuser/manageuser.component';
import { UpdateproductComponent } from './components/adminpanel/updateproduct/updateproduct.component';
import { CheckOutComponent } from './components/main/check-out/check-out.component';
import { OrderComponent } from './components/main/order/order.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { SearchProductPipe } from './pipe/search-product.pipe';
import { FilterUserPipe } from './pipe/filter-user.pipe';
import { FilterOrderPipe } from './pipe/filter-order.pipe'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    ProductlistComponent,
    ProductdetailComponent,
    OrderdetailComponent,
    AdminpanelComponent,
    ManageProductComponent,
    ManageOrderComponent,
    ManageuserComponent,
    UpdateproductComponent,
    CheckOutComponent,
    OrderComponent,
    AboutComponent,
    ContactComponent,
    SearchProductPipe,
    FilterUserPipe,
    FilterOrderPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
providers: [ HttpService, , OrderService, ProductService, UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
