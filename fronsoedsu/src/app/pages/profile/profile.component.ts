import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  constructor(
      public _usuarioService: UsuarioService
    ) 
    { 
      this.usuario=this._usuarioService.usuario;
    }

  ngOnInit() {
  }
  //recibe un usuario
  guardar(usuario: Usuario){
    
    this.usuario.nombre=usuario.nombre;
    this.usuario.email=usuario.email;
    this._usuarioService.actualizarUsuario(this.usuario)
        .subscribe();
  }

  seleccionImagen( archivo: File ){
    if(!archivo){
      return
    }
    //verificando si es una imagen
    if(archivo.type.indexOf('image')<0){
      swal('Solo Imagenes','El archivo seleccionado no es una imagen','error');
      this.imagenSubir=null;
      return;
    }
    

    this.imagenSubir=archivo;
    // console.log(archivo);

    //javascript vanilla
    let reader=new FileReader();
    let urlImagenTemp=reader.readAsDataURL( archivo );
    reader.onloadend=()=>this.imagenTemp=reader.result;
  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
