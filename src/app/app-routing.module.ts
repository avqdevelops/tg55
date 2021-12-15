import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminModelComponent } from './admin/admin-model/admin-model.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from "./pages/login/login.component";
import { AdminLoginGuard } from './shared/guard/adminLogin/admin-login.guard';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'products/:category', component: ProductsComponent },
  {path: 'admin', component:AdminComponent , canActivate: [AdminLoginGuard],children:[
    { path: '', pathMatch: 'full', redirectTo: 'category' },
    {path:'category',component:AdminCategoryComponent},
    {path:'products',component:AdminProductsComponent},
    {path:'models',component:AdminModelComponent},
    {path:'orders',component:AdminOrdersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
