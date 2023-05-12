import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { RegisterForm } from '../../interfaces/register-form.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css' ]
})
export class RegisterComponent {

  constructor(private fb: FormBuilder,
              private usuario: UsuarioService,
              private router: Router ){}

public registerForm:FormGroup = this.fb.group({
  nombre:['', [Validators.required, Validators.minLength(3)]],
  apellidos:['', [Validators.required, Validators.minLength(3)]],
  email:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
  password:['', [Validators.required, Validators.minLength(6)]],
  password2:['', [Validators.required, Validators.minLength(6)]],
  terminos:[false , Validators.required],

}, {
  Validators: this.passwordsIguales('password', 'password2')

   })

public formSubmited = false


crearUsuario() {
  this.formSubmited = true;
  if(this.registerForm.invalid){
    console.log('formulario incorrecto');
    return
  }
 if(!this.registerForm.get('terminos')!.value) return;

  this.usuario.crearUsuario( this.registerForm.value )
   .subscribe({
    next: res =>{
        this.router.navigateByUrl('/')
        },
    error: error => {
      console.log(error.error.msg)
      Swal.fire({
        title: 'Registro duplicado',
        text: error.error.msg,
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Ir a Login',
        cancelButtonText: 'No, registrar otro'
      }).then((result) => {
        if (!result.isConfirmed) {
          return
        } else {
          this.router.navigate(['/auth/login'])
        }
      })
    }
   })
};

campoNoValido( campo:string ):boolean {
  return this.registerForm.get(campo)?.invalid && this.formSubmited ? true : false
}

aceptaTerminos():boolean{
  return this.formSubmited && !this.registerForm.get('terminos')?.value ? true : false
}

passwordsCoinciden():boolean {
  return this.registerForm.get('password')?.value !== this.registerForm.get('password2')?.value && this.formSubmited ? true : false
}
passwordsIguales(pass1: string, pass2: string){
  return ( formGroup: FormGroup ) => {
    const pass1Control = formGroup.get(pass1);
    const pass2Control = formGroup.get(pass2);
    if(pass1Control?.value === pass2Control?.value) {
      pass2Control?.setErrors(null)
    }else{
      pass2Control?.setErrors({noEsIgual: true})
    }
  }
};

}


