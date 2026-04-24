import { OrderItem } from './order-item.model';

export interface Order {
  id: number;
  userId: number;
  status: string | number;
  items: OrderItem[];
}