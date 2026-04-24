import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private service: OrderService,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.service.getAllOrders().subscribe((orders: any) => {

      const allOrders = orders.data || orders;
      const found = allOrders.find((o: any) => o.id == id);

      this.medicineService.getAll().subscribe((meds: any[]) => {

        this.order = {
          ...found,
          items: (found.items || []).map((item: any) => {
            const med = meds.find((m: any) => m.id === item.medicineId);
            return { ...item, medicine: med };
          })
        };

        this.loading = false;
      });
    });
  }

  getStatusClass(status: any) {
    const s = String(status).toLowerCase();

    if (s.includes('placed') || s.includes('pending')) return 'pending';
    if (s.includes('approved')) return 'approved';
    if (s.includes('completed')) return 'completed';
    if (s.includes('rejected')) return 'rejected';

    return '';
  }

  getOrderTotal(order: any) {
    return order.items?.reduce(
      (sum: number, i: any) => sum + (i.quantity * (i.medicine?.price || 0)),
      0
    ) || 0;
  }
}