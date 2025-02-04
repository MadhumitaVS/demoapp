// src/app/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // If the user is not logged in, redirect to login page
    const currentUser = this.authService.currentUserSubject.value;
    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    // If the user doesn't have the required role, redirect to a forbidden page (or another route)
    const requiredRole = route.data['role'];
    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      this.router.navigate(['/forbidden']);
      return false;
    }

    return true;
  }
}
