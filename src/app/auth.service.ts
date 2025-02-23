import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/user.model'; // Make sure you have a User model

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hasRole(requiredRole: any) {
    throw new Error('Method not implemented.');
  }

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    // Assuming the user data is stored in localStorage
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // Login method should return a boolean indicating success/failure
  login(username: string, password: string): boolean {
    if (username === 'user' && password === 'password') {
      const user = { username, roles: ['user'] }; // Example user data, replace with actual user data
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user); // Update the current user observable
      return true; // Login successful
    } else {
      return false; // Login failed
    }
  }
}
