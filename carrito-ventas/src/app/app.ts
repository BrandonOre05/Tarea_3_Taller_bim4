import { Component } from '@angular/core';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProductosComponent, CarritoComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}