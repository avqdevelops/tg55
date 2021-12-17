import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminModelComponent } from './admin/admin-model/admin-model.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ProductsComponent } from './pages/products/products.component';
import { HeaderCategoryComponent } from './admin/header-category/header-category.component';
import { CatalogCategoryComponent } from './admin/catalog-category/catalog-category.component';
import { CategoryComponentCatalog } from './admin/catalog-category/category/category.component';
import { SubCategoryComponentCatalog } from './admin/catalog-category/sub-category/sub-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminModelComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BasketComponent,
    ProductsComponent,
    HeaderCategoryComponent,
    CatalogCategoryComponent,
    CategoryComponentCatalog,
    SubCategoryComponentCatalog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
