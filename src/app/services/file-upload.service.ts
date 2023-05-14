import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public usuario: Usuario;
  constructor( private usuarioService: UsuarioService) {
      this.usuario = usuarioService.usuario
   }


  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string
  ) {
    try {
      const url = `${ base_url }/uploads/${ tipo }/${ id }`
      const formData = new FormData();
      formData.append('img', archivo, archivo.name)



      const resp = await fetch(url,{
        method: 'PUT',
        headers:{
          "x-token": localStorage.getItem('token') || ''
        },
        body: formData
      });

        const data = await resp.json()
        if(data.ok){

          return data.nombreArchivo
        }else{
          return false
        }

    } catch (error) {
       console.log(error);
       return false;
    }
  }
}
