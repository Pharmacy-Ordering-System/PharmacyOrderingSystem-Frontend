import { Component } from '@angular/core';
import { LoyaltyService } from '../../../services/loyalty.service';

@Component({
  selector: 'app-loyalty',
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.css']
})
export class LoyaltyComponent {

  userId = 0;
  points = 0;
  result: any;

  constructor(private service: LoyaltyService) {}

  getPoints() {
    this.service.getByUser(this.userId).subscribe(res => {
      this.result = res;
    });
  }

  addPoints() {
    this.service.addPoints({
      userId: this.userId,
      points: this.points
    }).subscribe(() => {
      alert('Points added');
      this.getPoints();
    });
  }
}