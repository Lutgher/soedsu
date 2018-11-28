import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Departamento } from '../../models/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  totalDpto: number=0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService    
  ) { }

  cargarDepartamentos(){
    let url=URL_SERVICIOS+'/departamento';
    return this.http.get(url)
      .pipe(map((resp:any)=>{
        this.totalDpto=resp.total;
        return resp.departamentos
      }));
  }
  crearDepartamento(descripcion: string){
    let url=URL_SERVICIOS+'/departamento';
    url +='?token='+this._usuarioService.token;
    return this.http.post(url, {descripcion: descripcion})
              .pipe(map((resp:any)=>{
                // swal('Departamento Creado',departamento.descripcion,'success');
                return resp.departamentos;
              }))
  }
  actualizarDepartamento(departamento: Departamento){
    let url=URL_SERVICIOS+'/departamento/'+departamento._id;
    url +='?token='+this._usuarioService.token;
    return this.http.put(url, departamento)
              .pipe(
                map((resp: any)=>{
                  swal('Departamento Actualziado',departamento.descripcion,'success');
                  return resp.departamento;
                })
              );
  }
  buscarDepartamento(termino: string){
    let url=URL_SERVICIOS+'/coleccion/departamento/'+termino;
    return this.http.get(url).pipe(map((resp:any)=>resp.departamento))
  }
  
  eliminarDepartamento(id: string){
    let url=URL_SERVICIOS+'/departamento/'+id;
    url +='?token='+this._usuarioService.token;
    return this.http.delete(url)
              .pipe(
                map((resp:any)=>{
                  swal('Departamento Eliminado','Se elimino correctamente','success');
                })
              );
  }
}
