import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { CtaCorriente } from '../../models/ctaCorriente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CtaCorrienteService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCtaCorriente(){
    let url=URL_SERVICIOS+'/ctaCorriente';
    return this.http.get(url);
  }

  guardarCtaCorriente(ctaCorriente: CtaCorriente){
    let url=URL_SERVICIOS+'/ctaCorriente';
    url +='?token='+this._usuarioService.token;
    return this.http.post(url, ctaCorriente)
              .pipe(
                map((resp:any)=>{
                  swal(resp.mensaje, 'Se regirso correctamente','success');
                  return resp;
                })
              );
  }

}
