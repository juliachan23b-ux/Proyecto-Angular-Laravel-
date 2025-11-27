import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; //  Importante
import { routes } from './app.routes';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav style="margin-bottom: 20px;">
      <a routerLink="/" routerLinkActive="active" style="margin-right: 15px;">Inicio</a>
      <a routerLink="/movies" routerLinkActive="active">Catálogo</a>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

// 👇 Configuración global (rutas + HTTP)
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // 👈 Esto reemplaza a HttpClientModule
  ]
});
