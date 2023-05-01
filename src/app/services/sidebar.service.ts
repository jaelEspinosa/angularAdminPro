import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu: any[] = [

    {
      title: 'Dashboard!!!',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main',url: 'app' },
        { title: 'Progress bar',url: 'progress' },
        { title: 'Gráficas',url: 'grafica1' }

      ]
    }

  ]

  constructor() { }
}
