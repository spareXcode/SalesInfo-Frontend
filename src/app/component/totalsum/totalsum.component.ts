import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-totalsum',
  imports: [TableModule,CommonModule],
  templateUrl: './totalsum.component.html',
  styleUrl: './totalsum.component.css'
})
export class TotalsumComponent {
    @Input() SalesInfo: any = []
  

}
