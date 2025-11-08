import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController
  ) {}

  textoBuscar: String = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: String[] = ['Spiderman','Avenger','The Lord of the Rings','La vida es bella'];

  buscar( event: CustomEvent){
    const valor: String = event.detail.value;

    if( valor.length === 0){
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    this.moviesService.buscarPeliculas( valor)
    .subscribe(resp =>{
      console.log(resp);
      this.peliculas = resp['results'];
      this.buscando = false;
    });
  }

    async detalle( id: number){
  
      const modal = await this.modalCtrl.create({
        component: DetalleComponent,
        componentProps: {
          id
        }
      });
  
      modal.present();
  
    }

}
