import { Component } from '@angular/core';

import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

 // Doughnut
 public doughnutChartLabels: string[] = [ 'Download Sales','Ventas a','ventas b' ];
 public doughnutChartData: ChartData<'doughnut'> = {
   labels: this.doughnutChartLabels,
   datasets: [
     { data: [ 350, 450, 100 ],
       backgroundColor: ['#6857E6', '#009FEE', '#F02059']
      },

   ]
 };




}
