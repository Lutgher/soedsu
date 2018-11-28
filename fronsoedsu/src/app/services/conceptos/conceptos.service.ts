import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Concepto } from '../../models/conceptos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConceptosService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarConceptos(){
    let url=URL_SERVICIOS+'/concepto';
    return this.http.get(url);
  }

  guardarConceptos(concepto: Concepto){
    let url=URL_SERVICIOS+'/concepto';
    url +='?token='+this._usuarioService.token;
    return this.http.post(url, concepto)
              .pipe(
                map((resp:any)=>{
                  swal('Concepto Registrado',concepto.descripcion,'success');
                  return resp.concepto;
                })
              )
  }
}
