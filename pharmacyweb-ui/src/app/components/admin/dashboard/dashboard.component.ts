import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MedicineService } from '../../../services/medicine.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalMedicines = 0;
  totalOrders = 0;
  pendingOrders = 0;
  lowStockCount = 0;
  loading = true;

  constructor(
    private medicineService: MedicineService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    forkJoin({
      medicines: this.medicineService.getAllMedicines(),
      orders: this.orderService.getAllOrders()
    }).subscribe({
      next: ({ medicines, orders }) => {
        this.totalMedicines = medicines.length;
        this.totalOrders = orders.length;
        this.pendingOrders = orders.filter((o: any) =>
          String(o.status).toLowerCase().includes('pending') || o.status === 0
        ).length;
        this.lowStockCount = medicines.filter((m: any) => (m.inventory?.stock ?? 0) < 5).length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}