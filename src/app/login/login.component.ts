// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Try to log the user in
    if (this.authService.login(this.username, this.password)) {
      // Redirect to a different page after successful login (for example, a dashboard)
      this.router.navigate(['/dashboard']);
    } else {
      // Show an error if login fails
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
