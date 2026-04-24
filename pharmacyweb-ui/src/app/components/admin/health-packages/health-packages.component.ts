import { Component, OnInit } from '@angular/core';
import { HealthPackageService } from '../../../services/health-package.service';

@Component({
  selector: 'app-health-packages',
  templateUrl: './health-packages.component.html',
  styleUrls: ['./health-packages.component.css']
})
export class HealthPackagesComponent implements OnInit {

  packages: any[] = [];
  loading = true;

  formData = {
    id: 0,
    name: '',
    description: '',
    price: 0
  };

  isEdit = false;
  showForm = false;

  constructor(private service: HealthPackageService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.service.getAll().subscribe(res => {
      this.packages = res;
      this.loading = false;
    });
  }

  openAdd() {
    this.showForm = true;
    this.isEdit = false;
    this.formData = { id: 0, name: '', description: '', price: 0 };
  }

  openEdit(pkg: any) {
    this.showForm = true;
    this.isEdit = true;
    this.formData = { ...pkg };
  }

  save() {
    if (this.isEdit) {
      this.service.update(this.formData.id, this.formData).subscribe(() => {
        this.showForm = false;
        this.loadPackages();
      });
    } else {
      this.service.create(this.formData).subscribe(() => {
        this.showForm = false;
        this.loadPackages();
      });
    }
  }

  delete(id: number) {
    if (!confirm('Delete package?')) return;

    this.service.delete(id).subscribe(() => this.loadPackages());
  }
}