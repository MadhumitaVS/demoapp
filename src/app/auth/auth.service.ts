import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model'; // Make sure this path is correct

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'assets/mock-data.json';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.username === username && user.password === password)),
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.isAuthenticatedSubject.next(true);
          this.userRoleSubject.next(user.role);
        } else {
          this.isAuthenticatedSubject.next(false);
          this.userRoleSubject.next(null);
        }
      }),
      map(user => !!user) // Correct: map to a boolean
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }
}