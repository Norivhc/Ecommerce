const carrito = [];

async function fetchData() {
  try {
    const response = await fetch("js/productos.JSON");
    const data = await response.json();
    console.log(data);

    const btns = document.querySelectorAll("button");
    btns.forEach(button => {
      button.addEventListener("click", e => {
        const categoria = e.target.innerText;
       if(categoria === "Todos") {
        crearCatalogo(data)
       } else {
         const productosFiltrados = data.filter(producto => producto.categoria === categoria);
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

const body = document.querySelector("body");
const contCatalogo = document.createElement("div");
contCatalogo.classList.add("contCatalogo")
body.appendChild(contCatalogo);

const seccionCarrito = document.querySelector(".carrito")

function crearCatalogo(array) {
  contCatalogo.innerHTML = ""; 

  array.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("card"); 
    contCatalogo.appendChild(card)
    const nombre = document.createElement("div");
    nombre.innerText = `${producto.nombre}`
    nombre.classList.add("nombre")
    card.appendChild(nombre)

    const precio = document.createElement("div");
    precio.innerText = `${producto.precio}`
    precio.classList.add("precio")
    card.appendChild(precio)
    const categoria = document.createElement("div");
    categoria.innerText = `${producto.categoria}`
    categoria.classList.add("categoria")
    card.appendChild(categoria)
    const imagen = document.createElement("img");
    imagen.src = producto.img;
    imagen.classList.add("img");
    card.appendChild(imagen)

    const botonCompra = document.createElement("button")
    botonCompra.classList.add("botonCompra")
    card.appendChild(botonCompra)
    botonCompra.innerText = "Agregar al carrito"

    botonCompra.addEventListener("click", (e) => {
      const indiceProducto = carrito.findIndex(item => item.nombre === producto.nombre);
      if (indiceProducto !== -1) {
        // Object with the same name already exists, increase cantidad
        carrito[indiceProducto].cantidad++;
    
        const cantidadProductoCarrito = document.querySelector(`#cantidadProductoCarrito-${indiceProducto}`);
        if (cantidadProductoCarrito) {
          cantidadProductoCarrito.innerText = carrito[indiceProducto].cantidad;
        }
      } else {
        // Object doesn't exist, add new object to the carrito array
        carrito.push({
          nombre: producto.nombre,
          cantidad: 1
        });
    
        const nuevoIndiceProducto = carrito.length - 1;
    
        const nombreCarrito = document.createElement("p");
        nombreCarrito.innerText = producto.nombre;
        seccionCarrito.appendChild(nombreCarrito);
    
        const cantidadProductoCarrito = document.createElement("p");
        cantidadProductoCarrito.id = `cantidadProductoCarrito-${nuevoIndiceProducto}`;
        cantidadProductoCarrito.innerText = carrito[nuevoIndiceProducto].cantidad;
        seccionCarrito.appendChild(cantidadProductoCarrito);
      }
    });
  })
  }




