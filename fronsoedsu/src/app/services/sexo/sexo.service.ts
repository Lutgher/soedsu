import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SexoService {

  constructor(
    public http: HttpClient
  ) { }

  cargarSexo(){
    let url=URL_SERVICIOS+'/sexo';
    return this.http.get(url);
  }
}
