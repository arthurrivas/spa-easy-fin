import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError, catchError } from "rxjs";
import { UserStorageService } from "../store/user-store.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private storageService: UserStorageService
  ) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403 || err.status === 500) {
      //navigate /delete cookies or whatever

      console.log('erro interceptor');
      this.storageService.removeToken();

      this.router.navigate(['/login']);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }

    console.log('passou interceptor');

    return throwError(err);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        '' + this.storageService.getToken()
      ),
    });
    // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
    return next
      .handle(authReq)
      .pipe(catchError((x) => this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
  }
}
