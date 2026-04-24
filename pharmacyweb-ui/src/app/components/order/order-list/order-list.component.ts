import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: any[] = [];
  loading = true;

  constructor(
    private service: OrderService,
    private medicineService: MedicineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.loading = false;
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId =
      payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
      payload['nameid'] ||
      payload['sub'];

    this.service.getAllOrders().subscribe((res: any) => {

      const allOrders = res.data || res;

      const userOrders = allOrders.filter((o: any) => Number(o.userId) === Number(userId));

      this.medicineService.getAll().subscribe((meds: any[]) => {

        this.orders = userOrders.map((order: any) => ({
          ...order,
          items: (order.items || []).map((item: any) => {
            const med = meds.find((m: any) => m.id === item.medicineId);
            return { ...item, medicine: med };
          })
        }));

        this.loading = false;
      });

    });
  }

  // goToDetail(id: number) {
  //   this.router.navigate(['/orders', id]);
  // }
getStatusText(status: any) {
  switch (status) {
    case 0: return 'Placed';
    case 1: return 'Approved';
    case 2: return 'Completed';
    case 3: return 'Rejected';
    default: return 'Placed';
  }
}
  getStatusClass(status: any) {
  switch (status) {
    case 0: return 'pending';
    case 1: return 'approved';
    case 2: return 'completed';
    case 3: return 'rejected';
    default: return 'pending';
  }
}

  getOrderTotal(order: any) {
    return order.items?.reduce(
      (sum: number, i: any) => sum + (i.quantity * (i.medicine?.price || 0)),
      0
    ) || 0;
  }
}