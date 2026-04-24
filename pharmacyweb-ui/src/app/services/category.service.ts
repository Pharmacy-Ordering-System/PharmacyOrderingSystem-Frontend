import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private apiUrl = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }
}