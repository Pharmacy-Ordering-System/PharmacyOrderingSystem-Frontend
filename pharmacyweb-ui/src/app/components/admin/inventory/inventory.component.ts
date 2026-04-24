import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { MedicineService } from '../../../services/medicine.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventory: any[] = [];

  constructor(
    private inventoryService: InventoryService,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory() {
  this.inventoryService.getAllInventory().subscribe({
    next: (data: any[]) => {
      this.inventory = data.map(item => ({
        id: item.medicineId,
        medicine: item.medicine,
        stock: item.stock,
        newStock: item.stock
      }));
    },
    error: (err) => {
      console.error(err);
    }
  });
}

  updateStock(item: any) {
    this.inventoryService.updateInventory(item.id, item.newStock)
      .subscribe(() => {
        this.loadInventory();
      });
  }
}