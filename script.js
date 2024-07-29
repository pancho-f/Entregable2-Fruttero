// se declaran arrays
let ordenes = []
let itemsCarrito = []
let carritoItems = 0;
let carritoItemsSesion = 0;
let precioTotal = 0;
let ordenCount = 0;

const productos = [{
    nombre: 'Pizza',
    precio: 40,
    categoria: 'Comida',
    imagen: 'assets/votv-pizza.png',
    id:0,
}, {
    nombre: 'Hamburguesa',
    precio: 20,
    categoria: 'Comida',
    imagen: 'assets/votv-burger.png',
    id:1,
}, {
    nombre: 'Barra de Chocolate',
    precio: 25,
    categoria: 'Comida',
    imagen: 'assets/votv-choc.png',
    id:2,
}, {
    nombre: 'Cafetera',
    precio: 200,
    categoria: 'Electro',
    imagen: 'assets/votv-coffeemachine.png',
    id:3,
}, {
    nombre: 'Dron',
    precio: 300,
    categoria: 'Electro',
    imagen: 'assets/votv-drone.png',
    id:4,
}, {
    nombre: 'Cámara',
    precio: 100,
    categoria: 'Electro',
    imagen: 'assets/votv-camera.png',
    id:5,
}, {
    nombre: 'Rollo de Papel Higiénico',
    precio: 5,
    categoria: 'Limpieza',
    imagen: 'assets/votv-TP.png',
    id:6,
}, {
    nombre: 'Esponja',
    precio: 3,
    categoria: 'Limpieza',
    imagen: 'assets/votv-sponge.png',
    id:7,
}, {
    nombre: 'Jabón',
    precio: 5,
    categoria: 'Limpieza',
    imagen: 'assets/votv-soap.png',
    id:8,
}, {
    nombre: 'Florero',
    precio: 50,
    categoria: 'Deco',
    imagen: 'assets/votv-vase.png',
    id:9,
}, {
    nombre: 'Cactus',
    precio: 35,
    categoria: 'Deco',
    imagen: 'assets/Votv_Cacti.webp',
    id:10,
}, {
    nombre: 'Aro de basquet',
    precio: 60,
    categoria: 'Deco',
    imagen: 'assets/votv-hoop.png',
    id:11,
}, {
    nombre: 'Gorra',
    precio: 60,
    categoria: 'Ropa',
    imagen: '#',
    id:12,
}, {
    nombre: 'Lentes de sol',
    precio: 30,
    categoria: 'Ropa',
    imagen: '#',
    id:13,
}, {
    nombre: 'Bufanda',
    precio: 60,
    categoria: 'Ropa',
    imagen: '#',
    id:14,
}]

//  es llamado por otras funciones para actualizar la cantidad de items en el carrito
const actualizarItemsCarrito = () => {document.getElementById('carritoItems').innerHTML = carritoItems;}
//  es llamado por otras funciones para actualizar el precio total
const actualizarPrecioTotal = () => {document.getElementById('precioTotal').innerHTML = precioTotal;}

//  altera la lista del carrito agregando el producto elegido
let botonAgregar = () => {
    botonCheck = document.querySelectorAll('.botonCheck');
    botonCheck.forEach(boton => {
        boton.onclick = (e) => {
            const productoId = e.currentTarget.id;
            let contenedor = document.createElement('li');
            let productoAComprar = {...productos[productoId]} ;
            productoAComprar["idSesion"] = carritoItemsSesion + 1;
            itemsCarrito.push(productoAComprar);
            carritoItems +=1; actualizarItemsCarrito();
            carritoItemsSesion +=1; contenedor.id = "carritoItem"+carritoItemsSesion;
            contenedor.innerHTML = `<span class="productoSpan">
                                        <img src="${productos[productoId].imagen}" class="imagenProducto" alt="imagen de ${productos[productoId].nombre}">
                                        <p class="nombreProductoCarrito">${productos[productoId].nombre}</p>
                                    </span>
                                    <span class="productoSpan">
                                        <p class="precio">${productos[productoId].precio}</p>
                                        <img id=botonItem${carritoItemsSesion} class="botonEliminar" src="assets/cross.png" alt="eliminar producto">
                                    </span>`
            document.querySelector('#listaCarrito').append(contenedor)
            precioTotal += productos[productoId].precio; actualizarPrecioTotal();
            botonRestar();
        }});
};

//  genera la lista completa al inicio y al hacer clic en 'todos'
let listarProductos = (productsArray) => {
    document.querySelector('#listaCatalogo').innerHTML = '';
    productsArray.forEach(producto => {
        const contenedor = document.createElement('li');
        contenedor.innerHTML = `<span class="productoSpan">
                                    <img src="${producto.imagen}" class="imagenProducto" alt="imagen de ${producto.nombre}">
                                    <p>${producto.nombre}</p>
                                </span>
                                <span class="productoSpan">
                                    <p class="precio">${producto.precio}</p>
                                    <img id=${producto.id} class="botonCheck" src="assets/check.png" alt="boton de confirmacion">
                                </span>`;
        document.querySelector('#listaCatalogo').append(contenedor);
    });botonAgregar();
}; listarProductos(productos);

//  altera la lista a solo la categoria elegida
document.getElementById('filtroReset').onclick = () => listarProductos(productos);
let filtrar = () =>{
    let botones = document.querySelectorAll('.filtroCategoria')
    botones.forEach(boton =>{
        boton.onclick = (e) => {
            let categoriaElegida = e.currentTarget.innerText;
            document.querySelector('#listaCatalogo').innerHTML = '';
            let categoriaProductos = productos.filter(cat => cat.categoria === categoriaElegida) ;
            listarProductos(categoriaProductos);
            botonAgregar();
}})}; filtrar();

//  elimina el producto deseado y resta el precio del total
let botonRestar = () => {
    botonCross = document.querySelectorAll('.botonEliminar');
    botonCross.forEach(boton => {
        boton.onclick = (e) => {
            const productoId = e.currentTarget.id.replace("boton", "carrito");  //me devuelve 'carritoItemX'
            carritoItems -=1; actualizarItemsCarrito();
            let precio = document.querySelector(`#${productoId} .precio`).innerText;
            precioTotal -= precio; actualizarPrecioTotal();
            document.getElementById(productoId).remove();
            let idProducto = itemsCarrito.indexOf(itemsCarrito.find(num => num.idSesion === parseInt(productoId.replace("carritoItem", "")))) ;
            itemsCarrito.splice(idProducto, 1);
        }});
};


//  funciones para la lista de órdenes;
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
let enviarCompra = (lista) => {
    const orden = new Orden(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5])
    ordenes.push(orden)
    let cuentaItems = document.getElementsByClassName("nombreProductoCarrito").length;
    ordenCount +=1;
    let item = document.createElement('li');
    item.innerHTML = '<p>Orden Nº'+ ordenCount +'</p><p class="precio">['+ cuentaItems +' Items]</p>'
    document.querySelector('#listaOrdenes').append(item)
    document.querySelector('#listaCarrito').innerHTML = '';
    carritoItems = 0; actualizarItemsCarrito();
    precioTotal = 0; actualizarPrecioTotal();
    localStorage.setItem('orden'+ordenCount, JSON.stringify(orden));
    itemsCarrito = [];
}
let recuperoStorage = () => {
    let num = 0
    while (num < 20) {
        num++;
        let ordenStorage = localStorage.getItem('orden'+num);
        if (ordenStorage != null) {
            ordenStorage = JSON.parse(ordenStorage);
            ordenes.push(ordenStorage);
            ordenCount += 1;
            let item = document.createElement('li');
            item.innerHTML = '<p>Orden Nº'+ ordenCount +'</p><p class="precio">[ENVIADA]</p>'
            document.querySelector('#listaOrdenes').append(item)
        }}
}; recuperoStorage();
document.getElementById('botonComprar').onclick = () => {
    if (carritoItems > 0 && carritoItems < 7){
        let lista = [];
        carritoLista = document.querySelectorAll('.nombreProductoCarrito');
        carritoLista.forEach(item => {
            let idItem = productos.find(prod => prod.nombre == item.innerText).id;
            lista.push(idItem)
        });
        enviarCompra(lista);
    }
};