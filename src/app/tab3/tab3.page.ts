import { Component, OnInit} from '@angular/core';
import { PeliculaDetalle, Pelicula } from '../interfaces/interfaces';
import { DataLocal } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

interface GeneroConPeliculas {
  genero: { id: number; name: string };
  peliculas: PeliculaDetalle[];
}


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page{

  generosConPeliculas: {id:number, name: string; peliculas: PeliculaDetalle[]}[] = [];


  peliculasFavoritas: PeliculaDetalle[] = [];

  constructor(private dataLocal: DataLocal,
              private moviesService: MoviesService
  ) {}

  async ionViewWillEnter(){
    this.cargarFavoritos();
  }

  /*async ngOnInit() {
    this.peliculasFavoritas = await this.dataLocal.getPeliculasFavoritas();
    await this.moviesService.cargarGeneros();
  
    this.generosConPeliculas = this.moviesService.generos
      .map(g => {
        const peliculasDeGenero = this.peliculasFavoritas.filter(p =>
          p.genres?.some(pg => pg.id === g.id)
        );
        return { genero: g, peliculas: peliculasDeGenero };
      })
      .filter(gcp => gcp.peliculas.length > 0); // solo géneros con al menos una película
  }*/

      private async cargarFavoritos() {

        const peliculasFavoritas: PeliculaDetalle[] = this.dataLocal.peliculas;
    
        // Agrupas por géneros
        const generosMap: { [key: number]: { id: number, name: string, peliculas: PeliculaDetalle[] } } = {};
    
        peliculasFavoritas.forEach(pelicula => {
          pelicula.genres?.forEach(g => {
            if (!generosMap[g.id]) {
              generosMap[g.id] = { id: g.id, name: g.name, peliculas: [] };
            }
            generosMap[g.id].peliculas.push(pelicula);
          });
        });
    
        // Convertir a array
        this.generosConPeliculas = Object.values(generosMap);
      }

  

}
