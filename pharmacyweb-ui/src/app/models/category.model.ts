import { Medicine } from './medicine.model';

export interface Category {
  id: number;
  name: string;
  medicines?: Medicine[];
}