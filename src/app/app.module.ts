import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


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
import { CatalogComponent } from './pages/catalog/catalog.component';
import { HeaderCategoryComponent } from './admin/header-category/header-category.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { OrdersComponent } from './pages/orders/orders.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FilterCityPipe } from './shared/pipes/filterCity/filter-city.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { HeaderCategoryActionsComponent } from './admin/header-category/header-category-actions/header-category-actions.component';
import { HeaderCategoryTablesComponent } from './admin/header-category/header-category-tables/header-category-tables.component';
import { ProductsTableComponent } from './admin/admin-products/products-table/products-table.component';
import { ProductsActionsComponent } from './admin/admin-products/products-actions/products-actions.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { OrdersTableComponent } from './admin/admin-orders/orders-table/orders-table.component';
import { OrdersDetailComponent } from './admin/admin-orders/orders-detail/orders-detail.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';


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
    CatalogComponent,
    HeaderCategoryComponent,
    OrdersComponent,
    FilterCityPipe,
    HeaderCategoryActionsComponent,
    HeaderCategoryTablesComponent,
    ProductsTableComponent,
    ProductsActionsComponent,
    ProductDetailComponent,
    OrdersTableComponent,
    OrdersDetailComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule,
    HttpClientModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    PinchZoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
