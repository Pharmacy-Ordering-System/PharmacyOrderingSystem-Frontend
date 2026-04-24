import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  // ✅ Get current user profile
  getCurrentUser() {
    return this.http.get(`${this.apiUrl}/me`);
  }

  // ✅ Get all users (Admin only)
  getAllUsers() {
    return this.http.get(this.apiUrl);
  }

  // ✅ Get user by ID (Admin only)
  getUserById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✅ Update user profile - CORRECT ENDPOINT
 updateUser(id: number, data: any) {
  // Tell Angular to expect text response, not JSON
  return this.http.put(`${this.apiUrl}/update`, data, {
    responseType: 'text'  // ✅ Add this
  });
}

  // ✅ Delete user (Admin only)
  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}