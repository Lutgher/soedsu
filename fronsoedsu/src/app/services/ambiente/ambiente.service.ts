import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Ambiente } from '../../models/ambiente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  constructor(
    public _usuarioService: UsuarioService,
    public http: HttpClient
  ) { }

  cargarAmbiente(){
    let url=URL_SERVICIOS+'/ambiente';
    return this.http.get(url);
  }

  guardarAmbiente(ambiente: Ambiente){
    let url=URL_SERVICIOS+'/ambiente';
    url +='?token='+this._usuarioService.token;
    console.log(ambiente);
    return this.http.post(url, ambiente)
            .pipe(
              map((resp:any)=>{
                swal('Ambiente Registrado',ambiente.descripcion,'success');
                return resp.ambiente;
              })
            )
  }
}
