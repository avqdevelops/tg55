import { OrdersTableComponent } from './admin/admin-orders/orders-table/orders-table.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsTableComponent } from './admin/admin-products/products-table/products-table.component';
import { HeaderCategoryTablesComponent } from './admin/header-category/header-category-tables/header-category-tables.component';
import { HeaderCategoryActionsComponent } from './admin/header-category/header-category-actions/header-category-actions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from "./pages/login/login.component";
import { AdminLoginGuard } from './shared/guard/adminLogin/admin-login.guard';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { HeaderCategoryComponent } from './admin/header-category/header-category.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsActionsComponent } from './admin/admin-products/products-actions/products-actions.component';
import { OrdersDetailComponent } from './admin/admin-orders/orders-detail/orders-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: "home" },
  { path: 'catalog/:category', component: CatalogComponent },
  { path: 'checkout', component: OrdersComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminLoginGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'category-header' },
      {
        path: 'category-header', component: HeaderCategoryComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: 'category' },
          { path: 'category', component: HeaderCategoryTablesComponent },
          { path: 'category/add', component: HeaderCategoryActionsComponent },
          { path: 'category/edit/:id', component: HeaderCategoryActionsComponent }
        ]
      },
      {
        path: 'admin-products', component: AdminProductsComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: 'products' },
          { path: 'products', component: ProductsTableComponent },
          { path: 'products/add', component: ProductsActionsComponent },
          { path: 'products/edit/:id', component: ProductsActionsComponent },
        ]
      },
      {
        path: 'orders', component: AdminOrdersComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: 'table' },
          { path: 'table', component: OrdersTableComponent },
          { path: 'detail/:id', component: OrdersDetailComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
