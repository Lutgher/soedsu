import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Asignatura } from '../../models/asignatura';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarAsignatura(){
    let url=URL_SERVICIOS+'/asignatura';
    return this.http.get(url);
  }

  guardarAsignatura( asignatura: Asignatura){
    let url=URL_SERVICIOS+'/asignatura';
    url +='?token='+this._usuarioService.token;

    return this.http.post(url,asignatura)
              .pipe(
                map((resp:any)=>{
                  swal('Asignatura Registrada',asignatura.descripcion,'success');
                  return resp.asignatura;
                })
              );
  }
}
