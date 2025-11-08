import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular'
import { PeliculaDetalle } from '../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLocal {
  private _storage: Storage | null = null;
  private _localPeliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage){
    this.init();
  }

  get peliculas() {
    return [ ...this._localPeliculas ]; // Devuelve una copia
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadPeliculas();
  }

  async guardarRemoverPelicula(pelicula: PeliculaDetalle) {

    const existe = this._localPeliculas.find(localPeli => localPeli.id === pelicula.id);

    if (existe) {
      // Eliminar si ya existe
      this._localPeliculas = this._localPeliculas.filter(localPeli => localPeli.id !== pelicula.id);
    } else {
      // Agregar al inicio
      this._localPeliculas = [pelicula, ...this._localPeliculas];
    }

    await this._storage?.set('peliculas', this._localPeliculas);
  }

  async loadPeliculas() {
    try {
      const peliculas = await this._storage?.get('peliculas');
      this._localPeliculas = peliculas || [];
    } catch (error) {
      console.error('Error al cargar películas', error);
    }
  }

  peliculaEnFavoritos(pelicula: PeliculaDetalle) {
    return !!this._localPeliculas.find(localPeli => localPeli.id === pelicula.id);
  }

  async getPeliculasFavoritas(): Promise<PeliculaDetalle[]> {
    if (!this._storage) {
      await this.init(); // asegura que el storage esté inicializado
    }
    await this.loadPeliculas(); // asegura que los datos se carguen
    return this._localPeliculas;
  }
  
}
