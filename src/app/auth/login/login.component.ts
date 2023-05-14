import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

@ViewChild('googleBtn') googleBtn!: ElementRef;


public isSubmitedForm: boolean = false

constructor( private router: Router,
             private fb: FormBuilder,
             private usuarioService: UsuarioService,
             private ngZone: NgZone){}



ngAfterViewInit(){
    this.googleInit()
  }

googleInit() {

  google.accounts.id.initialize({
    client_id: "648900760499-cem8b53q2lqoi0l3kgsq83vvglsg7mcd.apps.googleusercontent.com",
    callback: (response: any) => this.handleCredentialResponse(response)
  });
  google.accounts.id.renderButton(
    this.googleBtn.nativeElement,
    { theme: "outline", size:"large" }  // customization attributes
  );

}

handleCredentialResponse(response: any){

   this.usuarioService.loginGoogle( response.credential )
     .subscribe(resp => {
       this.ngZone.run(() =>{

         //navegar al dashboard
         this.router.navigateByUrl('/')
       })

     })

}

public loginForm: FormGroup = this.fb.group({
  email:[localStorage.getItem('userEmail') || '', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
  password:['', Validators.required],
  remember:[false]
})

campoNoValido( campo: string) {
  return this.loginForm.get(campo)?.invalid && this.isSubmitedForm ? true : false

}

login(){
  this.isSubmitedForm = true

  if(this.loginForm.valid){
    this.usuarioService.login( this.loginForm.value )
     .subscribe({
      next: res =>{
        if( this.loginForm.get('remember')!.value){
          localStorage.setItem('userEmail', this.loginForm.get('email')!.value)
        }else{
          localStorage.removeItem('userEmail')
        }

         //navegar al dashboard
         this.router.navigateByUrl('/')
      },
      error: error => {
        Swal.fire({
          text: error.error.msg,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
     })
  }
  return


}
}
