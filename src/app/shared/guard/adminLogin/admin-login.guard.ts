import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.adminLogin();
  }

  adminLogin():boolean{
    if(localStorage.length > 0 && localStorage.getItem('user')){
      const candidate = JSON.parse(localStorage.getItem('user') as string);
      console.log(candidate.role);
      if(candidate.role === 'ADMIN'){
        return true
      }else{
        return false
      }
    }
    return false
  }
  
}
