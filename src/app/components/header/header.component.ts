import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public headerElse = {
    'header-else': false,
  }
  public loginSubscription!: Subscription;
  public aboutPage: any;
  public adminLogin = false;
  public userLogin = false;
  public isLogin = false;
  fixedBoxOffsetTop: number = 0;
  fixedBoxOffsetTopOtherMethod: number = 0;
  @ViewChild('fixedBox') fixedBox!: ElementRef;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.checkLogin();
    this.checkChange()
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

  checkLogin() {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      const candidate = JSON.parse(localStorage.getItem('user') as string)
      if (candidate.role === 'ADMIN') {
        this.isLogin = true;
        this.adminLogin = true
      } else if (candidate.role === 'USER') {
        this.isLogin = true;
        this.userLogin = true;
      } else {
        this.isLogin = false;
        this.userLogin = false;
        this.adminLogin = false
      }
    }
  }
  checkChange() {
    this.loginSubscription = this.authService.$checkLogin.subscribe(() => {
      this.checkLogin()
    })
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe
    }
  }

}
