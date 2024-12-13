import { Component, Input, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-desctiption-table',
  imports: [TableModule,CommonModule],
  templateUrl: './product-desctiption-table.component.html',
  styleUrl: './product-desctiption-table.component.css'
})
export class ProductDesctiptionTableComponent {

  @Input() PartDetails: any = []


  testfunction(){
    console.log(this.PartDetails)
  }
}
