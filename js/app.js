const carrito = document.getElementById("carrito");
const libros = document.getElementById("lista-libros");
const listaLibros = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  libros.addEventListener("click", comprarLibro);
  carrito.addEventListener("click", eliminarLibro);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarLibro(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const libro = e.target.parentElement.parentElement;
        leerDatosLibro(libro);
    }
}

function leerDatosLibro(libro){
    const infoLibro = {
        imagen: libro.querySelector('img').src,
        titulo: libro.querySelector('h4').textContent,
        precio: libro.querySelector('.precio span').textContent,
        id: libro.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoLibro);
}

function insertarCarrito(libro) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${libro.imagen}" width=100> 
       </td> 
       <td>${libro.titulo}</td>
       <td>${libro.precio}</td>
       <td>
        <a href="#" class="borrar-libro" data-id="${libro.id}">X</a>
       </td>
    `;
    listaLibros.appendChild(row);
    guardarLibroLocalStorage(libro);
}

function eliminarLibro(e) {
    e.preventDefault();

    let libro,
        libroId;
    
    if(e.target.classList.contains('borrar-libro')) {
        e.target.parentElement.parentElement.remove();
        libro = e.target.parentElement.parentElement;
        libroId = libro.querySelector('a').getAttribute('data-id');
    }
    eliminarLibroLocalStorage(libroId)
}

function vaciarCarrito(){
    while(listaLibros.firstChild){
        listaLibros.removeChild(listaLibros.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarLibroLocalStorage(libro) {
    let libros;

    libros = obtenerLibrosLocalStorage();
    libros.push(libro);

    localStorage.setItem('libros', JSON.stringify(libros));
}

function obtenerLibrosLocalStorage() {
    let librosLS;

    if(localStorage.getItem('libros') === null) {
        librosLS = [];
    }else {
        librosLS = JSON.parse(localStorage.getItem('libros'));
    }
    return librosLS;
}

function leerLocalStorage() {
    let librosLS;

    librosLS = obtenerLibrosLocalStorage();

    librosLS.forEach(function(libro){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${libro.imagen}" width=100>
            </td>
            <td>${libro.titulo}</td>
            <td>${libro.precio}</td>
            <td>
                <a href="#" class="borrar-platillo" data-id="${libro.id}">X</a>
            </td>
        `;
        listaLibros.appendChild(row);
    });
}

function eliminarLibroLocalStorage(libro) {
    let librosLS;
    librosLS = obtenerLibrosLocalStorage();

    librosLS.forEach(function(libroLS, index){
        if(libroLS.id === libro) {
            librosLS.splice(index, 1);
        }
    });

    localStorage.setItem('libros', JSON.stringify(librosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}




