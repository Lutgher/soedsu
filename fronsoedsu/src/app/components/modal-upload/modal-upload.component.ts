import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  // oculto:string='';
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { 
    // console.log('modal listo');
  }

  ngOnInit() {
  }
  
  cerrarModal(){
    this.imagenTemp=null;
    this.imagenSubir=null;
    this._modalUploadService.ocultarModal();
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

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.id)
        .then(resp=>{
          
          this._modalUploadService.notificacion.emit(resp);
          // this._modalUploadService.ocultarModal();
          this.cerrarModal();
        })
        .catch(err=>{
          console.log('Error en la carga');
        });
  }
}
