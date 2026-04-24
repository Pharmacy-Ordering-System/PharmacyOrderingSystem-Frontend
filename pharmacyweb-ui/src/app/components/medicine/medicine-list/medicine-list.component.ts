import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { Medicine } from 'src/app/models/medicine.model';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {

  medicines: Medicine[] = [];
  allMedicines: Medicine[] = [];
  categories: any[] = [];

  searchText: string = '';
  selectedCategoryId: number = 0; // ✅ FIXED

  constructor(
    private medicineService: MedicineService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
    this.loadCategories();
  }

  // ✅ LOAD MEDICINES
  loadMedicines() {
    this.medicineService.getAllMedicines().subscribe((res: any) => {
      this.allMedicines = res.data || res;
      this.medicines = this.allMedicines;
    });
  }

  // ✅ LOAD CATEGORIES
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data || res;
    });
  }

  // 🔍 SEARCH + CATEGORY FILTER
  filterMedicines() {
    this.medicines = this.allMedicines.filter(m =>
      m.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedCategoryId === 0 || m.categoryId === this.selectedCategoryId)
    );
  }

  // 🧠 CATEGORY SELECT
  selectCategory(id: number) {
    this.selectedCategoryId = id;
    this.filterMedicines();
  }

  // 🔄 CLEAR FILTER
  clearFilter() {
    this.selectedCategoryId = 0;
    this.searchText = '';
    this.medicines = this.allMedicines;
  }
}