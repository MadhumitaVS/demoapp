// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;

    // If the user is not logged in, redirect to the login page
    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data['role'];

    // If a role is required and the user does not have it, redirect to the forbidden page
    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      this.router.navigate(['/forbidden']);
      return false;
    }

    // User is allowed
    return true;
  }
}
