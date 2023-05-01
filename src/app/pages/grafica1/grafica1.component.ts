import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

 // Doughnut
  data1: string[] = [ 'Download Sales','Compras a','Compras b' ];
  data2: string[] = [ 'Download shoping','Ventas a','Ventas b' ];
  data3: string[] = [ 'upLoad press','Altas a','Altas b' ];

  inData1: number[] = [400, 380, 160]
  inData2: number[] = [350, 450, 100]
  inData3: number[] = [333, 333, 333]

  colors3 :string[]=['green','pink','violet']
  colors2 :string[]=['red','gray','blue']

}
