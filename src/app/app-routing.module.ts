import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutinModule } from './auth/auth-routing.module';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';



const routes: Routes =[

    {path:'', redirectTo:'/dashboard', pathMatch:'full'},
    {path:'**', component: NopagefoundComponent},

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutinModule
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
