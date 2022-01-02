import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CategoryComponentHeader } from './admin/header-category/category/category.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ProductsComponent } from './pages/products/products.component';
import { HeaderCategoryComponent } from './admin/header-category/header-category.component';
import { CatalogCategoryComponent } from './admin/catalog-category/catalog-category.component';
import { CategoryComponentCatalog } from './admin/catalog-category/category/category.component';
import { SubCategoryComponentCatalog } from './admin/catalog-category/sub-category/sub-category.component';
import { SubCategoryComponentHeader } from './admin/header-category/sub-category/sub-category.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { OrdersComponent } from './pages/orders/orders.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CatalogCarsComponent } from './catalog-cars/catalog-cars.component';
import { ModelComponent } from './catalog-cars/model/model.component';
import { ModelDetailComponent } from './catalog-cars/model-detail/model-detail.component';
import { FilterCityPipe } from './shared/pipes/filterCity/filter-city.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BasketComponent,
    ProductsComponent,
    HeaderCategoryComponent,
    SubCategoryComponentHeader,
    CatalogCategoryComponent,
    CategoryComponentHeader,
    CategoryComponentCatalog,
    SubCategoryComponentCatalog,
    OrdersComponent,
    CatalogCarsComponent,
    ModelComponent,
    ModelDetailComponent,
    FilterCityPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule,
    HttpClientModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
