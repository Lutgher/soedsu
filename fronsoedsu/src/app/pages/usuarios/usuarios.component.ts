import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuario: Usuario[]=[];
  desde: number=0;
  totalRegistros: number=0;
  cargando: boolean=true;
  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
        .subscribe(resp=>{
          this.cargarUsuarios();
        });
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal(id);
  }

  cargarUsuarios(){ 
    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe((resp: any)=>{
          // console.log(resp);
          this.totalRegistros=resp.total;
          this.usuario=resp.usuario;
          this.cargando=false;
        });
  }

  cambiarDesde(valor: number){
    let desde=this.desde+valor;
    // console.log(desde);
    if(desde>=this.totalRegistros){
      return;
    }
    if(desde<0){
      return;
    }
    this.desde +=valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string){
    if(termino.length<=0){
      this.cargarUsuarios();
      return;
    }
    this.cargando=true;
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[])=>{
        this.usuario=usuarios;
        this.cargando=false;
      });
  }

  borrarUsuario( usuario: Usuario){
    if(usuario._id===this._usuarioService.usuario._id){
      swal('No puede eliminar usuario','No se puede borrar a si mismo','error');
      return;
    }
    swal({
      title: "¿Esta seguro?",
      text:"Esta a punto de eliminar a "+usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar)=>{
      if(borrar){ 
        this._usuarioService.borrarUsuario(usuario._id)
            .subscribe(borrado=>{
              console.log(borrado);
              this.cargarUsuarios();
            });
      }
    })// console.log(usuario);
  }
  guardarUsuario( usuario: Usuario ){
    swal({
      title: "¿Esta seguro?",
      text:"Esta a punto de modificar al "+usuario.nombre,
      icon: "success",
      buttons: true,
      dangerMode: true,
    })
    .then((actualizar)=>{
      if(actualizar){ 
        this._usuarioService.actualizarUsuario(usuario)
            .subscribe(()=>this.cargarUsuarios());
      }else{
        this.cargarUsuarios()
      }
    })
  }

  // guardarUsuario( usuario: Usuario ){
  //   this._usuarioService.actualizarUsuario(usuario).subscribe();
  // }
}
