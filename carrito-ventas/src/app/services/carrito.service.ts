import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {

  productosDisponibles: Producto[] = [
    { id: 1, nombre: 'Laptop',  precio: 5000, cantidad: 0 },
    { id: 2, nombre: 'Mouse',   precio: 150,  cantidad: 0 },
    { id: 3, nombre: 'Teclado', precio: 300,  cantidad: 0 },
    { id: 4, nombre: 'Monitor', precio: 1200, cantidad: 0 },
  ];

  private carritoSubject = new BehaviorSubject<Producto[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  agregar(producto: Producto): void {
    const actual = this.carritoSubject.value;
    const existe = actual.find(p => p.id === producto.id);

    if (existe) {
      const actualizado = actual.map(p =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      this.carritoSubject.next(actualizado);
    } else {
      this.carritoSubject.next([...actual, { ...producto, cantidad: 1 }]);
    }
  }

  cambiarCantidad(id: number, delta: number): void {
    const actual = this.carritoSubject.value
      .map(p => p.id === id ? { ...p, cantidad: p.cantidad + delta } : p)
      .filter(p => p.cantidad > 0);
    this.carritoSubject.next(actual);
  }

  eliminar(id: number): void {
    const actual = this.carritoSubject.value.filter(p => p.id !== id);
    this.carritoSubject.next(actual);
  }

  vaciar(): void {
    this.carritoSubject.next([]);
  }
}