import {  AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent implements OnChanges{




@Input('labels') doughnutChartLabels: string[]= [ 'label-1','label-2','label-3' ]

@Input() title: string = 'Sin titulo'

@Input() data: number[] =  [300, 450, 100]

@Input() colors: string [] =  ['#6857E6', '#009FEE', '#F02059']

public  doughnutChartData: ChartData<'doughnut'> = {
  labels: this.doughnutChartLabels,
  datasets: [
    { data: this.data,
      backgroundColor: this.colors
     },

  ]
 };

 constructor(){}
 ngOnChanges(changes: SimpleChanges) {

  this.doughnutChartData = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.data,
        backgroundColor: this.colors
       },

    ]
   };

 }





 public doughnutChartType: ChartType = 'doughnut';




}
