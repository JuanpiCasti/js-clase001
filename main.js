import {Producto, DescuentoPorCantidad, DescuentoPorcentaje} from './domain.js'
// Instanciacion de objetos
const p1 = new Producto("Gaseosa", 10, 5)
p1.agregarDescuento(new DescuentoPorcentaje(10))
p1.agregarDescuento(new DescuentoPorCantidad(3, 10))

const p2 = new Producto("Galletitas", 10, 7)

const p3 = new Producto("Detergente", 20, 5)
p3.agregarDescuento(new DescuentoPorcentaje(15))

// Calculo de precios de los productos
console.log(p1.precioFinal())
console.log(p2.precioFinal())
console.log(p3.precioFinal())


// Arrays y sus metodos
const carrito = [p1, p2, p3]

function ponerNombreMayuscula(producto) {
    producto.nombre = producto.nombre.toUpperCase()
}

carrito.forEach(ponerNombreMayuscula) // Mostrar que el forEach tiene efecto
console.log(carrito)

const nombresProductos = carrito.map(p => p.nombre) // El map devuelve una nueva lista
console.log(nombresProductos)
console.log(carrito)

const preciosProductos = (productos) => productos.map(p => p.precioUnitarioFinal()) // Otra forma de definir funciones

function obtenerMaximoPrecioUnitario(productos) {
    return Math.max(...preciosProductos(productos))  // Desarmamos el array para pasarlo como lista variable de argumentos
    // Aca se puede preguntar si se animan a contar
    // o pasar por el chat como seria para sacar el producto con el precio maximo usando reduce
}

console.log(obtenerMaximoPrecioUnitario(carrito))

function productosMasCarosQue(precioMinimo, productos) {
    return productos.filter(p => p.precioFinal() >= precioMinimo)
}

console.log(productosMasCarosQue(50, carrito))