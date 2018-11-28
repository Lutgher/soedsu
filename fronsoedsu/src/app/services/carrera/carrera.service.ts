import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Carrera } from 'src/app/models/carrera';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(
    public http:HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCarrera(){
    let url=URL_SERVICIOS+'/carrera';
    url +='?token='+this._usuarioService.token;
    return this.http.get(url);
  }
  guardarCarrera(carrera: Carrera){
    let url=URL_SERVICIOS+'/carrera';
    url += '?token='+this._usuarioService.token;
    return this.http.post(url, carrera)
              .pipe(
                map((resp:any)=>{
                  swal('Registro Carrera Profesional',carrera.descripcion,'success');
                  return resp.carrera;
                })
              );
  }
}
