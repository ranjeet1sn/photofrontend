import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  login(data) {
    return this.http.post<any>(`${environment.apiUrl}auth/login`, data).pipe(
      map((res) => {
        localStorage.setItem('token', res.token);
        this.isAuthenticated.next(true);
        return res;
      })
    );
  }
  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
  }

  logout() {
    this.isAuthenticated.next(false);
    this.router.navigate(['/auth/login']).then((res) => {
      localStorage.removeItem('token');
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
