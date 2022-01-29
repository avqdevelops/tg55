import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest , HttpResponse ,HttpErrorResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth/auth.service";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable()


export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${this.auth.token}` }
          });
        
        return next.handle(req);
    }
}
