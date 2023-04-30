import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {

 @Input() doughnutChartLabels: string[] = [];


 @Input() doughnutChartData!: ChartData<'doughnut'>

 public doughnutChartType: ChartType = 'doughnut';




}
