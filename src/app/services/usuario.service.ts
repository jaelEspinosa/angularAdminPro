import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { LoginForm, RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router: Router,
               private ngzone: NgZone) { }


//TODO cuenta gmail en duro hay que revisar el logout

   logout(){

    localStorage.removeItem('token')

    google.accounts.id.revoke('jaelespinosa@gmail.com', ()=>{
      this.ngzone.run(() => {

        this.router.navigateByUrl('/auth/login')
      })
    })

  }


  validarToken (): Observable<boolean> {
      const token = localStorage.getItem('token') || ''

      return this.http.get(`${base_url}/login/renew`,{
        headers:{
          "x-token": token
        }
      })
      .pipe(
        tap( (resp: any ) => {
          localStorage.setItem('token', resp.token)
        }),
        map( resp => true),
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

      return this.http.post(`${base_url}/login/google`,  {token })
        .pipe(
          tap( (resp: any ) => {
            localStorage.setItem('token', resp.token)
          })
      )
    }

}
