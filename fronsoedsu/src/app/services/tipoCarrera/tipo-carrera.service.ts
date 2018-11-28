import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoCarreraService {

  constructor(
    public _us: UsuarioService,
    public http: HttpClient
  ) { }

  cargarTipoCarrera():Observable<any>{
    let url=URL_SERVICIOS+'/tipoCarrera';
    return this.http.get(url);
  }
   registrarTipoCarrera(nombre: string){
    let url=URL_SERVICIOS+'/tipoCarrera';
    url +='?token='+this._us.token;
    return this.http.post(url,{nombre: nombre})
            .pipe(
              map((resp: any)=>resp.tipoCarrera)
            );
   }
}
