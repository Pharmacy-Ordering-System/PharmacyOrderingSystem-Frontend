import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = {
    email: '',
    password: ''
  };

  loading = false;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login() {
    this.loading = true;
    this.error = '';

    this.auth.login(this.formData).subscribe({
      next: (res: any) => {

        // ✅ Save token
        this.auth.saveToken(res.token);

        // 🔥 GET returnUrl (IMPORTANT)
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];

        // 🔥 GET role
        const role = this.auth.getRole();

        // ✅ PRIORITY 1 → returnUrl (user clicked something before login)
        if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
          return;
        }

        // ✅ PRIORITY 2 → role-based redirect
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }

      },
      error: () => {
        this.error = 'Invalid credentials';
        this.loading = false;
      }
    });
  }
}