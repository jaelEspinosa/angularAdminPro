import { Component, ElementRef, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {


  @ViewChild ('txtTermino') txtTermino!: ElementRef;

public usuarios: Usuario[] = []
public usuariosTemp: Usuario[] = []
public totalUsuarios: number = 0;
public totalUsuariosTemp: number = 0;
public paginaActual : number = 1;
public paginaActualTemp : number = 1;
public desde: number= 0;
public isLoading: boolean = false;
public desactivarBtn: boolean = false;
public imgSub!: Subscription;

public searchTerm = new Subject<string>();


  constructor(private busquedasService: BusquedasService,
              private usuarioService: UsuarioService,
              private router:Router,
              private modalImagenService: ModalImagenService
              ){
                this.searchTerm.pipe(debounceTime(1500)).subscribe(term => {
                  this.isLoading = true
                  this.buscar(term);
                });
              };


  ngOnDestroy(){
   this.imgSub.unsubscribe()
  }



ngOnInit(){
   this.cargarUsuarios()

   this.imgSub = this.modalImagenService.nuevaImagen
   .pipe(
      delay(100)
   )
   .subscribe({
    next:  img => {
      this.cargarUsuarios()
    },
    error: err =>{
      console.log(err);
      this.router.navigateByUrl('auth/login')

    }
   }

   )
  };

cargarUsuarios() {
  this.isLoading = true
  this.usuarioService.cargarUsuarios(this.desde)
  .subscribe({
    next: ({usuarios, totalUsuarios}) =>{
      this.totalUsuarios = totalUsuarios;
      this.totalUsuariosTemp = totalUsuarios;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.isLoading = false
    },
    error: err =>{
      if (!err.ok){
        this.router.navigateByUrl('/auth/login')
      }
    }
  })
};


paginarUsuarios( valor: number, pagina: number ) {
   this.desactivarBtn = false
   this.desde += valor;
   this.paginaActual += pagina
   if(this.desde < 0 ) {
    this.desde = 0
    this.paginaActual = 1
   }else if( this.desde >= this.totalUsuarios) {
    this.desde -= valor
    this.paginaActual -= pagina
   }
   if (this.desde >= (this.totalUsuarios-5)){
    this.desactivarBtn = true;
   }
  this.cargarUsuarios()
};


buscar ( termino: string ) {

  if(termino.length===0){
    this.usuarios = this.usuariosTemp;
    this.totalUsuarios = this.totalUsuariosTemp
    this.isLoading = false
    return;
  };

  this.busquedasService.buscar( 'usuarios', termino )
   .subscribe({
    next: resp => {
      this.usuarios = resp.data
      this.totalUsuarios = resp.totalUsuarios
      this.isLoading = false
    }

   })
};

eliminarUsuario ( usuario: Usuario) {
   if (usuario.uid === this.usuarioService.usuario.uid) {
     Swal.fire('Error','No puedes borrar tu propio registro','error')
     return
   }
  Swal.fire({
    title: 'Estas seguro?',
    text: `Estas a punto de eliminar a ${usuario.nombre}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si Borrar!',
    cancelButtonText:'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.usuarioService.eliminarUsuario(usuario)
       .subscribe({
        next: resp =>{
          Swal.fire(`${usuario.nombre}, Eliminado`,'','success')
          this.cargarUsuarios()
          this.txtTermino.nativeElement.value = '';

        }
       })
    }

  })
};

cambiarRole(usuario: Usuario){
  this.usuarioService.guardarUsuario( usuario )
    .subscribe({
      next: resp =>{
       console.log( resp );

      }
    })

};

abrirModal(usuario: Usuario){
  this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img )
};

}
