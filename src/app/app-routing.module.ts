import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModelComponent } from './admin/admin-model/admin-model.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from "./pages/login/login.component";
import { AdminLoginGuard } from './shared/guard/adminLogin/admin-login.guard';
import { ProductsComponent } from './pages/products/products.component';
import { HeaderCategoryComponent } from './admin/header-category/header-category.component';
import { CategoryComponentHeader } from './admin/header-category/category/category.component';
import { SubCategoryComponentHeader } from './admin/header-category/sub-category/sub-category.component';
import {CatalogCategoryComponent } from "./admin/catalog-category/catalog-category.component";
import { CategoryComponentCatalog } from './admin/catalog-category/category/category.component';
import { SubCategoryComponentCatalog } from './admin/catalog-category/sub-category/sub-category.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'products/:category', component: ProductsComponent },
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
    {path:'models',component:AdminModelComponent},
    {path:'orders',component:AdminOrdersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
