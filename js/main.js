let carrito = [];

async function fetchData() {
  try {
    const response = await fetch("js/productos.JSON");
    const data = await response.json();
    console.log(data);

    const btns = document.querySelectorAll("button");
    btns.forEach((buttonElement) => {
      buttonElement.addEventListener("click", (e) => {
        const categoria = e.target.innerText;
        if (categoria === "Todos") {
          crearCatalogo(data);
        } else {
          const productosFiltrados = data.filter(
            (producto) => producto.categoria === categoria
          );
          crearCatalogo(productosFiltrados);
        }
      });
    });

    crearCatalogo(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();

const divTotal = document.querySelector(".total");
const catalogoContenedor = document.querySelector(".catalogo");
const seccionCarritoContenedor = document.querySelector(".carrito");

const contCatalogo = document.createElement("div");
contCatalogo.classList.add("contCatalogo");

catalogoContenedor.appendChild(contCatalogo);

document.getElementById("botonCompletarCompra").addEventListener("click", function () {
  Toastify({
    text: "This is a toast",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
});

function crearCatalogo(array) {
  contCatalogo.innerHTML = "";

  array.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card");
    contCatalogo.appendChild(card);

    const nombre = document.createElement("div");
    nombre.innerText = `${producto.nombre}`;
    nombre.classList.add("nombre");
    card.appendChild(nombre);

    const precio = document.createElement("div");
    precio.innerText = `${producto.precio}`;
    precio.classList.add("precio");
    card.appendChild(precio);

    const categoria = document.createElement("div");
    categoria.innerText = `${producto.categoria}`;
    categoria.classList.add("categoria");
    card.appendChild(categoria);

    const imagen = document.createElement("img");
    imagen.src = producto.img;
    imagen.classList.add("img");
    card.appendChild(imagen);

    const botonCompra = document.createElement("button");
    botonCompra.classList.add("botonCompra");
    card.appendChild(botonCompra);
    botonCompra.innerText = "Agregar al carrito";

    botonCompra.addEventListener("click", (e) => {
      const indiceProducto = carrito.findIndex((item) => item.nombre === producto.nombre);

      if (indiceProducto !== -1) {
        carrito[indiceProducto].cantidad++;

        const cantidadProductoCarrito = document.querySelector(`#cantidadProductoCarrito-${indiceProducto}`);
        const subtotalCarrito = document.querySelector(`#subtotal-${indiceProducto}`);

        if (cantidadProductoCarrito) {
          let subtotal = carrito[indiceProducto].cantidad * carrito[indiceProducto].precio;
          carrito[indiceProducto].subtotal = subtotal;
          cantidadProductoCarrito.innerText = `cantidad: ${carrito[indiceProducto].cantidad}`;
          subtotalCarrito.innerText = `subtotal: ${subtotal}`;
          actualizarTotal();
        }
      } else {
        carrito.push({
          nombre: producto.nombre,
          cantidad: 1,
          precio: producto.precio,
          subtotal: producto.precio,
        });

        const nuevoIndiceProducto = carrito.length - 1;

        const productoCarrito = document.createElement("div");
        productoCarrito.classList.add("producto-carrito");
        seccionCarritoContenedor.appendChild(productoCarrito);

        const nombreCarrito = document.createElement("p");
        nombreCarrito.classList.add("nombre-carrito");
        nombreCarrito.innerText = producto.nombre;
        productoCarrito.appendChild(nombreCarrito);

        const cantidadProductoCarrito = document.createElement("p");
        cantidadProductoCarrito.classList.add("cantidad-carrito");
        cantidadProductoCarrito.id = `cantidadProductoCarrito-${nuevoIndiceProducto}`;
        cantidadProductoCarrito.innerText = `cantidad: ${carrito[nuevoIndiceProducto].cantidad}`;
        productoCarrito.appendChild(cantidadProductoCarrito);

        const subtotal = document.createElement("p");
        subtotal.classList.add("subtotal-carrito");
        subtotal.id = `subtotal-${nuevoIndiceProducto}`;
        subtotal.innerText = `subtotal: ${carrito[nuevoIndiceProducto].subtotal}`;
        productoCarrito.appendChild(subtotal);

        actualizarTotal();
      }
    });
  });
}

function actualizarTotal() {
  const totalElement = document.querySelector(".total");

  let totalPrecio = 0;
  carrito.forEach((item) => {
    totalPrecio += item.subtotal;
  });

  if (totalElement) {
    totalElement.innerText = `Precio total: ${totalPrecio}`;
  } else {
    const total = document.createElement("p");
    total.innerText = `Precio total: ${totalPrecio}`;
    total.classList.add("total");
    divTotal.appendChild(total);
  }
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
window.addEventListener("beforeunload", guardarCarritoEnLocalStorage);

function cargarCarritoDesdeLocalStorage() {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
}

function actualizarCarrito() {
  seccionCarritoContenedor.innerHTML = "";
  carrito.forEach((producto, index) => {
    const productoCarrito = document.createElement("div");
    productoCarrito.classList.add("producto-carrito");
    seccionCarritoContenedor.appendChild(productoCarrito);

    const nombreCarrito = document.createElement("p");
    nombreCarrito.classList.add("nombre-carrito");
    nombreCarrito.innerText = producto.nombre;
    productoCarrito.appendChild(nombreCarrito);

    const cantidadProductoCarrito = document.createElement("p");
    cantidadProductoCarrito.classList.add("cantidad-carrito");
    cantidadProductoCarrito.id = `cantidadProductoCarrito-${index}`;
    cantidadProductoCarrito.innerText = `cantidad: ${producto.cantidad}`;
    productoCarrito.appendChild(cantidadProductoCarrito);

    const subtotal = document.createElement("p");
    subtotal.classList.add("subtotal-carrito");
    subtotal.id = `subtotal-${index}`;
    subtotal.innerText = `subtotal: ${producto.subtotal}`;
    productoCarrito.appendChild(subtotal);
  });

  actualizarTotal();
}

const botonVaciar = document.querySelector(".botonVaciar");
botonVaciar.addEventListener("click", () => {
  carrito = [];
  seccionCarritoContenedor.innerHTML = "";
  actualizarTotal();
});

window.addEventListener("DOMContentLoaded", cargarCarritoDesdeLocalStorage);

const formulario = document.getElementById('miFormulario');

    
    formulario.addEventListener('submit', function(event) {
      event.preventDefault(); 

      
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const mensaje = document.getElementById('mensaje').value;

      

    
      console.log('Nombre:', nombre);
      console.log('Email:', email);
      console.log('Mensaje:', mensaje);

      const resultado = document.createElement("div");
      resultado.innerText = `Nombre:${nombre} Email:${email} Mensaje:${mensaje}`
      const resultadoContainer = document.querySelector(".resultado")
      resultadoContainer.appendChild(resultado)

     
      formulario.reset();
    });