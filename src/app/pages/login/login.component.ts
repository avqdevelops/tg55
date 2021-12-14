import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private fb: FormBuilder,private authService:AuthService, private router:Router) { }

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

  loginUser(){
    this.loginSubscription = this.authService.login(this.loginForm.value).subscribe((data:any) => {
      if(data.role === 'ADMIN'){
       this.router.navigate(['admin'])
      }
      localStorage.setItem('user', JSON.stringify(data));
      this.authService.$checkLogin.next(true);
      this.initFormLogin();
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
    if (status) {
      this.loginPage = { 'moveRegister': true }
      this.registerPage = { 'moveLogin': true }
    } else {
      this.loginPage = { 'moveRegister': false }
      this.registerPage = { 'moveLogin': false }
    }
  }

 ngOnDestroy(){
   if(this.loginSubscription){
     this.loginSubscription.unsubscribe()
   }
 }

}
