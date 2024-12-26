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
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductSaleInfoComponent } from '../product-sale-info/product-sale-info.component';
import { TotalsumComponent } from "../totalsum/totalsum.component";
import { ButtonModule } from 'primeng/button';
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
    ProgressSpinnerModule,
    TotalsumComponent,
    CalendarModule,
    ButtonModule
],
  templateUrl: './admin-sales-report.component.html',
  styleUrl: './admin-sales-report.component.css',
})
export class AdminSalesReportComponent {


  minDate: Date | undefined;
  maxDate: Date | undefined;
  ngOnInit(): void {
    this.fetchBrandAdminData();
    setTimeout(() => {
      this.showMessage = true;
    }, 10000);
    
    
    this.minDate = new Date(2023, 4, 1); // Month is zero-based (4 = May)

    // Setting the maximum date to the last day of the current month
    const today = new Date();
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), 0);
  }


  isMenuOpen: boolean = false;
  AdminSalesReportInputData: FormGroup = new FormGroup({
    BrandID: new FormControl('',[Validators.required]),
    DealerID: new FormControl('',[Validators.required]),
    LocationID: new FormControl(''),
    FormDate: new FormControl('',[Validators.required]),
    ToDate: new FormControl('',[Validators.required]),
    PartNumber: new FormControl('',[Validators.required]),
  });

  updateFromDate: any = '';
  updateToDate: any = '';


  onSelectionChangeBrandData() {
    this.AdminSalesReportInputData.get('DealerID')?.reset('')
    this.AdminSalesReportInputData.get('LocationID')?.reset('')
    this.AdminSalesReportInputData.get('PartNumber')?.reset()    
    this.fetchDealerAdminData(this.AdminSalesReportInputData.value.BrandID);
    
  }

  onSelectionChangeDealerData() {
    this.fetchLocationAdminData(this.AdminSalesReportInputData.value.DealerID);
    this.AdminSalesReportInputData.get('LocationID')?.reset('')

    // console.log(this.AdminSalesReportInputData.value);
  }

  onSelectionChangeLocationData() {
    // console.log(this.LocationData);
  }

  constructor(private adminreportdata: AdminReportServiceService) {

  }

  AdminSalesReportData: any = []

  BrandData: any = [];
  DealerData: any = [];
  LocationData: any = [];
  PartDetail: any = [];
  SalesInfo: any = [];
  isLoading: boolean = false;
  showMessage: boolean = false;
  
  istotal: boolean = false
  

  onSubmitAdminInputData() {
   
    if(this.AdminSalesReportInputData.valid){
      //console.log(this.AdminSalesReportInputData.value.BrandID,
        
      this.fetchPartDescription(
        this.AdminSalesReportInputData.value.BrandID,
        this.AdminSalesReportInputData.value.PartNumber
      );
    
      // this.onSelectionChangeLocationData();
      this.getLastDateOfMonthForFrom();
      this.getLastDateOfMonthForTo();
      // Proceed with the original logic if the form is valid
      //console.log(this.AdminSalesReportData);
    }
    else {
      // Mark all controls as touched to trigger validation errors
      Object.keys(this.AdminSalesReportInputData.controls).forEach(controlName => {
        this.AdminSalesReportInputData.get(controlName)?.markAsTouched();
      });
       // Stop further execution if the form is invalid
      
    }
   
  }
  
  
    
    onClickShowSaleinfo() {
      if (
        this.AdminSalesReportInputData.value.LocationID === '' ||
        this.AdminSalesReportInputData.value.LocationID === 'All Location'
      ) {
        this.AdminSalesReportInputData.value.LocationID = null;
      }
      //console.log(this.AdminSalesReportInputData.value.LocationID);
      
      this.fetchSalesInfo(
        this.AdminSalesReportInputData.value.DealerID,
        this.AdminSalesReportInputData.value.LocationID,
        this.PartDetail[0].partid,
        this.AdminSalesReportInputData.value.FormDate,
        this.AdminSalesReportInputData.value.ToDate
      ); 
  }
  fetchBrandAdminData() {
  this.isLoading = true;
    this.adminreportdata.getBrandData().subscribe((res: any) => {
      this.BrandData = res;
      this.isLoading = false;
    });
  }
  
  fetchDealerAdminData(brandid: any) {
    this.adminreportdata
      .getDealerData({ brandid: brandid })
      .subscribe((res: any) => {
        this.DealerData = res;
        this.DealerData.sort((a: any, b: any) => {
          return a.dealer.localeCompare(b.dealer);
        });
      });


  }

  fetchLocationAdminData(dealerid: any) {
    this.adminreportdata
      .getLocaitonData({ dealerid: dealerid })
      .subscribe((res: any) => {
        this.LocationData = res;
        this.LocationData.sort((a:any, b:any) => a.location.localeCompare(b.location));
      });
  }

  fetchPartDescription(brandid: any, partnumber: any) {
    this.showMessage = false
    this.isLoading = true;
    this.adminreportdata
      .getPartDescription({ Brandid: brandid, Partnumber: partnumber })
      .subscribe((res: any) => {
        this.PartDetail = res;
        this.isLoading = false;
        // console.log(this.PartDetail);
      });
  }

  fetchSalesInfo(
    Dealerid: any,
    Locationid: any,
    Partid: any,
    from: any,
    to: any
  ) {
    this.showMessage = false;
    this.isLoading = true;
    this.adminreportdata
      .getSalesInfo({
        Dealerid: Dealerid,
        Locationid: Locationid,
        Partid: Partid,
        from: from,
        to: to,
      })
      .subscribe((res: any) => {
        this.SalesInfo = res;
        // console.log("-----------------",this.SalesInfo)
       
         this.SalesInfo[0]= this.SalesInfo[0].map((data:any)=>{
          
            const location = this.LocationData.find((res: any) =>{
            return Number(res.locationid) === Number(data.LocationID)});
            // console.log("loxcsnj ",location)
            return {
              ...data, // Include original data if needed
              locationName: location ? location.location : 'Unknown' // Add location name
            };
                      // console.log("res-----",res)
            
        })
        this.SalesInfo[1]= this.SalesInfo[1].map((data:any)=>{
          
          const location = this.LocationData.find((res: any) =>{
          return Number(res.locationid) === Number(data.LocationID)});
          // console.log("loxcsnj ",location)
          return {
            ...data, // Include original data if needed
            locationName: location ? location.location : 'Unknown' 
          };
          
      })
        // console.log("location name ",this.SalesInfo);
        this.isLoading = false;
        // console.log(from);
      });
  }


  exportToExcel() {
    const flatData = [...this.SalesInfo[0], ...this.SalesInfo[1]];
    const reorderedData = flatData.map(item => ({
      LocationName: item.locationName,
      Month: item.Months,
      ClosingStocks: item.ClosingStocks,
      WorkshopSale: item.WorkshopSale, 
      Counter: item.Counter,
      StockTransferOut: item.StockTransferOut,
      AdjustmentOut: item.AdjustmentOut,
      PaidSale: item.PaidSale,
      WarrantySale: item.WarrantySale,
      FOCSales: item.FOCSales,
      GoodwillSale: item.GoodwillSale,
      NormalPurchase: item.NormalPurchase,
      StockTransferIn: item.StockTransferIn,
      JobcardReturnValue: item.JobcardReturnValue,
      CounterSaleReturn: item.CounterSaleReturn,
      EmergencyPurchase: item.EmergencyPurchase,
      VORPurchase: item.VORPurchase,
      CoDlrPurchase: item.CoDlrPurchase,
      StockAdjustmentIn: item.StockAdjustmentIn,
      OEMPurchase: item.OEMPurchase,
      idk: item.idk,
      Others: item.Others,
    }));
    // Convert JSON to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(reorderedData);
    const partDetailsWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.PartDetail);

    // Create a workbook
    const workbook: XLSX.WorkBook = {
      Sheets: { SalesInfo: worksheet,
        PartDetails: partDetailsWorksheet,
       },
      SheetNames: ['PartDetails','SalesInfo'],
    };
    // Write the workbook
    XLSX.writeFile(workbook, `SalesInfo.xlsx`);
  }

  getLastDateOfMonthForFrom() {

    const datestring = this.AdminSalesReportInputData.value.FormDate

    const date = new Date(datestring)
    const month = date.getMonth();
    const year = date.getFullYear();
    const lastDate = new Date(year, month+1, 0).getDate();
      
    this.AdminSalesReportInputData.value.FormDate = `${year}-${month+1}-${lastDate}`
     //console.log(this.AdminSalesReportInputData.value.FormDate);
     //console.log(this.AdminSalesReportInputData.value);
     
  }
  getLastDateOfMonthForTo() {
    const datestring = this.AdminSalesReportInputData.value.ToDate

    const letdate = new Date(datestring)
    const letmonth = letdate.getMonth();
    const letyear = letdate.getFullYear();
    const letlastDate = new Date(letyear, letmonth+1, 0).getDate();
      
    this.AdminSalesReportInputData.value.ToDate = `${letyear}-${letmonth+1}-${letlastDate}`
     //console.log(this.AdminSalesReportInputData.value.ToDate);


    // console.log(this.AdminSalesReportInputData.value);
  }
  changeInputType(event: FocusEvent, type: string) {
    const target = event.target as HTMLInputElement;
    target.type = type;
  }

  onclicktotal(){
    if(this.istotal===false){
      this.istotal = true
    }
    else{
      this.istotal = false
    }
  }

  refreshPage(): void {
    window.location.reload();
  }


}
