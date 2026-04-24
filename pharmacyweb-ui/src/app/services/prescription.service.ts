import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PrescriptionService {

  private apiUrl = `${environment.apiUrl}/prescriptions`;

  constructor(private http: HttpClient) {}

  uploadPrescription(data: FormData) {
    return this.http.post(`${this.apiUrl}/upload`, data);
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }
}