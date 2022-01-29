import { Component, OnDestroy, OnInit, ElementRef, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginSubscription!: Subscription;
  public registerForm!: FormGroup;
  public loginForm!: FormGroup;
  public registerPage = { 'moveLogin': false };
  public loginPage = { 'moveRegister': false };
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private elemRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.initFormRegister();
    this.initFormLogin();
  }

  initFormRegister() {
    this.registerForm = this.fb.group({
      email: [null, Validators.email],
      password: [null, Validators.minLength(6)],
      phoneNumber: [null],
      role: 'USER'
    })
  }
  initFormLogin() {
    this.loginForm = this.fb.group({
      email: [null, Validators.email],
      password: [null, Validators.minLength(6)],
    })
  }

  loginUser(): void {
    for (const key in this.loginForm.controls) {
      if (!this.loginForm.controls[key].valid) {
        if (key === 'email') {
          this.elemRef.nativeElement.querySelector(`#login-${key}`).style.borderBottom = '2px solid red';
          this.toastr.error('Некоректний Email')
        } else if (key === 'password') {
          this.elemRef.nativeElement.querySelector(`#login-${key}`).style.borderBottom = '2px solid red';
          this.toastr.error('Мінімальна довжина пароля 6 символів')
        }
      } else {
        this.loginSubscription = this.authService.login(this.loginForm.value).subscribe(() => {
          this.initFormLogin();
        }, error => {
          this.toastr.error(error)
          console.log(error)
        })
      }
    }
  }

  registerUser() {
    this.authService.logOut()
  }


  moveRegisterPage(status: boolean) {
    let elem = this.elemRef.nativeElement.querySelector('.container')
    if (status) {
      elem.classList.add("right-panel-active");
    } else {
      elem.classList.remove("right-panel-active");
    }
  }

  closeLoginModal(event: any) {
    const close = event.target.className
    close.split(' ').forEach((elem: any) => {
      if (elem == 'close') {
        document.body.style.overflowY = 'scroll';
      }
    });
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe()
    }
  }

}

