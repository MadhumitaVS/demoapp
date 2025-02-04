import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Ensure correct path

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Get the current user from the AuthService
    const currentUser = this.authService.currentUserValue;

    // If no user is logged in, redirect to login page
    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if the user has the required role
    const requiredRole = route.data['role'];
    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      this.router.navigate(['/forbidden']);
      return false;
    }

    // Allow access if the user is logged in and has the required role
    return true;
  }
}
