let carrito = [];

// declaro una variable para obtener productos de la tienda por su id
const contenidoTienda = document.getElementById("contenidoTienda");


//declaro variable para ver los productos del carrito
const mostrarCarrito = document.getElementById("mostrarCarrito");

const carritoContenedor = document.getElementById("carritoContenedor");

//declaro metodo para recorrer carrito y creo contenedor para productos con sus propiedades

productos.forEach((products) => {
    let contenido = document.createElement("div");
    contenidoTienda.className = "tarjeta-productos";
    contenido.innerHTML = `
    <img src="${products.imagen}">
    <h3>${products.nombre}</h3>
    <p class="precio-producto">$ ${products.precio}</p>
    `;

    contenidoTienda.append(contenido);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "boton-comprar"

    contenido.append(comprar)

    comprar.addEventListener("click", () => {
        carrito.push({
            imagen: products.imagen,
            nombre: products.nombre,
            precio: products.precio,
        });
        console.log(carrito);
    })
});

mostrarCarrito.addEventListener("click", () => {
    const encabezado = document.createElement("div");
    encabezado.className = "encabezado";
    encabezado.innerHTML = `<h1 class="encabezado-titulo">Carrito</h1>`;
    
    carritoContenedor.append(encabezado);
    
    const button = document.createElement("h1");
    button.innerText = "X";
    button.className = "boton-encabezado";

    encabezado.append(boton);
    
});