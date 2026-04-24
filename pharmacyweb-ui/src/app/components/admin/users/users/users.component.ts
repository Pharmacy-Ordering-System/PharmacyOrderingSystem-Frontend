import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading = true;
  error = '';
selectedUserDetails: any = null;
selectedUserId: number | null = null;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.loadUsers(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user');
        }
      });
    }
  }

  viewUserDetails(userId: number) {
  if (this.selectedUserId === userId) {
    // toggle close
    this.selectedUserId = null;
    this.selectedUserDetails = null;
    return;
  }

  this.selectedUserId = userId;

  this.userService.getUserDetails(userId).subscribe({
    next: (res: any) => {
      this.selectedUserDetails = res;
    },
    error: (err) => {
      console.error('Error loading user details:', err);
    }
  });
}
}