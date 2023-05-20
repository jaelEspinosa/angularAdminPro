import { Usuario } from "../models/usuario.model";



export interface RegisterForm {
  nombre: string,
  email: string,
  password: string,
  password2: string,
  terminos: boolean,
}

export interface LoginForm {
  nombre: string,
  email: string,
  remember:boolean,
}

export interface CargarUsuario {

  totalUsuarios: number;
  usuarios: Usuario[]
}
