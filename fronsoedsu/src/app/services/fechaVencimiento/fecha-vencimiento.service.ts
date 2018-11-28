import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs';
import { FechaVencimiento } from '../../models/fechaVencimiento';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FechaVencimientoService {

  constructor(
    private http:HttpClient,
    private _us: UsuarioService
  ) { }

  cargarFechaVencimiento(): Observable<any>{
    let url=URL_SERVICIOS+'/fechaVencimiento';
    return this.http.get(url);
  }

  guardarFechaVencimiento(fechaVenc: FechaVencimiento){
    let url=URL_SERVICIOS+'/fechaVencimiento';
    url +='?token='+this._us.token;
    return this.http.post(url, fechaVenc)
            .pipe(
              map((resp:any)=>{
                swal('Se registro Correctamente','Se genero la fecha','success');
                return resp.fechaVencPen;
              })
            )
  }
}
