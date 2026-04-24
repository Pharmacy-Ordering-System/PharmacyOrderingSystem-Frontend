import { Category } from './category.model';
import { Inventory } from './inventory.model';

export interface Medicine {
  id: number;
  name: string;
  dosage: string;
  price: number;
  categoryId: number;
  category?: Category;
   stock: number; // ✅ ADD THIS
}