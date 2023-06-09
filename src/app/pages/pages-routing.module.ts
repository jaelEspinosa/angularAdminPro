import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimiento

import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';


const routes: Routes = [
  {path:'', component: PagesComponent ,
  canActivate:[AuthGuard],
  children: [
    {path:'dashboard', component: DashboardComponent, data:{titulo:"Dashboard"} },
    {path:'perfil', component: PerfilComponent, data:{titulo:"My profile"} },
    {path:'progress', component: ProgressComponent, data:{titulo:"Progress"}  },
    {path:'grafica1', component: Grafica1Component, data:{titulo:"Grafica #1"}  },
    {path:'account-settings', component: AccountSettingsComponent, data:{titulo:"Theme Settings"}  },
    {path:'promesas', component: PromesasComponent, data:{titulo:"Promesas"}  },
    {path:'rxjs', component: RxjsComponent, data:{titulo:"RXJS"}  },

    // Mantenimiento

    {path:'usuarios', component: UsuariosComponent, data:{titulo: 'Usuarios'}},
    {path:'hospitales', component: HospitalesComponent, data:{titulo: 'Hospitales'}},
    {path:'medicos', component: MedicosComponent, data:{titulo: 'Médicos'}},

    // Por defecto
    {path:'**', redirectTo:'dashboard' },
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
