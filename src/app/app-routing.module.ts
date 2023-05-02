import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { NopagefoundComponent } from './nopagefound/nopagefound.component';



const routes: Routes =[

  {path:'main',
       loadChildren: ()=> import('./pages/pages.module').then(m => m.PagesModule)
  },
  {path:'auth',
       loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'', redirectTo:'main', pathMatch:'full'
  },
  {
    path:'**', component: NopagefoundComponent
  }

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),

  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
