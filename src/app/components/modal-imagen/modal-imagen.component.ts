import { Component, ElementRef, ViewChild } from '@angular/core';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {


  public imgTemp: any = '';
  public imgUpload!: File

  @ViewChild('inputFile') inputFile!: ElementRef

constructor( public modalImagenService: ModalImagenService,
             private fileUploadService: FileUploadService,
             private usuarioService: UsuarioService){

             }


cerrarModal () {
  this.imgTemp = null;
  this.modalImagenService.cerrarModal()
}

activarInput(){
  const inputFileElement = this.inputFile.nativeElement as HTMLInputElement;
  inputFileElement.click()
}



cambiarImagen( file: File){

  this.imgUpload = file
  if (!file){
    this.imgTemp = null;
    return
   }
const reader = new FileReader();
reader.readAsDataURL( file )

reader.onloadend = () =>{
 this.imgTemp = reader.result;

}
}

imageUpload(){
  const id = this.modalImagenService.id;
  const tipo = this.modalImagenService.tipo

  this.fileUploadService
     .actualizarFoto(this.imgUpload, tipo, id)
     .then(img =>{
      this.modalImagenService.nuevaImagen.emit(img)
      this.cerrarModal()
      Swal.fire('Guardado', 'Imagen actualizada con éxito', 'success')
    }).catch (err =>{
      console.log(err);
      Swal.fire('Error','No se pudo subir la imagen','error')
    })
 };

}
