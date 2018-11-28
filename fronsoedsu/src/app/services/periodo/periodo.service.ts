import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Periodo } from '../../models/periodo.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(
    public http:HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPeriodos(){

    let url=URL_SERVICIOS+'/periodo';
    return this.http.get(url);
              // .pipe(
              //   map((resp: any)=>resp.periodo)
              // );
  }
  obtenerPeriodo(id: string){
    let url=URL_SERVICIOS+'/periodo/'+id;
    return this.http.get(url);
  }

  crearPeriodo(periodo: Periodo){
    let url=URL_SERVICIOS+'/periodo';
    url +='?token='+this._usuarioService.token;
    return this.http.post(url,periodo)
            .pipe(
              map((resp: any)=>{
                swal('Periodo Creado',periodo.nombre,'success');
                return resp.periodo;
              })
            );
  }

  actualizarPeriodo(periodo: Periodo){
    let url=URL_SERVICIOS+'/periodo/'+periodo._id;
    url +='?token='+this._usuarioService.token;
    return this.http.put(url, periodo)
            .pipe(
              map((resp:any)=>{
                swal('Periodo Actualziado',periodo.nombre,'success');
                return resp.periodo;
              })
            );
  }

  buscarPeriodo(termino: string){
    let url=URL_SERVICIOS+'/coleccion/periodo/'+termino;
    return this.http.get(url).pipe(map((resp: any)=>resp.periodo));
  }

  periodoNombre(nombre: string){
    let url=URL_SERVICIOS+'/periodo/nombre/'+nombre;
    return this.http.get(url);
  }
}
