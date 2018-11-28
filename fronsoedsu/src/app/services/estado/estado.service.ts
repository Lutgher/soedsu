import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Estado } from '../../models/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarEstado(){
    let url=URL_SERVICIOS+'/estado';
    return this.http.get(url);
              // .pipe(
              //   map((resp:any)=>{
              //     return resp.estado;
              //   })
              // );
  }

  guardarEstado(estado: Estado){
    let url=URL_SERVICIOS+'/estado';
    url +='?token='+this._usuarioService.token;
    return this.http.post(url, estado)
              .pipe(
                map((resp:any)=>{
                  swal('Estado Registrado',estado.descripcion,'success');
                  return resp.estado;
                })
              );
  }
}
