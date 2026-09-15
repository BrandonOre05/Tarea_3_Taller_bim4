import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';
import { SubtotalPipe } from '../../pipes/subtotal.pipe';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, SubtotalPipe],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  private carritoService = inject(CarritoService);

  carrito$ = this.carritoService.carrito$;

  mensajeCompra: string = '';

  cambiar(id: number, delta: number): void {
    this.carritoService.cambiarCantidad(id, delta);
  }

  eliminar(id: number): void {
    this.carritoService.eliminar(id);
  }

  calcularTotal(items: Producto[]): number {
    return items.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  }

  comprar(items: Producto[]): void {
    if (items.length === 0) return;

    const totalCompra = this.calcularTotal(items);
    this.mensajeCompra = `Compra exitosa! Total pagado: ${totalCompra.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ' })}`;

    this.carritoService.vaciar();

    setTimeout(() => {
      this.mensajeCompra = '';
    }, 4000);
  }
}