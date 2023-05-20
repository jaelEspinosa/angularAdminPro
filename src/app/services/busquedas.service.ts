import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/register-form.interface';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})

export class BusquedasService {

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return{
       headers:{
        "x-token":this.token
       }
    }
  }

  private transformarUsuarios( resultados: any[]):Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.apellidos, user.email, '', user.role, user.google, user.img, user.uid)
    )
  }



  buscar( tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string ) {

    /* url http://localhost:3000/api/todo/coleccion/usuarios/e */

       return this.http.get(`${base_url}/todo/coleccion/${tipo}/${termino}`, this.headers)
          .pipe(
            map((resp: any) => {
              switch (tipo) {
                case 'usuarios':
                  return {
                        data: this.transformarUsuarios(resp.data),
                        totalUsuarios: resp.totalUsuarios
                      }

                default:
                  return {
                    data: [],
                    totalUsuarios: 0
                  }
              }

            })
          )




    }
}
