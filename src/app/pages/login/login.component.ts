import jwt_decode from "jwt-decode";
import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , OnDestroy {
  public loginSubscription!: Subscription;
  public registerForm!: FormGroup;
  public loginForm!:FormGroup;
  public registerPage = { 'moveLogin': false };
  public loginPage = { 'moveRegister': false };
  constructor(
    private fb: FormBuilder,
    private authService:AuthService, 
    private router:Router, 
    private elemRef:ElementRef
    ) { }

  ngOnInit(): void {
    this.initFormRegister()
    this.initFormLogin()
  }

  initFormRegister() {
    this.registerForm = this.fb.group({
      email: null,
      password: null,
      phoneNumber:null,
      role: 'USER'
    })
  }
  initFormLogin(){
    this.loginForm = this.fb.group({
      email:null,
      password:null
    })
  }

  loginUser():void{
    this.loginSubscription = this.authService.login(this.loginForm.value).subscribe((data:any) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.authService.$checkLogin.next(true);
      this.initFormLogin();
      const decodeUser:any = jwt_decode(data.token)
      if(decodeUser.role === 'ADMIN'){
        this.router.navigate(['admin'])
      }
    },error => {
      console.log(error)
    })
  }

  registerUser(){
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(()=>{
        this.initFormRegister()
    }, err =>{
      alert(err.error.message);
      console.log(err);
    })

  }

  moveRegisterPage(status: boolean) {
    let elem = this.elemRef.nativeElement.querySelector('.container') 
    if (status) {
      elem.classList.add("right-panel-active");
    } else {
      elem.classList.remove("right-panel-active");
    }
  }

  closeLoginModal(event:any){
    const close = event.target.className
    close.split(' ').forEach((elem: any) => {
      if (elem == 'close') {
        document.body.style.overflowY = 'scroll';
      }
    });
  }

 ngOnDestroy(){
   if(this.loginSubscription){
     this.loginSubscription.unsubscribe()
   }
 }

}

