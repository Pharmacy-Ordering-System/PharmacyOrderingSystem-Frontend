import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: any[] = [];
  selectedCategoryId: number | null = null;
  loading = true;

  constructor(private service: CategoryService) {}

  ngOnInit(): void {
    this.service.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
  }
}