import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { CargarUsuario, LoginForm, RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google: any

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router: Router,
               private ngzone: NgZone) { }

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
//TODO cuenta gmail en duro hay que revisar el logout


public usuario!: Usuario;

   logout(){

    localStorage.removeItem('token')
    if(this.usuario.google){

      google.accounts.id.revoke(this.usuario.email, ()=>{
        this.ngzone.run(() => {

          this.router.navigateByUrl('/auth/login')
        })
      })
    }

    this.router.navigateByUrl('/auth/login')
  }


  validarToken (): Observable<boolean> {

      return this.http.get(`${base_url}/login/renew`,{
        headers:{
          "x-token": this.token
        }
      })
      .pipe(
        map( (resp: any ) => {
          const { nombre, apellidos, email, role, google, img, uid} = resp.usuario
          this.usuario = new Usuario( nombre, apellidos, email, '', role, google, img, uid)
          localStorage.setItem('token', resp.token)
          return true
        }),

        catchError(err => of(false))
      )
  }


  crearUsuario ( formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap( (resp: any ) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  login ( loginFormData: LoginForm) {

    return this.http.post(`${base_url}/login`, loginFormData)
      .pipe(
        tap( (resp: any ) => {
          localStorage.setItem('token', resp.token)
        })
      )
   }


  loginGoogle( token: string ) {

      return this.http.post(`${base_url}/login/google`,  { token })
        .pipe(
          tap( (resp: any ) => {
            localStorage.setItem('token', resp.token)
          })
      )
    }

 actualizarPerfil(data:{nombre: string, apellidos: string, email: string, role: string | undefined} ){

       data={
        ...data,
        role: this.usuario.role
       }
       return this.http.put(`${base_url}/usuarios/${this.usuario.uid}`, data, {
          headers:{
            "x-token": this.token
          }
        })
   };



cargarUsuarios (desde: number = 0 , limit: number = 5):Observable<CargarUsuario> {

  /* url: http://localhost:3000/api/usuarios?desde=5&limit=3 */

  return this.http.get<CargarUsuario>(`${ base_url }/usuarios?desde=${ desde }&limit=${ limit }`, this.headers)
   .pipe(
    map( resp =>{
      const usuarios = resp.usuarios.map(
        user => new Usuario(user.nombre, user.apellidos, user.email, '', user.role, user.google, user.img, user.uid)
      );

      return {
        totalUsuarios: resp.totalUsuarios,
        usuarios
      };
    })
   )
};

eliminarUsuario (usuario: Usuario) {
  /* url : http://localhost:3000/api/usuarios/6453b90c41546358a286e257 */
  const url =`${base_url}/usuarios/${usuario.uid}`

  return this.http.delete(url, this.headers)

}

guardarUsuario( usuario: Usuario){


  return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers)
};


}
