import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Sede } from '../../models/sede';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SedesService {

  constructor(
    public http: HttpClient,
    public _usuarioServices: UsuarioService
    
  ) { }

  cargarSedes(){
    let url=URL_SERVICIOS+'/sede';
    return this.http.get(url);
  }
  guardarSede(sede: Sede){
    let url=URL_SERVICIOS+'/sede';
    url +='?token='+this._usuarioServices.token;
    return this.http.post(url, sede)
              .pipe(
                map((resp:any)=>{
                  swal('Sede registrado',sede.descripcion,'success');
                  return resp.sede;
                })
              );
  }
}
