import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {

  productos: Producto[] = [];

  constructor(private carritoService: CarritoService) {
    this.productos = this.carritoService.productosDisponibles;
  }

  agregar(producto: Producto): void {
    this.carritoService.agregar(producto);
  }
}