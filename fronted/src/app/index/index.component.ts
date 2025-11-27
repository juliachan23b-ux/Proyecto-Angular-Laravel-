import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';       // Para directivas como *ngIf, *ngFor
import { RouterModule } from '@angular/router';       // Para usar routerLink

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],             // Importar módulos necesarios
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {}                         // Renombrar clase por convención
