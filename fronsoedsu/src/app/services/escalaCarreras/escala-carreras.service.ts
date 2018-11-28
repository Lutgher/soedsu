import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { EscalaCarrera } from '../../models/escalaCarrera';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EscalaCarrerasService {

  constructor(
    public http:HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarEscalaCarrera(){
    let url=URL_SERVICIOS+'/escalaCarrera';
    return this.http.get(url);
  }
  guardarEscalaCarrera(escalaCarrera: EscalaCarrera){
    let url=URL_SERVICIOS+'/escalaCarrera';
    url +='?token='+this._usuarioService.token;
    console.log(url);
    return this.http.post(url, escalaCarrera)
              .pipe(
                map((resp: any)=>{
                  swal('Registro de Escala Carrera','Se registro correctamente','success');
                  return resp.escalaCarrera;
                })
              );
  }
}
