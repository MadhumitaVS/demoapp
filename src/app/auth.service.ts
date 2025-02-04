import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';  // Added Observable import
import { User } from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // This method checks if the current user has a specific role
  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user && user.roles && user.roles.includes(role);
  }

  // Add other authentication methods as needed (login, logout, etc.)
}
