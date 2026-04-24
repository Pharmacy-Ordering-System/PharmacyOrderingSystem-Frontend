import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-medicine-detail',
  templateUrl: './medicine-detail.component.html',
  styleUrls: ['./medicine-detail.component.css']
})
export class MedicineDetailComponent implements OnInit {

  medicine: any;
  selectedFile: File | null = null;
  selectedFileContent: string = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private service: MedicineService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.service.getMedicineById(id).subscribe((res: any) => {
      this.medicine = res.data || res;
    });
  }

  // 🔥 FILE UPLOAD + READ CONTENT
  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file && file.name.endsWith('.txt')) {

      this.selectedFile = file;
      this.error = '';

      const reader = new FileReader();

      reader.onload = () => {
        this.selectedFileContent = (reader.result as string).toLowerCase();
      };

      reader.readAsText(file);

    } else {
      this.error = 'Only .txt files allowed';
      this.selectedFile = null;
      this.selectedFileContent = '';
    }
  }

  // 🔥 ADD TO CART WITH VALIDATION
  addToCart() {

    if (!this.selectedFileContent) {
      this.error = 'Upload prescription first';
      return;
    }

    const nameMatch = this.selectedFileContent.includes(
      this.medicine.name.toLowerCase()
    );

    const dosageMatch = this.selectedFileContent.includes(
      this.medicine.dosage.toLowerCase()
    );

    if (!nameMatch || !dosageMatch) {
      this.error = 'Prescription does not match this medicine';
      return;
    }

    // ✅ ADD TO CART
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existing = cart.find((item: any) => item.id === this.medicine.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...this.medicine,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Added to cart successfully');
  }
}