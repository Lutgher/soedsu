import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { TipoEstudiante } from '../../models/tipoEstudiante';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoEstudianteService {

  constructor(
    public http: HttpClient,
    public _usuarioService:UsuarioService
  ) { }

  cargarTipoEstudiante(){
    let url=URL_SERVICIOS+'/tipoEstudiante';
    return this.http.get(url);
  }
  guardarTipoEstudiante(tipoEstudiante: TipoEstudiante){
    let url=URL_SERVICIOS+'/tipoEstudiante';
    url +='?token='+this._usuarioService.token;
    return this.http.post(url, tipoEstudiante)
              .pipe(
                map((resp:any)=>{
                  swal('Registro de estado de estudiante',tipoEstudiante.descripcion,'success');
                  return resp.tipoEstudiante;
                })
              );
  }
}
