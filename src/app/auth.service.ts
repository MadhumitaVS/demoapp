// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Mock users data
  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
  ];

  // Store login state and user info
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor() {}

  login(username: string, password: string) {
    // Find the user by username and check the password
    const user = this.users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // If the user exists and credentials match, store user info
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  logout() {
    // Clear user info and state on logout
    this.currentUserSubject.next(null);
  }

  // Check if the current user has a particular role
  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === role : false;
  }
}

