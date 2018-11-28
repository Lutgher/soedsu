import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Distrito } from '../../models/distrito';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  totalDist: number=0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }
  
  cargarDistritos(desde: number=0){
    let url=URL_SERVICIOS+'/distrito?desde='+desde;
    return this.http.get(url);
              // .pipe(
              //   map((resp: any)=>{
              //     this.totalDist=resp.total;
              //     return resp.distrito;
              //   })
              // );
  }

  listaDistProv(prov: string){
    let url=URL_SERVICIOS+'/distrito/'+prov;
    return this.http.get(url)
              .pipe(
                map((resp:any)=>{
                  return resp.distrito;
                })
              );
  }
  // crearDistrito(distrito: Distrito){
  //   let url=URL_SERVICIOS+'/distrito';
  //   url+='?token='+this._usuarioService.token;
  //   return this.http.post(url, distrito)
  //             .pipe(
  //               map((resp:any)=>{
  //                 swal('Distrito Registrado',distrito.descripcion,'success');
  //                 return resp.distrito;
  //               })
  //             );
  // }

  // guardarDistrito(distrito: Distrito){
  //   let url=URL_SERVICIOS+'/distrito/'+distrito._id;
  //   url +='?token='+this._usuarioService.token;
  //   return this.http.post(url, distrito)
  //             .pipe(
  //               map((resp:any)=>{
  //                 swal('Distrito Actualizado',distrito.descripcion,'success');
  //                 return resp.distrito;
  //               })
  //             );
  // }

  guardarDistrito(distrito: Distrito){
    let url=URL_SERVICIOS+'/distrito';
    url+='?token='+this._usuarioService.token;
    return this.http.post(url, distrito)
              .pipe(
                map((resp:any)=>{
                  swal('Distrito Registrado',distrito.descripcion,'success');
                  return resp.distrito;
                })
              );
  }

  obtenerDistrito( id: string ){
    let url=URL_SERVICIOS+'/distrito/dist/'+id;
    return this.http.get(url).pipe(map((resp:any)=>resp.distrito));
  }

  eliminarDistrito(id: string){
    let url=URL_SERVICIOS+'/distrito/'+id;
    url +='?token='+this._usuarioService.token;
    return this.http.delete(url)
              .pipe(
                map((resp:any)=>{
                  swal('Eliminar Distrito','Se elimino correctamente','success');
                })
              )
  }

}
