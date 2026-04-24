import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Medicine } from '../models/medicine.model';

@Injectable({ providedIn: 'root' })
export class MedicineService {

  private apiUrl = `${environment.apiUrl}/medicine`;

  constructor(private http: HttpClient) {}
getAll() {
  return this.http.get<any[]>(`${environment.apiUrl}/medicine`);
}
  getAllMedicines() {
    return this.http.get<Medicine[]>(this.apiUrl);
  }

  getMedicineById(id: number) {
    return this.http.get<Medicine>(`${this.apiUrl}/${id}`);
  }

 createMedicine(data: any) {
  return this.http.post(`${this.apiUrl}`, data);
}

  updateMedicine(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteMedicine(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}