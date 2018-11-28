import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { CarreraAsignatura } from '../../models/carrera-asignatura';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarreraAsignaturaService {
  
  constructor(
    public _usuarioService: UsuarioService,
    public http:HttpClient
  ) { }
  
  cargarCarrerasAsignaturas(){
    let url=URL_SERVICIOS+'/carreraAsignatura';
    return this.http.get(url);
  }

  guardarCarreraAsignatura(carreraAsignatura: CarreraAsignatura){
    let url=URL_SERVICIOS+'/carreraAsignatura';
    url +='?token='+this._usuarioService.token;
    return this.http.post(url, carreraAsignatura)
              .pipe(
                map((resp:any)=>{
                  swal(resp.mensaje, 'Se registro la asignatura a la carrera', 'success');
                  return resp.carreraAsignatura;
                })
              );
  }
  

}
