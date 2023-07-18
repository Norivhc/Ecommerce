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
  }
  )}




