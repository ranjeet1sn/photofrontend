import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  title = 'photo-frotnend';
  constructor(private autService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.autService.isLoggedIn();
    this.autService.isAuthenticated.subscribe((res) => {
      this.isAuthenticated = res;
    });
  }
  logout() {
    this.autService.logout();
  }
}
