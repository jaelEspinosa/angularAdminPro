import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public usuario!: Usuario;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id: string = '';
  public img: string = '';

  private _ocultarModal: boolean = true;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>

  get ocultarModal() {
    return this._ocultarModal
  }


  abrirModal(tipo: 'usuarios'|'medicos'|'hospitales', id: string, img: string = 'no-img'){

    this._ocultarModal = false
    this.tipo = tipo;
    this.id = id;
    this.img = img;

    /* http://localhost:3000/api/uploads/usuarios/501509e3-5bbd-449d-aa25-613c3c101c62.jpg */

    if ( img.includes('https') ){
      this.img = img
    }else{
      this.img = `${ base_url }/uploads/${ tipo }/${ img }`
    }
  }

  cerrarModal(){
    this._ocultarModal = true
  }


  constructor() { }
}
