import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  createOrder(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getAllOrders() {
    return this.http.get<Order[]>(this.apiUrl);
  }

  updateOrderStatus(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}/status`, data);
  }
}