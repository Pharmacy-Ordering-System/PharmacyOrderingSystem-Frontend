import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

  loading = false;
  message = '';

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  increase(item: any) {
    item.quantity++;
    this.updateStorage();
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateStorage();
    }
  }

  remove(item: any) {
    this.cartItems = this.cartItems.filter(x => x !== item);
    this.updateStorage();
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  updateStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // 🔥 PLACE ORDER
  placeOrder() {

    if (this.cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    // 🔥 Extract userId safely
    let userId = 0;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId =
        payload["nameid"] ||
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch {
      alert('Invalid token');
      return;
    }

    const orderPayload = {
      userId: Number(userId),
      items: this.cartItems.map((item: any) => ({
        medicineId: item.id,
        quantity: item.quantity
      }))
    };
    console.log("ORDER PAYLOAD:", orderPayload);

    this.loading = true;

    this.orderService.createOrder(orderPayload).subscribe({
      next: () => {

        // ✅ Clear cart
        localStorage.removeItem('cart');
        this.cartItems = [];

        this.loading = false;

        alert('Order placed successfully');

        // ✅ Navigate to orders page
        this.router.navigate(['/orders']);
      },
      error: () => {
        this.loading = false;
        alert('Order failed');
      }
    });
  }
}