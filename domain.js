export class Producto {

    #precioBase; // Atributo privado

    constructor(nombre, precioBase, cantidad) {
        // Se puede arrancar mostrando con funcion constructora y agregando atributos al prototipo
        // Y despues pasar a hacer todo con la sintaxis de clases
        this.nombre = nombre
        this.#precioBase = precioBase
        this.cantidad = cantidad
        this.descuentos = [] // o new Array()
    }

    agregarDescuento(descuento) {
        this.descuentos.push(descuento)
    }

    precioFinal() {
        const precioBaseTotal = this.precioBase * this.cantidad
        const precioFinal = this.descuentos.reduce( // Ejemplo de reduce
            (precioAnterior, descuento) =>
                precioAnterior - descuento.valorDescontado(precioBaseTotal, this.cantidad), // Polimorfismo
            precioBaseTotal)
        return Math.max(0, precioFinal)
    }

    precioUnitarioFinal() {
        return this.precioFinal() / this.cantidad
    }

    // Ejemplo de getters y setters
    get precioBase() {
        return this.#precioBase
    }

    set preciobase(nuevoPrecioBase) {
        this.#precioBase = nuevoPrecioBase
    }
}

export class DescuentoPorcentaje {
    constructor(porcentaje) {
        this.porcentaje = porcentaje
    }

    valorDescontado(precioBaseTotal, _) {
        return precioBaseTotal * this.porcentaje / 100
    }
}

export class DescuentoPorCantidad {
    // "Tanto descuento en la N unidad". Sirve para hacer 2x1, etc.
    constructor(cantidadMinima, porcentaje) {
        this.cantidadMinima = cantidadMinima
        this.porcentaje = porcentaje
    }

    valorDescontado(precioBaseTotal, cantidad) {
        const vecesRepetido = Math.floor(cantidad / this.cantidadMinima)
        let valorDescontado = 0
        if (vecesRepetido >= 1) {
            valorDescontado = precioBaseTotal * this.porcentaje / 100 * vecesRepetido
        }
        return valorDescontado
    }
}
