import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor (){

  this.intervalSubs = this.returnInterval()
    .subscribe( console.log )

    /* this.returnObservable().pipe(
       retry(1)
    )
    .subscribe({
     next: valor=> console.log('subs: ', valor),
     error: error => console.warn('Error: ', error),
     complete: ()=> console.info('obs terminado')
     }) */
  }
  ngOnDestroy() {
    this.intervalSubs.unsubscribe()
  }


returnInterval():Observable<number>{
  return interval( 150)
  .pipe( //take (10),
         map(valor => (valor+1)),
         filter( valor => (valor % 2) === 0 ),
  )


}


returnObservable(): Observable<number> {
   let i = - 1

    return new Observable<number>( observer =>{

     const intervalo = setInterval( ()=>{
       i++
       observer.next(i)

       if (i === 4){
        clearInterval( intervalo );
        observer.complete();
       }
       if (i === 2){

        observer.error('Hemos llegado al valor 2..')
       }

      }, 1000)

    });

}

}
