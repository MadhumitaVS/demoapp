import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // Get the expected role from the route data

    const userRole = this.authService.getUserRole();

    if (this.authService.isLoggedIn() && userRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/forbidden']); // Redirect to a forbidden page or login
      return false;
    }
  }
}