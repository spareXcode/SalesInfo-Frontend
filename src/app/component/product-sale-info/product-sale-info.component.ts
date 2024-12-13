import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-sale-info',
  imports: [TableModule,CommonModule],
  templateUrl: './product-sale-info.component.html',
  styleUrl: './product-sale-info.component.css'
})
export class ProductSaleInfoComponent {

  @Input() SalesInfo: any = []

}
