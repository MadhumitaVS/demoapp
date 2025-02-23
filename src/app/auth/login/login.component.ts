import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Invalid username or password';
        }
      },
      error: (err: any) => {
        console.error("Login error:", err);
        this.error = 'An error occurred during login.';
      }
    });
  }
}