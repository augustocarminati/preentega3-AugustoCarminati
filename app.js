let carrito = [];

// declaro una variable para obtener productos de la tienda por su id

const contenidoTienda = document.getElementById("contenidoTienda");

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
});

