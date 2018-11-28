import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Estudiante } from '../../models/estudiante';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(
    public http:HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarEstudiantes(){
    let url=URL_SERVICIOS+'/estudiante';
    return this.http.get(url);
  }

  estudianteCodigo(nroDocumento: string){
    let url=URL_SERVICIOS+'/estudiante/'+nroDocumento;
    return this.http.get(url);
  }

  buscarEstudiante(id: string){
    let url=URL_SERVICIOS+'/estudiante/stud/'+id;
    return this.http.get(url);
              // .pipe(map((resp:any)=>resp.estudiante));
  }

  buscaEstudiantePeriodo(periodo: string, dni: string){
    let url=URL_SERVICIOS+'/estudiante/periodo/'+periodo+'/'+dni;
    return this.http.get(url);
  }

  guardarEstudiante(estudiante: Estudiante){
    let url=URL_SERVICIOS+'/estudiante';
    console.log(estudiante._id);
    console.log(estudiante.persona);
    if(estudiante._id != estudiante.persona){
      url+='/'+estudiante._id+'?token='+this._usuarioService.token;
      return this.http.put(url, estudiante)
                .pipe(
                  map((resp: any)=>{
                    swal(resp.mensaje, resp.estudiante.nombre,'success');
                    return resp.estudiante;
                  })
                );
    }else{
      url +='?token='+this._usuarioService.token;
      return this.http.post(url, estudiante)
                .pipe(
                  map((resp:any)=>{                    
                    swal(resp.mensaje,resp.estudiante.nombre,'success');
                    return resp.estudiante;
                  })
                );
    }

  }
}