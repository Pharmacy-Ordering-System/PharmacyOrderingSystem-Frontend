import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoyaltyService {

  private apiUrl = `${environment.apiUrl}/loyalty`;

  constructor(private http: HttpClient) {}

  getByUser(userId: number) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  addPoints(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}