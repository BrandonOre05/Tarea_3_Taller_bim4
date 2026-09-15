# Tarea_3_Taller_bim4

# Carrito de Ventas con Observables y Pipes — Angular

## Descripción

Aplicación que permite:

- Ver un catálogo de productos disponibles.
- Agregar productos al carrito.
- Aumentar o disminuir la cantidad de cada producto.
- Eliminar productos del carrito.
- Ver el subtotal por producto y el total general.
- Realizar una compra con mensaje de confirmación.

Todo el estado del carrito se comparte entre componentes a través de un **servicio con `BehaviorSubject`**, y los cálculos de subtotales y totales se hacen con un **pipe personalizado** (`SubtotalPipe`) y el pipe integrado `CurrencyPipe`.


## Objetivos cumplidos

| Objetivo | ¿Cumplido? |
| Diseñar un flujo de carrito de ventas | ✅ |
| Usar un servicio con Observables para compartir estado | ✅ |
| Comunicar componentes a través del servicio | ✅ |
| Implementar pipes (incluido uno personalizado) | ✅ |
| Aplicar data binding y directivas | ✅ |
| Verificar el flujo completo de compra | ✅ |
| Documentar la arquitectura | ✅ (este README) |



1. **Usuario hace click en "Agregar"** → `ListaProductosComponent` llama a `carritoService.agregar(producto)`.
2. **El servicio actualiza el `BehaviorSubject`** con un nuevo array de productos.
3. **Todos los suscriptores reciben la actualización** (en este caso, `CarritoComponent`).
4. **`CarritoComponent` re-renderiza** la lista, subtotales y total automáticamente.

### Métodos

| Método | Descripción |
|---|---|
| `agregar(producto)` | Agrega un producto nuevo o incrementa su cantidad si ya existe. |
| `cambiarCantidad(id, delta)` | Modifica la cantidad en `+1` o `-1`. Si llega a 0, elimina el producto. |
| `eliminar(id)` | Elimina el producto del carrito. |
| `vaciar()` | Vacía el carrito por completo (usado al comprar). |

