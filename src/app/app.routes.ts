import { Routes } from '@angular/router';
import { AdminSalesReportComponent } from './component/admin-sales-report/admin-sales-report.component';

export const routes: Routes = [{
    path:'app-admin-sales-report', 
    component: AdminSalesReportComponent
},{
    path: '',redirectTo: 'app-admin-sales-report',
    pathMatch: 'full'
}];
