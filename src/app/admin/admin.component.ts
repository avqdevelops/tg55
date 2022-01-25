import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  scroll():void{
    document.body.style.overflowY = 'scroll';
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['']);
    this.authService.$checkLogin.next(true);
    document.body.style.overflowY = 'scroll';
  }

}
