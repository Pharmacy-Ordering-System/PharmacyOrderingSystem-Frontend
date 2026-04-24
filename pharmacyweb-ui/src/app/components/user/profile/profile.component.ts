import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {
    userId: 0,
    name: '',
    email: '',
    role: '',
    createdAt: ''
  };
  loading = true;
  saving = false;
  message = '';
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.userService.getCurrentUser().subscribe({
      next: (res: any) => {
        this.user = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  updateProfile() {
    this.saving = true;
    this.message = '';
    this.error = '';

    const updateData = { name: this.user.name };

    this.userService.updateUser(this.user.userId, updateData).subscribe({
      next: (response: any) => {
        // Handle both JSON and text response
        if (typeof response === 'string') {
          this.message = response;
        } else if (response?.message) {
          this.message = response.message;
        } else {
          this.message = 'Profile updated successfully!';
        }
        this.saving = false;
        setTimeout(() => this.message = '', 3000);
      },
      error: (err) => {
        console.error('Update error:', err);
        this.error = err.error?.message || err.message || 'Update failed';
        this.saving = false;
      }
    });
  }
}