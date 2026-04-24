import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicine-card',
  templateUrl: './medicine-card.component.html',
  styleUrls: ['./medicine-card.component.css']
})
export class MedicineCardComponent {

  @Input() medicine: any;

  constructor(private router: Router) {}

  viewDetails() {
    this.router.navigate(['/medicine', this.medicine.id]);
  }

  addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existing = cart.find((x: any) => x.id === this.medicine.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        ...this.medicine,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }
}