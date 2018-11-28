import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Escala } from '../../models/escala';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EscalaService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarEscalas(){
    let url=URL_SERVICIOS+'/escala';
    return this.http.get(url);
  }

  guardarEscalas(escala: Escala){
    let url=URL_SERVICIOS+'/escala';
    url +='?token='+this._usuarioService.token;
    return this.http.post(url, escala)
              .pipe(
                map((resp:any)=>{
                  swal('Registro de Escala',escala.descripcion,'success');
                  return resp.escala;
                })
              )

  }
  
}
