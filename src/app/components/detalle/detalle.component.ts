import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocal } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false
})
export class DetalleComponent  implements OnInit {

  @Input() id!: number;

  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];
  enFavoritos = false;
  

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController,
               private dataLocal: DataLocal,
               private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.moviesService.getPeliculaDetalle( this.id).subscribe( resp =>{
      console.log(resp);
      this.pelicula = resp;
      this.enFavoritos = this.dataLocal.peliculaEnFavoritos(resp);
    });

    this.moviesService.getActoresPelicula( this.id).subscribe( resp =>{
      console.log(resp);
      this.actores = resp.cast;
    });


  }

  async favorito(){
    this.dataLocal.guardarRemoverPelicula( this.pelicula);
    this.enFavoritos = !this.enFavoritos;

    const toast = await this.toastCtrl.create({
      message: this.enFavoritos
        ? 'Película agregada a favoritos ⭐'
        : 'Película eliminada de favoritos ❌',
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

}
