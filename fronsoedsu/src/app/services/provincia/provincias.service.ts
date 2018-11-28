import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Provincia } from 'src/app/models/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  totalProv: number=0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarProvincia(desde: number=0){
    let url=URL_SERVICIOS+'/provincia?desde='+desde;
    return this.http.get(url);
              // .pipe(
              //   map((resp: any)=>{
              //     // console.log(resp.provincia);
              //     this.totalProv=resp.total;
              //     return resp.provincia;
              //   })
              // );
  }

  listaProvDepto(dpto: string){
    let url=URL_SERVICIOS+'/provincia/'+dpto;
    return this.http.get(url)
              .pipe(
                map((resp:any)=>{
                  return resp.provincia;
                })  
              );
  }

  // crearProvincia(provincia: Provincia){
  //   let url=URL_SERVICIOS+'/provincia';
  //   url+='?token='+this._usuarioService.token;
  //   return this.http.post(url, provincia)
  //             .pipe(
  //               map((resp: any)=>{
  //                 swal('Provincia registrado',provincia.descripcion,'success');
  //                 return resp.provincia;
  //               })
  //             );
  // }  

  eliminarProvincia(id: string){
    let url=URL_SERVICIOS+'/provincia/'+id;
    url +='?token='+this._usuarioService.token;
    return this.http.delete(url)
              .pipe(
                map((resp:any)=>{
                  swal('Eliminar Provincia','Se elimino correctamente','success');
                })
              );
  }

  guardarProvincia(provincia: Provincia){
    
    let url=URL_SERVICIOS+'/provincia';
    url+='?token='+this._usuarioService.token;
    return this.http.post(url, provincia)
              .pipe(
                map((resp:any)=>{
                  swal('Provincia Registrado', provincia.descripcion ,'successs');
                  return resp.provincia;
                })
              );
  }

  buscarProvincia(termino: string){
    let url=URL_SERVICIOS+'/coleccion/provincia/'+termino;
    return this.http.get(url).pipe(map((resp:any)=>resp.provincia));
  }

  obtenerProvincia(id: string){
    let url=URL_SERVICIOS+'/provincia/prov/'+id;
    return this.http.get(url).pipe(map((resp:any)=>resp.provincia));
  }
}
