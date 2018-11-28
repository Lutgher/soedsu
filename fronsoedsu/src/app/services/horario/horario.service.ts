import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Horario } from '../../models/horario';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HorarioService {


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }
  
  cargarHorario(){
    let url=URL_SERVICIOS+'/horario';
    return this.http.get(url);
  }
  
  guardarHorario(horario: Horario){
    let url=URL_SERVICIOS+'/horario';
    url += '?token='+this._usuarioService.token;
    return this.http.post(url,horario)
              .pipe(
                map((resp:any)=>{
                  swal('Registro Horario',horario.descripcion,'success');
                  return resp.horario;
                })
              )
  }

}
