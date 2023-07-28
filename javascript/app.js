// let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// // declaro variables
// const contenidoTienda = document.getElementById("contenidoTienda");
// const mostrarCarrito = document.getElementById("mostrarCarrito");
// const cerrarCarrito = document.getElementById("close");
// const carritoContenedor = document.getElementById("carritoContenedor");
// const total = document.getElementById("total");

// /** Creo los productos en el carrito al momento de hacer click en comprar. */
// const createProductInCart = (products) => {
//   const productsContainer = document.getElementById("products");
//   const productsCard = document.createElement("div");
//   productsCard.className = "products-card";

//   productsCard.innerHTML = `
//               <div>
//                   <img
//                   src="${products.imagen}"
//                   alt="buzo"
//                   width="50px"
//                   height="50px"
//               />
//               </div>
//               <div>
//                   <h2>${products.nombre}</h2>
//                   <p>$ ${products.precio}</p>
//               </div>
//           `;

//   productsContainer.append(productsCard);
// };

// /** Renderizo los productos en el carrito. */
// const renderProducts = (products, contenido) => {
//   contenido.className = "tarjeta-productos";
//   contenido.innerHTML = `
//       <img src="${products.imagen}">
//       <h3>${products.nombre}</h3>
//       <p class="precio-producto">$ ${products.precio}</p>
//       `;

//   contenidoTienda.append(contenido);
// };

// /** Pusheo los productos en el array del carrito. */
// const pushProductInCartArray = (products) => {
//   carrito.push({
//     imagen: products.imagen,
//     nombre: products.nombre,
//     precio: products.precio,
//   });
// };

// /** Calculo el total del carrito. */
// const calculateTotal = () => {
//   const productsTotal = carrito.reduce((acc, el) => acc + el.precio, 0);
//   total.innerHTML = "";
//   total.append(productsTotal);
// };

// /** Recorro los productos, creo el boton comprar y guardo los productos en el carrito.  */
// productos.forEach((products) => {
//   let contenido = document.createElement("div");

//   renderProducts(products, contenido);

//   let comprar = document.createElement("button");
//   comprar.innerText = "comprar";
//   comprar.className = "boton-comprar";

//   contenido.append(comprar);

//   comprar.addEventListener("click", () => {
//     pushProductInCartArray(products);
//     createProductInCart(products);
//     calculateTotal();
//     guardadoLocal();
//   });
// });

// /** Muestro los productos del localStorage en el carrito y hago el calculo del total. */
// if (carrito.length) {
//   carrito.forEach((product) => {
//     createProductInCart(product);
//     calculateTotal();
//   });
// }

// mostrarCarrito.addEventListener("click", () => {
//   document.getElementById("carritoContenedor").style.display = "block";
// });

// /** Cierro modal */
// cerrarCarrito.addEventListener("click", () => {
//   document.getElementById("carritoContenedor").style.display = "none";
// });

// //aplico localStorage
// const guardadoLocal = () => {
//   localStorage.setItem("carrito", JSON.stringify(carrito));
// };

const consultarProductos = async () => {
  const response = await fetch("../data/productos.json");
  const productos = await response.json();
  return productos;
};

const productos = consultarProductos();
const productosContainer = document.querySelector(".productos__container");
const countCarrito = document.querySelector("#countCarrito");
const btnFinalizar = document.querySelector("#btn-finalizar");

const catVga = document.querySelector("#vga");
const catFuentes = document.querySelector("#fuentes");
const catMonitores = document.querySelector("#monitores");
const catProcesadores = document.querySelector("#procesadores");
const catMothers = document.querySelector("#mothers");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* FUNCIONES */

// Mostrar todos los productos:
consultarProductos().then((productos) => {
  productos.forEach((producto) => {
    productosContainer.innerHTML += `<div class="producto__card" >
    <h3>${producto.nombre.substring(0, 30)}...</h3>
    <img src="${producto.imagen}" />
    <div>
    <p class="curso__price">$${producto.precio}</p>
    <a href='#' class='btn-primary agregar-favorito' id='${
      producto.id
    }'>Comprar</a>
    </div>
  </div>`;
  });
  btnComprar(productos);
});

function buscarCategoria(marca) {
  productosContainer.innerHTML = "";
  consultarProductos().then((productos) => {
    productos = productos.filter((x) => x.marca === marca);
    productos.forEach((y) => {
      productosContainer.innerHTML += `<div class="producto__card" >
      <h3>${y.nombre.substring(0, 30)}...</h3>
      <img src="${y.imagen}" />
      <div>
      <p class="curso__price">$${y.precio}</p>
      <a href='#' class='btn-primary agregar-favorito' id='${y.id}'>Comprar</a>
      </div>
      
    </div>`;
    });
    btnComprar(productos);
  });
}

// Poner funcion en los botones de comprar:
function btnComprar(productos) {
  const btnAgregar = document.querySelectorAll(".agregar-favorito");
  btnAgregar.forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      const productoSeleccionado = productos.find(
        (prod) => prod.id === parseInt(btn.id)
      );
      const productoCarrito = { ...productoSeleccionado, cantidad: 1 };
      const indexCarrito = carrito.findIndex(
        (prod) => prod.id === productoCarrito.id
      );
      if (indexCarrito === -1) {
        carrito.push(productoCarrito);
      } else {
        carrito[indexCarrito].cantidad++;
      }
      actualizarCarrito();
      imprimirCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
      btnFinalizar.style.display = "block";
    };
  });
}


function actualizarCarrito() {
  countCarrito.innerHTML = carrito.length;
}

// Mostrar lista de carritos
function imprimirCarrito() {
  listaCarrito.innerHTML = "";
  carrito.forEach(
    (item) =>
      (listaCarrito.innerHTML += `<li><div><img src="${item.imagen}" /> ${
        item.nombre
      } x ${item.cantidad}</div> <div>$${
        item.cantidad * item.precio
      }<i class='bx bxs-trash' data-id='${item.id}'></i></div></li>`)
  );
  if (carrito !== []) {
    const btnEliminar = document.querySelectorAll(".bxs-trash");
    btnEliminar.forEach((btn) => {
      btn.onclick = (e) => {
        const productoId = e.target.getAttribute("data-id");
        carrito = carrito.filter((prod) => prod.id != productoId);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
        imprimirCarrito();
      };
    });
  }
  crearTotal();
}

function crearTotal() {
  sumatotal = 0;
  carrito.forEach((producto) => {
    sumatotal += producto.precio * producto.cantidad;
  });
  const total = document.querySelector("#total");

  sumatotal !== 0 ? carritoLleno() : carritoVacio();
}

function finalizarCompra() {
  swal(
    "Compra realizada con exito",
    "Recibirá los datos de la compra por mail",
    "success"
  );
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
  imprimirCarrito();
  btnFinalizar.style.display = "none";
}

function carritoLleno() {
  total.innerHTML = `<span>El total es de $${sumatotal}</span>`;
  btnFinalizar.style.display = "block";
}

function carritoVacio() {
  total.innerHTML = `El carrito esta vacio`;
  btnFinalizar.style.display = "none";
}



catVga.addEventListener("click", () => buscarCategoria("vga"));
catFuentes.addEventListener("click", () => buscarCategoria("fuentes"));
catMonitores.addEventListener("click", () => buscarCategoria("monitores"));
catProcesadores.addEventListener("click", () => buscarCategoria("procesadores"));
catMothers.addEventListener("click", () => buscarCategoria("mothers"));
btnFinalizar.addEventListener("click", finalizarCompra);


actualizarCarrito();
imprimirCarrito();

const nombre = document.querySelector("#nombre");
function alertaNombre() {
  const name = nombre.value;
  alert(name);
}