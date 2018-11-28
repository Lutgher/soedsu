import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { PlanEstudio } from '../../models/planEstudio';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanEstudiosService {

  constructor(
    public _usuarioService: UsuarioService,
    public http: HttpClient
  ) { }

  cargarPlan(){
    let url=URL_SERVICIOS+'/planEstudio';
    return this.http.get(url);
  }

  guardarPlan(planEstudio: PlanEstudio){
    let url=URL_SERVICIOS+'/planEstudio';
    url +='?token='+this._usuarioService.token;
    return this.http.post(url, planEstudio)
              .pipe(
                map((resp:any)=>{
                  swal('Registro de plan de estudio',planEstudio.descripcion,'success');
                  return resp.planEstudio;
                })
              );
  }
  
}