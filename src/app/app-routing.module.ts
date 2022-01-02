import { CatalogCarsComponent } from './catalog-cars/catalog-cars.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from "./pages/login/login.component";
import { AdminLoginGuard } from './shared/guard/adminLogin/admin-login.guard';
import { ProductsComponent } from './pages/products/products.component';
import { HeaderCategoryComponent } from './admin/header-category/header-category.component';
import { CategoryComponentHeader } from './admin/header-category/category/category.component';
import { SubCategoryComponentHeader } from './admin/header-category/sub-category/sub-category.component';
import {CatalogCategoryComponent } from "./admin/catalog-category/catalog-category.component";
import { CategoryComponentCatalog } from './admin/catalog-category/category/category.component';
import { SubCategoryComponentCatalog } from './admin/catalog-category/sub-category/sub-category.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { BasketComponent } from './pages/basket/basket.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: '', pathMatch: 'full', redirectTo: "home"},
  {path: 'login', component:LoginComponent},
  {path: 'products/:category', component: ProductsComponent },
  {path:  'orders', component: OrdersComponent },
  {path:  'basket', component: BasketComponent },
  {path:'catalog-cars',component:CatalogCarsComponent, canActivate: [AdminLoginGuard]},
  {path: 'admin', component:AdminComponent , canActivate: [AdminLoginGuard],children:[
    { path: '', pathMatch: 'full', redirectTo: 'category-header' },
    { path: 'category-header', component: HeaderCategoryComponent , children: [
      { path: '', pathMatch: 'full', redirectTo: 'category' },
      {path: 'category', component: CategoryComponentHeader},
      {path: 'sub-category', component: SubCategoryComponentHeader}
    ]  },
    { path: 'category-catalog', component: CatalogCategoryComponent , children: [
      { path: '', pathMatch: 'full', redirectTo: 'category' },
      {path: 'category', component: CategoryComponentCatalog},
      {path: 'sub-category', component: SubCategoryComponentCatalog}
    ]  },
    {path:'products',component:AdminProductsComponent},
    {path:'orders',component:AdminOrdersComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
