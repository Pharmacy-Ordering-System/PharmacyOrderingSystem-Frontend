import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* AUTH */
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

/* USER */
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { MedicineListComponent } from './components/medicine/medicine-list/medicine-list.component';
import { MedicineDetailComponent } from './components/medicine/medicine-detail/medicine-detail.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { UploadComponent } from './components/prescription/upload/upload.component';
import { ProfileComponent } from './components/user/profile/profile.component';

/* ADMIN */
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MedicinesComponent } from './components/admin/medicines/medicines.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { InventoryComponent } from './components/admin/inventory/inventory.component';
import { LoyaltyComponent } from './components/admin/loyalty/loyalty.component';
import { HealthPackagesComponent } from './components/admin/health-packages/health-packages.component';
import { UsersComponent } from './components/admin/users/users/users.component';

/* GUARDS */
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';



const routes: Routes = [

  /* DEFAULT */
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  /* AUTH */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  /* PUBLIC USER ROUTES */
  { path: 'home', component: HomeComponent },

  {
    path: 'medicines',
    component: MedicineListComponent   // ✅ PUBLIC
  },

  /* PROTECTED USER ROUTES */

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'medicine/:id',
    component: MedicineDetailComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'orders/:id',
    component: OrderDetailComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'upload-prescription',
    component: UploadComponent,
    canActivate: [AuthGuard]
  },

  /* ADMIN ROUTES */

  {
  path: 'admin/users',
  component: UsersComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { role: 'Admin' }
},
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },

  {
    path: 'admin/medicines',
    component: MedicinesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },

  {
    path: 'admin/orders',
    component: OrdersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },

  {
    path: 'admin/inventory',
    component: InventoryComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },

  {
    path: 'admin/loyalty',
    component: LoyaltyComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },

  {
    path: 'admin/health-packages',
    component: HealthPackagesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },

  /* FALLBACK */
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}