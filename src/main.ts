import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { enableProdMode } from '@angular/core';
import { register as registerSwiper } from 'swiper/element/bundle';
import { environment } from './environments/environment';
import { register } from 'swiper/element/bundle';

registerSwiper(); 
register();// <-- IMPORTANTE: registra los custom elements antes de bootstrap

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
