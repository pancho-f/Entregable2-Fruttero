//FALTA: Hacer que botones hagan funciones -- declarar todos los productos -- botones dinamicos con mouse -- limitar items en el carrito

// se declara el array para la orden y los arrays para los productos disponibles
let ordenes = []
let itemsCarrito = []
const productosComida = ["Pizza", "Hamburguesa", "Barra de Chocolate"]
const productosIndumentaria = ["Gorra", "Lentes de sol", "Camisa"]
const productosElectro = ["Microondas", "Televisor", "Dron"]
const productosLimpieza = ["Papel Higiénico", "Detergente", "Jabón"]
const productosDeco = ["Cactus", "Silla", "Mesa"]

let carritoItems = 0;
let carritoItemsSesion = 0;
let precioTotal = 0;
let ordenCount = 0;
const productos = [{
    nombre: 'Remera',
    precio: 100,
    categoria: 'Ropa',
    imagen: '/Votv_Cacti.webp',
    id:0,
}, {
    nombre: 'Pizza',
    precio: 40,
    categoria: 'Comida',
    imagen: '#',
    id:1,
}, {
    nombre: 'TV',
    precio: 1000,
    categoria: 'Electro',
    imagen: '#',
    id:2,
}]

//  funciones para el catálogo:
//  es usado por otras funciones para alterar la lista
let listarProducto = (numeroProducto) => {
    let contenedor = document.createElement('li');
    contenedor.innerHTML = '<span class="productoSpan"><img src="'+ productos[numeroProducto].imagen +'" class="imagenProducto" alt="imagen de '+ productos[numeroProducto].nombre +'"><p>'+ productos[numeroProducto].nombre +'</p></span><span class="productoSpan"><p class="precio">'+ productos[numeroProducto].precio +'</p><img class="botonCheck" src="/check.png" alt="boton de confirmacion"></span>';
    document.querySelector('#listaCatalogo').append(contenedor)
}
//  genera la lista completa al inicio y al hacer clic en 'todos'
const generarLista = () => {document.querySelector('#listaCatalogo').innerHTML = ''; productos.forEach(producto => {listarProducto(producto.id)})}
generarLista();
//  altera la lista a solo la categoria elegida
let listarCategoria = (categoriaElegida) => {
    document.querySelector('#listaCatalogo').innerHTML = '';
    productos.forEach(producto => {if (categoriaElegida === producto.categoria){listarProducto(producto.id)}});
}

//  funciones para el carrito:
//  altera la lista del carrito agregando el producto elegido
let agregarCarrito = (id) => {
    let contenedor = document.createElement('li');
    itemsCarrito.push(productos[id]);
    itemsCarrito[carritoItems]["idSesion"] = carritoItemsSesion + 1;
    carritoItems +=1; actualizarItemsCarrito();
    carritoItemsSesion +=1; contenedor.id = "carritoItem"+carritoItemsSesion;
    contenedor.innerHTML = '<span class="productoSpan"><img src="'+ productos[id].imagen +'" class="imagenProducto" alt="imagen de '+ productos[id].nombre +'"><p class="nombreProductoCarrito">'+ productos[id].nombre +'</p></span><span class="productoSpan"><p class="precio">'+ productos[id].precio +'</p><img class="botonEliminar" src="/cross.png" alt="eliminar producto"></span>';
    document.querySelector('#listaCarrito').append(contenedor)
    precioTotal += productos[id].precio; actualizarPrecioTotal();
}
//  elimina el producto deseado y resta el precio del total
let eliminarCarrito = (id, precio) => {
    carritoItems -=1; actualizarItemsCarrito();
    document.getElementById(id).remove();
    let idProducto = itemsCarrito.indexOf(itemsCarrito.find(num => num.idSesion === parseInt(id.replace("carritoItem", "")))) ;
    itemsCarrito.splice(idProducto, 1);
    precioTotal -= precio; actualizarPrecioTotal();
}
//  es llamado por otras funciones para actualizar la cantidad de items en el carrito
const actualizarItemsCarrito = () => {document.getElementById('carritoItems').innerHTML = carritoItems;}
//  es llamado por otras funciones para actualizar el precio total
const actualizarPrecioTotal = () => {document.getElementById('precioTotal').innerHTML = precioTotal;}

class Orden {
    constructor(producto1, producto2, producto3, producto4, producto5, producto6) {
        this.producto1 = producto1
        this.producto2 = producto2
        this.producto3 = producto3
        this.producto4 = producto4
        this.producto5 = producto5
        this.producto6 = producto6
    }
}
let enviarCompra = (producto1, producto2, producto3, producto4, producto5, producto6) => {
    const orden = new Orden(producto1, producto2, producto3, producto4, producto5, producto6)
    ordenes.push(orden)
    let cuentaItems = document.getElementsByClassName("nombreProductoCarrito").length;
    ordenCount +=1;
    let item = document.createElement('li');
    item.innerHTML = '<p>Orden Nº'+ ordenCount +'</p><p class="precio">['+ cuentaItems +' Items]</p>'       //agregar onclick alert que muestre los items del array O hover que cambie el texto
    document.querySelector('#listaOrdenes').append(item)
    document.querySelector('#listaCarrito').innerHTML = '';
    carritoItems = 0; actualizarItemsCarrito();
    precioTotal = 0; actualizarPrecioTotal();
}