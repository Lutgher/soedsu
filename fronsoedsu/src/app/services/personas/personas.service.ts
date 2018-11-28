import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Persona } from '../../models/persona';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPersonas(){
    let url=URL_SERVICIOS+'/persona';
    return this.http.get(url);
  }

  guardarPersona(persona: Persona){
    let url=URL_SERVICIOS+'/persona';
    url +='?token='+this._usuarioService.token;
    return this.http.post(url, persona)
              .pipe(
                map((resp: any)=>{
                  swal('Estudiante Registrado', persona.apellidoPaterno+' '+persona.apellidoMaterno+' '+persona.nombre ,'success');
                  return resp.persona;
                })
              )
  }

  buscarPersona(termino: string){
    let url=URL_SERVICIOS+'/coleccion/persona/'+termino;
    return this.http.get(url)
              .pipe(
                map((resp:any)=>resp.persona)
              );
  }

  buscarPersonaDni(dni: string){
    let url=URL_SERVICIOS+'/persona/dni/'+dni;
    return this.http.get(url);
              // .pipe(
              //   map((resp:any)=>{
              //     return resp.persona
              //   })
              // );
  }

  

}
