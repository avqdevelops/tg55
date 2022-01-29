import { ProductService } from './../../shared/service/product/product.service';
import jwt_decode from "jwt-decode";
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { CategoryService } from 'src/app/shared/service/category/category.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public headerElse = {
    'header-else': false,
  }
  public categoryHead!: any
  public loginSubscription!: Subscription;
  public basketSubscription!: Subscription;
  public aboutPage: any;
  public adminLogin = false;
  public userLogin = false;
  public isLogin = false;
  public userName:string = ''
  public countItem: any;
  fixedBoxOffsetTop: number = 0;
  fixedBoxOffsetTopOtherMethod: number = 0;
  @ViewChild('fixedBox') fixedBox!: ElementRef;

  constructor(
    private authService: AuthService,
    private elem: ElementRef,
    private categoryServices: CategoryService,
    private productServices: ProductService
  ) {
  }

  ngOnInit(): void {
    this.checkLogin();
    this.checkChange();
    this.loadCategory();
    this.loadCountBasket();
    this.checkChangeBasket();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const rect = this.fixedBox.nativeElement.getBoundingClientRect();
    this.fixedBoxOffsetTop = +rect.top + window.pageYOffset - document.documentElement.clientTop;
    console.log(this.fixedBoxOffsetTop);
    if (this.fixedBoxOffsetTop > 40) {
      this.headerElse = {
        'header-else': true,
      }
    } else {
      this.headerElse = {
        'header-else': false,

      }
    }
  }

  loadCountBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart') as string);
      this.countItem = cart.length
    } else {
      this.countItem = false;
    }
  }

  loadCategory(): void {
    this.categoryServices.loadHeaderCategory().subscribe(categoryHeader => {
      this.categoryHead = categoryHeader
      console.log(this.categoryHead);
    }, err => {
      console.log(`load category error`, err);
    })
  }



  checkChange(): void {
    this.loginSubscription = this.authService.$changeLoginSubject.subscribe(() => {
      this.checkLogin()
    })
  }

  checkLogin() {
    if (this.authService.userSubject.value) {
      if (this.authService.userSubject.value.role === 'ADMIN') {
        this.adminLogin = true;
        this.isLogin = true
      } else {
        this.userName = this.authService.userSubject.value.firstName;
        this.isLogin = true
        this.userLogin = true
        this.adminLogin = false
      }
    } else {
      this.userName = ''
      this.isLogin = false
      this.adminLogin = false
    }
  }

  checkChangeBasket() {
    this.basketSubscription = this.productServices.$checkBasket.subscribe(() => {
      this.loadCountBasket();
    })
  }

  openModal(status: boolean, event: any): void {
    const modal = this.elem.nativeElement.querySelector('.modal-basket');
    if (status) {
      document.body.style.overflowY = 'hidden'
      modal.style.opacity = '1';
      modal.style.visibility = 'visible';
    } else {
      const close = event.target.className
      close.split(' ').forEach((elem: any) => {
        if (elem == 'close') {
          modal.style.opacity = '0';
          modal.style.visibility = 'hidden';
          document.body.style.overflowY = 'scroll';
        }
      });
    }
  }
  openLogin(status: boolean, event: any): void {
    const modal = this.elem.nativeElement.querySelector('.modal-login');
    if (status) {
      document.body.style.overflowY = 'hidden'
      modal.style.opacity = '1';
      modal.style.visibility = 'visible';
    } else {
      const close = event.target.className
      close.split(' ').forEach((elem: any) => {
        if (elem == 'close') {
          modal.style.opacity = '0';
          modal.style.visibility = 'hidden';
          document.body.style.overflowY = 'scroll';
        }
      });
    }
  }


  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe
    } else if (this.basketSubscription) {
      this.basketSubscription.unsubscribe()
    }
  }

}
