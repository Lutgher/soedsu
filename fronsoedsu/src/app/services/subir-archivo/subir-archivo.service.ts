import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, id: string){

    return new Promise((resolve, reject)=>{
      let formData=new FormData();
      let xhr=new XMLHttpRequest();//ajax

      formData.append('imagen',archivo, archivo.name);
      //configurar ajax
      xhr.onreadystatechange=function(){
        if(xhr.readyState === 4){
          if(xhr.status===200){
            // console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          }else{
            // console.log('Fallo al subida');
            reject(xhr.response);
          }
        }
      };  

      let url=URL_SERVICIOS+'/usuarios/'+id;

      xhr.open('PUT',url, true);
      xhr.send( formData );
    })

    

  }
}
