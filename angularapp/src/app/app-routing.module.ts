import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { WelcomeComponent } from './components/main/welcome/welcome.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { ManageProductComponent } from './components/adminpanel/manage-product/manage-product.component';
import { ManageOrderComponent } from './components/adminpanel/manage-order/manage-order.component';
import { ManageuserComponent } from './components/adminpanel/manageuser/manageuser.component';
import { UpdateproductComponent } from './components/adminpanel/updateproduct/updateproduct.component';
import { ProductlistComponent } from './components/main/productlist/productlist.component';
import { ProductdetailComponent } from './components/main/productdetail/productdetail.component';
import { CheckOutComponent } from './components/main/check-out/check-out.component';
import { OrderComponent } from './components/main/order/order.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { OrderdetailComponent } from './components/main/orderdetail/orderdetail.component';


const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'home',component:WelcomeComponent},
  {path:'signin',component:LoginComponent},
  {path:'signup',component:RegisterComponent},
  {path:'product',component:ProductlistComponent},
  {path:'product/detail/:id',component:ProductdetailComponent},
  {path:'checkout',component:CheckOutComponent},
  {path:'order',component:OrderComponent},
  {path:'orderdetail/:id',component:OrderdetailComponent},
  {path:'admin',component:AdminpanelComponent,
    children:[
      {path:'product',component:ManageProductComponent},
      {path:'uproduct',component:UpdateproductComponent},
      {path:'user',component:ManageuserComponent},
      {path:'order',component:ManageOrderComponent},
    ]
  },
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
