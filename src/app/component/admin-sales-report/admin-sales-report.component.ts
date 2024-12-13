import { Component, Input } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProductDesctiptionTableComponent } from '../product-desctiption-table/product-desctiption-table.component';
import { AdminReportServiceService } from '../../services/admin-report-service.service';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import * as XLSX from 'xlsx'; 

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductSaleInfoComponent } from '../product-sale-info/product-sale-info.component';

@Component({
  selector: 'app-admin-sales-report',
  imports: [
    TopbarComponent,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ProductDesctiptionTableComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ProductSaleInfoComponent,
    ProgressSpinnerModule
    
  ],
  templateUrl: './admin-sales-report.component.html',
  styleUrl: './admin-sales-report.component.css',
})
export class AdminSalesReportComponent {

  isMenuOpen: boolean = false;
  AdminSalesReportInputData: FormGroup = new FormGroup({
    BrandID: new FormControl(''),
    DealerID: new FormControl(''),
    LocationID: new FormControl(''),
    FormDate: new FormControl(''),
    ToDate: new FormControl(''),
    PartNumber: new FormControl(''),
  });

  ngOnInit(): void {
    this.fetchBrandAdminData();
  }

  onSelectionChangeBrandData() {
    this.fetchDealerAdminData(this.AdminSalesReportInputData.value.BrandID);
    console.log(this.AdminSalesReportInputData.value);
  }

  onSelectionChangeDealerData() {
    this.fetchLocationAdminData(this.AdminSalesReportInputData.value.DealerID);
    console.log(this.AdminSalesReportInputData.value);
  }

  onSelectionChangeLocationData() {
    console.log(this.LocationData);
    
  }

  constructor(private adminreportdata: AdminReportServiceService) {}

  BrandData: any = [];
  DealerData: any = [];
  LocationData: any = [];
  PartDetail: any = [];
  SalesInfo: any = [];
  isLoading:boolean = false;

  fetchBrandAdminData() {
    this.isLoading = true
    this.adminreportdata.getBrandData().subscribe((res: any) => {
      this.BrandData = res;
      this.isLoading = false
    });
  }
  onSubmitAdminInputData() {
    console.log(this.AdminSalesReportInputData.value);
    
    this.fetchPartDescription(this.AdminSalesReportInputData.value.BrandID,this.AdminSalesReportInputData.value.PartNumber)
    this.onSelectionChangeLocationData()
  }
  onClickShowSaleinfo(){
    this.fetchSalesInfo(this.AdminSalesReportInputData.value.DealerID,this.AdminSalesReportInputData.value.LocationID,this.PartDetail[0].partid,this.AdminSalesReportInputData.value.FormDate,this.AdminSalesReportInputData.value.ToDate)
    
  }

  fetchDealerAdminData(brandid: any) {
    this.adminreportdata
      .getDealerData({ brandid: brandid })
      .subscribe((res: any) => {
        this.DealerData = res;
      });
  }

  fetchLocationAdminData(dealerid: any) {
    this.adminreportdata
      .getLocaitonData({ dealerid: dealerid })
      .subscribe((res: any) => {
        this.LocationData = res;
      });
  }

  fetchPartDescription(brandid:any,partnumber:any){
    this.isLoading = true
    this.adminreportdata.getPartDescription({Brandid: brandid, Partnumber:partnumber}).subscribe((res:any)=>{
      this.PartDetail = res
      this.isLoading = false
      console.log(this.PartDetail);
      
    })
  }

  fetchSalesInfo(Dealerid: any,Locationid:any,Partid:any,from:any,to:any){
    this.isLoading = true
    this.adminreportdata.getSalesInfo({Dealerid:Dealerid,Locationid:Locationid,Partid:Partid,from:from,to:to}).subscribe((res:any)=>{
      this.SalesInfo = res
      this.isLoading = false
      console.log(this.SalesInfo)
    })
  }

  // exportToExcel() {
  //   const ws = XLSX.utils.json_to_sheet(this.SalesInfo);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb,ws,'Sales Info');
  //   XLSX.writeFile(wb,'SalesInfoData.xlsx');
    
  // }
  exportToExcel(){

    const flatData = [...this.SalesInfo[0], ...this.SalesInfo[1]];
    // Convert JSON to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flatData);
  
    // Create a workbook
    const workbook: XLSX.WorkBook = {
      Sheets: { 'SalesInfo': worksheet },
      SheetNames: ['SalesInfo']
    };
  
    // Write the workbook
    XLSX.writeFile(workbook, `SalesInfo.xlsx`);
  }
  
  

  






}
