import  Swal  from 'sweetalert2';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit{

public perfilForm!: FormGroup
public usuario!: Usuario;
public imgTemp: any = '';

@ViewChild('inputFile') inputFile!: ElementRef

public imgUpload!: File

   constructor(private fb:FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) {
                this.usuario = this.usuarioService.usuario
        }


   ngOnInit(){
    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      apellidos:[this.usuario.apellidos, Validators.required],
      email:[this.usuario.email, [Validators.required, Validators.email]]
    });


   };

   actualizarPerfil(){
    this.usuarioService.actualizarPerfil( this.perfilForm.value)
     .subscribe({
      next: resp =>{
        const {nombre, apellidos, email} = this.perfilForm.value;
        this.usuario.nombre= nombre;
        this.usuario.apellidos=apellidos;
        this.usuario.email= email;
        Swal.fire('Guardado', 'Cambios guardados con éxito', 'success')
      },
      error: err =>{
        console.log(err)
        Swal.fire('Error', err.error.msg, 'error')
      }
     })
   };

   cambiarImagen( file: File){
       this.imgUpload = file
       if (!file){
         this.imgTemp = ''
         return
        }
    const reader = new FileReader();
    reader.readAsDataURL( file )

    reader.onloadend = () =>{
      this.imgTemp = reader.result;

    }
   }

   imageUpload(){
    this.fileUploadService
       .actualizarFoto(this.imgUpload, 'usuarios', this.usuario.uid!)
       .then(img =>{
        this.usuario.img = img
        Swal.fire('Guardado', 'Imagen actualizada con éxito', 'success')
      })
   };

   activarInput(){
       const inputFileElement = this.inputFile.nativeElement as HTMLInputElement;
       inputFileElement.click()
   }

  }


