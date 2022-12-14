import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from '../store/user-store.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: StorageService
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const token = this.storageService.getToken()

      if (token != null) return true;

      this.router.navigate(['login'])
      return false
    
    return true;
  }
}
