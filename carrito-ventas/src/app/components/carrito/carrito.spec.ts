import { TestBed } from '@angular/core/testing';
import { CarritoService } from './carrito.service';
import { Producto } from '../models/producto.model';

describe('CarritoService', () => {
  let service: CarritoService;

  // BehaviorSubject emite su valor de forma sincrona al suscribirse,
  // asi que podemos leer el ultimo valor emitido sin necesidad de "done"/async.
  function ultimoValor(): Producto[] {
    let valor: Producto[] = [];
    service.carrito$.subscribe(items => (valor = items)).unsubscribe();
    return valor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe iniciar con el carrito vacío', () => {
    expect(ultimoValor()).toEqual([]);
  });

  it('debe agregar un producto nuevo con cantidad 1', () => {
    const producto: Producto = { id: 1, nombre: 'Laptop', precio: 5000, cantidad: 0 };
    service.agregar(producto);

    const items = ultimoValor();
    expect(items.length).toBe(1);
    expect(items[0].cantidad).toBe(1);
  });

  it('debe incrementar la cantidad si el producto ya existe', () => {
    const producto: Producto = { id: 1, nombre: 'Laptop', precio: 5000, cantidad: 0 };
    service.agregar(producto);
    service.agregar(producto);

    const items = ultimoValor();
    expect(items.length).toBe(1);
    expect(items[0].cantidad).toBe(2);
  });

  it('debe eliminar el producto cuando la cantidad llega a 0', () => {
    const producto: Producto = { id: 1, nombre: 'Laptop', precio: 5000, cantidad: 0 };
    service.agregar(producto);
    service.cambiarCantidad(1, -1);

    expect(ultimoValor().length).toBe(0);
  });

  it('debe vaciar el carrito', () => {
    const producto: Producto = { id: 1, nombre: 'Laptop', precio: 5000, cantidad: 0 };
    service.agregar(producto);
    service.vaciar();

    expect(ultimoValor().length).toBe(0);
  });
});