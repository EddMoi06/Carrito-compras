
// variables

const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

// eventos
cargaEventos();
function cargaEventos(){
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        carritoHTML();
    })
}
function eliminarCurso(e){
    e.preventDefault();
    
    if(e.target.classList.contains('borrar-curso')){
        const borrar = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter (curso => curso.id !== borrar);

        carritoHTML();
    }
}
function agregarCurso(e){
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        detallesCurso(cursoSeleccionado);
    };
};

function detallesCurso(curso){
    
    const infoCurso = {
        nombre: curso.querySelector('h4').textContent,
        imagen: curso.querySelector('img').src,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    if(articulosCarrito.some(curso => curso.id === infoCurso.id)){
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

function carritoHTML(){

    limpiarHTML();
    articulosCarrito.forEach(curso =>{
        const {nombre,imagen,precio,id,cantidad} = curso
        const texto = document.createElement('tr');
        texto.innerHTML = `
        <td><img src = "${imagen}", width = "100"></td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#", class="borrar-curso", data-id="${id}">Delete</a></td>
        `


        contenedorCarrito.appendChild(texto);
    })
}

function limpiarHTML (){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    };
}