let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// declaro variables
const contenidoTienda = document.getElementById("contenidoTienda");
const mostrarCarrito = document.getElementById("mostrarCarrito");
const cerrarCarrito = document.getElementById("close");
const carritoContenedor = document.getElementById("carritoContenedor");
const total = document.getElementById("total");

/** Creo los productos en el carrito al momento de hacer click en comprar. */
const createProductInCart = (products) => {
  const productsContainer = document.getElementById("products");
  const productsCard = document.createElement("div");
  productsCard.className = "products-card";

  productsCard.innerHTML = `
              <div>
                  <img
                  src="${products.imagen}"
                  alt="buzo"
                  width="50px"
                  height="50px"
              />
              </div>
              <div>
                  <h2>${products.nombre}</h2>
                  <p>$ ${products.precio}</p>
              </div>
          `;

  productsContainer.append(productsCard);
};

/** Renderizo los productos en el carrito. */
const renderProducts = (products, contenido) => {
  contenido.className = "tarjeta-productos";
  contenido.innerHTML = `
      <img src="${products.imagen}">
      <h3>${products.nombre}</h3>
      <p class="precio-producto">$ ${products.precio}</p>
      `;

  contenidoTienda.append(contenido);
};

/** Pusheo los productos en el array del carrito. */
const pushProductInCartArray = (products) => {
  carrito.push({
    imagen: products.imagen,
    nombre: products.nombre,
    precio: products.precio,
  });
};

/** Calculo el total del carrito. */
const calculateTotal = () => {
  const productsTotal = carrito.reduce((acc, el) => acc + el.precio, 0);
  total.innerHTML = "";
  total.append(productsTotal);
};

/** Recorro los productos, creo el boton comprar y guardo los productos en el carrito.  */
productos.forEach((products) => {
  let contenido = document.createElement("div");

  renderProducts(products, contenido);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "boton-comprar";

  contenido.append(comprar);

  comprar.addEventListener("click", () => {
    pushProductInCartArray(products);
    createProductInCart(products);
    calculateTotal();
    guardadoLocal();
  });
});

/** Muestro los productos del localStorage en el carrito y hago el calculo del total. */
if (carrito.length) {
  carrito.forEach((product) => {
    createProductInCart(product);
    calculateTotal();
  });
}

mostrarCarrito.addEventListener("click", () => {
  document.getElementById("carritoContenedor").style.display = "block";
});

/** Cierro modal */
cerrarCarrito.addEventListener("click", () => {
  document.getElementById("carritoContenedor").style.display = "none";
});

//aplico localStorage
const guardadoLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
