import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Load user from session storage on service initialization
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: Omit<User, 'id' | 'favorites' | 'recipes'> & { password: string }): Observable<User> {
    const newUser: User = {
      id: Date.now().toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      country: user.country,
      region: user.region,
      favorites: [],
      recipes: []
    };

    return this.http.post<User>(`${this.apiUrl}/users`, newUser).pipe(
      tap(user => {
        this.setCurrentUser(user);
      }),
      catchError(error => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.setCurrentUser(user);
          return user;
        }
        return null;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(null);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userId');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  private setCurrentUser(user: User): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    sessionStorage.setItem('userId', user.id);
    this.currentUserSubject.next(user);
  }
}