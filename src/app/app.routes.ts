import { Routes } from '@angular/router';
import { AdminSalesReportComponent } from './component/admin-sales-report/admin-sales-report.component';
import { LoginPageComponent } from './component/login-page/login-page.component';



export const routes: Routes = [
  {
    path: 'app-admin-sales-report',
    component: AdminSalesReportComponent,
  },
  {
    path: 'app-login-page',
    component: LoginPageComponent,
  },
  {
    path: '',redirectTo: 'app-admin-sales-report',
    pathMatch: 'full'
  }
];
