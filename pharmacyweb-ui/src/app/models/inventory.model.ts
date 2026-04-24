import { Medicine } from './medicine.model';

export interface Inventory {
  id: number;
  medicineId: number;
  medicine?: Medicine;
  stock: number;
}