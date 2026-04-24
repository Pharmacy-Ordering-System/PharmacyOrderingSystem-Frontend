import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  updatingOrderId: number | null = null;

  statusOptions = [
    { label: 'Pending', value: 0 },
    { label: 'Approved', value: 1 },
    { label: 'Completed', value: 2 },
    { label: 'Rejected', value: 3 }
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getStatusLabel(status: number | string): string {
    if (typeof status === 'string') return status;
    const match = this.statusOptions.find(x => x.value === status);
    return match ? match.label : 'Unknown';
  }

  getStatusClass(status: number | string): string {
    const label = this.getStatusLabel(status).toLowerCase();

    if (label.includes('pending')) return 'pending';
    if (label.includes('approved')) return 'approved';
    if (label.includes('completed')) return 'completed';
    if (label.includes('rejected')) return 'rejected';

    return '';
  }

  updateStatus(orderId: number, status: number): void {
    this.updatingOrderId = orderId;

    this.orderService.updateOrderStatus(orderId, { status }).subscribe({
      next: () => {
        this.updatingOrderId = null;
        this.loadOrders();
      },
      error: () => {
        this.updatingOrderId = null;
      }
    });
  }

  getItemCount(order: any): number {
    return order.items?.length || 0;
  }

  getTotalQuantity(order: any): number {
    if (!order.items) return 0;
    return order.items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
  }
}