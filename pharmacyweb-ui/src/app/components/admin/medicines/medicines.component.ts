import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../../../services/medicine.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-admin-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  medicines: any[] = [];
  categories: any[] = [];
  loading = true;

  formData: any = {
    id: 0,
    name: '',
    dosage: '',
    price: 0,
    categoryId: 0,
    stock: 0
  };

  isEdit = false;
  showForm = false;

  constructor(
    private medicineService: MedicineService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
    this.loadCategories();
  }

  loadMedicines(): void {
    this.medicineService.getAllMedicines().subscribe({
      next: (res) => {
        this.medicines = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      }
    });
  }

  openAddForm(): void {
    this.isEdit = false;
    this.showForm = true;
    this.formData = {
      id: 0,
      name: '',
      dosage: '',
      price: 0,
      categoryId: 0,
      stock: 0
    };
  }

  openEditForm(medicine: any): void {
    this.isEdit = true;
    this.showForm = true;
    this.formData = {
      id: medicine.id,
      name: medicine.name,
      dosage: medicine.dosage,
      price: medicine.price,
      categoryId: medicine.categoryId,
      stock: medicine.inventory?.stock || 0
    };
  }

  
   saveMedicine(): void {
  const payload = {
    id: this.formData.id,
    name: this.formData.name,
    dosage: this.formData.dosage,
    price: this.formData.price,
    categoryId: this.formData.categoryId,
    stock: this.formData.stock // ✅ include stock
  };

  if (this.isEdit) {
    this.medicineService.updateMedicine(this.formData.id, payload).subscribe(() => {
      this.showForm = false;
      this.loadMedicines();
    });
  } else {
    this.medicineService.createMedicine(payload).subscribe(() => {
      this.showForm = false;
      this.loadMedicines();
    });
  }
}
  deleteMedicine(id: number): void {
    if (!confirm('Delete this medicine?')) return;

    this.medicineService.deleteMedicine(id).subscribe(() => {
      this.loadMedicines();
    });
  }

  cancelForm(): void {
    this.showForm = false;
  }
}