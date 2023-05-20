import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu: any[] = [

    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main',url: 'dashboard' },
        { title: 'Progress bar',url: 'progress' },
        { title: 'Gráficas',url: 'grafica1' },
        { title: 'Promesas',url: 'promesas' },
        { title: 'RXJS',url: 'rxjs' }

      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios',url: 'usuarios' },
        { title: 'Hospitales',url: 'hospitales' },
        { title: 'Médicos',url: 'medicos' },


      ]
    }

  ]

  constructor() { }
}
