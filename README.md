Descripción general de la aplicación
Esta aplicación móvil, desarrollada con Ionic Framework y Angular, permite a los usuarios explorar, 
buscar y guardar películas favoritas.
Consume los datos de la API pública The Movie Database (TMDb) y muestra películas recientes, 
en cartelera y populares mediante carruseles deslizables.

El usuario puede acceder a tres secciones principales:

Inicio: películas nuevas, populares y en cartelera.

Buscar: búsqueda de películas por nombre.

Favoritos: lista personalizada de películas guardadas.

Tecnologías y dependencias utilizadas
Framework y lenguaje

Ionic 7 – Framework híbrido para crear apps móviles con tecnología web.

Angular – Estructura de frontend basada en TypeScript.

TypeScript – Lenguaje principal del proyecto.

SCSS – Estilos personalizados para una mejor organización visual.

Dependencias principales

@ionic/angular – Componentes UI de Ionic.

@ionic/storage-angular – Almacenamiento local de datos.

@angular/common/http – Módulo para peticiones HTTP a la API.

rxjs – Manejo de flujos de datos asincrónicos.

swiper – Carruseles deslizables para mostrar las películas.

API externa

The Movie Database (TMDb) – Fuente de datos (películas, detalles, actores, etc.).

Requiere un apiKey configurado en el archivo environment.ts.

Instrucciones para la instalación y ejecución local
Requisitos previos

Node.js (v16 o superior)

Ionic CLI instalado globalmente

npm install -g @ionic/cli


API Key de TMDb (https://www.themoviedb.org/)

Clonar el repositorio
git clone https://github.com/cometwall/peliculasApp.git
cd peliculasApp

Instalar dependencias
npm install
Configurar el archivo environment.ts

Agrega tu clave de TMDb:

export const environment = {
  production: false,
  url: 'https://api.themoviedb.org/3',
  apiKey: 'TU_API_KEY_AQUI'
};
