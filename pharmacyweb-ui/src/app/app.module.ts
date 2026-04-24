import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* SHARED */
/* AUTH */
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

/* USER */
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
/* ADMIN */
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MedicinesComponent } from './components/admin/medicines/medicines.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { InventoryComponent } from './components/admin/inventory/inventory.component';
import { LoyaltyComponent } from './components/admin/loyalty/loyalty.component';
import { HealthPackagesComponent } from './components/admin/health-packages/health-packages.component';

/* INTERCEPTOR */
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MedicineCardComponent } from './components/shared/medicine-card/medicine-card.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { MedicineListComponent } from './components/medicine/medicine-list/medicine-list.component';
import { MedicineDetailComponent } from './components/medicine/medicine-detail/medicine-detail.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { UploadComponent } from './components/prescription/upload/upload.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UsersComponent } from './components/admin/users/users/users.component';

@NgModule({
  declarations: [
    AppComponent,

    /* SHARED */
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    MedicineCardComponent,

    /* AUTH */
    LoginComponent,
    RegisterComponent,

    /* USER */
    HomeComponent,
    CategoryListComponent,

    MedicineListComponent,
    MedicineDetailComponent,

    CartComponent,

    OrderListComponent,
    OrderDetailComponent,

    UploadComponent,

    /* ADMIN */
    DashboardComponent,
    MedicinesComponent,
    OrdersComponent,
    InventoryComponent,
    LoyaltyComponent,
    HealthPackagesComponent,
    ProfileComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,          // 🔥 fixes ngModel
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}