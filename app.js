let carrito = [];

// declaro variables
const contenidoTienda = document.getElementById("contenidoTienda");
const mostrarCarrito = document.getElementById("mostrarCarrito");
const cerrarCarrito = document.getElementById("close");
const carritoContenedor = document.getElementById("carritoContenedor");

//declaro metodo para recorrer carrito y creo contenedor para productos con sus propiedades

productos.forEach((products) => {
    let contenido = document.createElement("div");
    contenido.className = "tarjeta-productos";
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
        console.log(carrito)
    })
});

//abro modal y muestro productos seleccionados

mostrarCarrito.addEventListener("click", () => {
    document.getElementById("carritoContenedor").style.display = "block";
    const productsContainer = document.getElementById("products");
    let productsCard = document.createElement("div");
    productsCard.className = "products-card";

    carrito.forEach((product) => {
        productsCard.innerHTML = `
              <div>
                  <img
                  src="${product.imagen}"
                  alt="buzo"
                  width="50px"
                  height="50px"
              />
              </div>
              <div>
                  <h2>${product.nombre}</h2>
                  <p>$ ${product.precio}</p>
              </div>
          `;

        productsContainer.append(productsCard);

    });

    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar:$ ${total}`;
    carritoContenedor.append(totalBuying);


});

/** Cierro modal */
cerrarCarrito.addEventListener("click", () => {
    document.getElementById("carritoContenedor").style.display = "none";
});


//aplico localStorage


const guardadoLocal = () => {
    
    localStorage.setItem("cart", JSON.stringify(carrito));
};