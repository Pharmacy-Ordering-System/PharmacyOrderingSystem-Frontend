import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicineService } from '../../services/medicine.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any[] = [];
  medicines: any[] = [];

  constructor(
    private medicineService: MedicineService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadMedicines();
  }

  // ✅ Load Categories
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data || res;
    });
  }

  // ✅ Load Medicines (featured)
  loadMedicines() {
    this.medicineService.getAllMedicines().subscribe((res: any) => {
      const data = res.data || res;

      // show only first 4 as featured
      this.medicines = data.slice(0, 4);
    });
  }

  // ✅ Navigate to medicine details
  viewDetails(id: number) {
  this.router.navigate(['/medicine', id]); 
}

}