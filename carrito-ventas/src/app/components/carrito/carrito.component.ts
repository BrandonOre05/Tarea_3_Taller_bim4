import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
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
export class CarritoComponent implements OnInit, OnDestroy {

  carrito: Producto[] = [];
  total: number = 0;
  mensajeCompra: string = '';
  private sub!: Subscription;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.sub = this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
      this.total = this.calcularTotal(items);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  cambiar(id: number, delta: number): void {
    this.carritoService.cambiarCantidad(id, delta);
  }

  eliminar(id: number): void {
    this.carritoService.eliminar(id);
  }

  calcularTotal(items: Producto[]): number {
    return items.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  }

  comprar(): void {
    if (this.carrito.length === 0) return;

    const totalCompra = this.total;
    this.mensajeCompra = `✅ ¡Compra exitosa! Total pagado: ${totalCompra.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ' })}`;

    this.carritoService.vaciar();

    setTimeout(() => {
      this.mensajeCompra = '';
    }, 4000);
  }
}