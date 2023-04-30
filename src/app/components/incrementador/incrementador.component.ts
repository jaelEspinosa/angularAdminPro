import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  ngOnInit(){
    this.btnClass = `btn ${this.btnClass}`
  }

 @Input() btnClass: string = 'btn-primary'

 @Input() progress: number = 0

 @Output() valorSalida: EventEmitter<number> = new EventEmitter();



changeValue( value: number ){

    this.progress += value

    if( this.progress >= 100 && value > 0){
             this.valorSalida.emit(100)
             this.progress = 100
             return
          }
    if( this.progress <= 0 && value < 0){
             this.valorSalida.emit(0)
             this.progress = 0
             return
          }
    this.valorSalida.emit(this.progress)
  };

  onChange(event: number){
    this.changeValue(event);

  }
}
