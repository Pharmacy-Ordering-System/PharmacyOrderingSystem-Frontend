import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  role: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.role = this.auth.getRole();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getCartCount(): number {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length;
  }
}