import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'): any {
    let url=URL_SERVICIOS+'/img';

    if(!img){
      return url+'/usuarios/xxx';
    }
    //imagen de google
    if( img.indexOf('https') >= 0){
      return img;
    }
    return url+='/usuarios/'+img;
    // return 'Funciona';
  }

}
