import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { TipoAsignatura } from '../../models/tipoAsignatura';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TipoAsignaturaService {


  constructor(
    public http: HttpClient,
    public _usuarioService:UsuarioService
  ) { }
  
  cargarTipoAsignatura(){
    let url=URL_SERVICIOS+'/tipoAsignatura';
    return this.http.get(url);
  }

  guardarTipoAsignatura(tipoAsignatura: TipoAsignatura){
    let url=URL_SERVICIOS+'/tipoAsignatura';
    url += '?token='+this._usuarioService.token;
    return this.http.post(url, tipoAsignatura)
              .pipe(
                map((resp:any)=>{
                  swal('Tipo Asignatura Registro',tipoAsignatura.descripcion,'success');
                  return resp.TipoAsignatura;
                })
              );
  }
  
}
