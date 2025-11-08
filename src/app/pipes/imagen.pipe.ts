import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen',
  standalone: false
})
export class ImagenPipe implements PipeTransform {


  transform(img: string, size: string = 'w500'): string {

    if (!img) {
      return './assets/no-image-banner.jpg'; // retornar cadena vacía si no hay imagen
    }

    const imgUrl = `${URL}/${size}${img}`; // template literal con backticks

    return imgUrl;
  }

}
