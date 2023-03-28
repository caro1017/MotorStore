//--String metodos para aumentar el valor y sumarlo que quede el valor real (cambiar precio a numero)
///--- disminuir de a unidad 

// variables para todos los selectores
const carrito = document.querySelector('#carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const divCarrito = document.querySelector('#lista-carrito tbody');
const listaArticulos = document.querySelector('#lista-articulos');
const carritoContenedor = document.querySelector('#img-carrito');
const precioTotal = document.querySelector('#precioTotal');

let articulosCarrito = [];

//llamar las funciones
registrarEventListeners();

//---------------FUNCIONES -----------------
//capturar los eventos con esta funcion
function registrarEventListeners(){
    // Evento para llamar la funcion agregar articulo
    listaArticulos.addEventListener('click', agregarArticulo);

    // Evento para llamar la funcion eliminar articulo
    carrito.addEventListener('click',eliminarArticulo);

    // Evento llamar la funcion vaciar carrito
    vaciarCarrito.addEventListener('click', ()=>{
        articulosCarrito = [];//vuelvo y dejo el arreglo vacio 
        limpiarHtml(); // borramos todo el HTML
    });

    // Mostrar el localStorage en el HTML y generar el contador
    //DOMContentLoaded cuando el documento este cargado
    document.addEventListener('DOMContentLoaded', () => {         
        carrito = JSON.parse(localStorage.getItem('articulosCarrito')) || [] 
        //parse buscar que tiene el carrito 
        // si no agregan nada poner un arreglo vacio 
        carritoHtml();
    })
}

//Agregamos los articulos al carrito 
function agregarArticulo(e){
    e.preventDefault(); // previene que se recarge la pagina
    if(e.target.classList.contains('agregar-carrito')){
        const articuloSeleccionado = e.target.parentElement.parentElement;
        leerDatosArticulo(articuloSeleccionado);
        /* console.log(e.target.parentElement.parentElement) */
    }    
}

// eliminar articulos
function eliminarArticulo(e){
    // si el evento tiene una clase que contenga hacer
    if(e.target.classList.contains('borrar-articulo')){
        const ArticuloId = e.target.getAttribute('data-id');
        /* console.log(e.target.getAttribute('data-id')) */
        articulosCarrito = articulosCarrito.filter( articulo => articulo.id != ArticuloId);
        carritoHtml();
    }
}

// leer HTML donde dimos click y lo extraemos
function leerDatosArticulo(articulo){
    //creamos un objeto con los datos de card
    const infoArticulo = {
        imagen: articulo.querySelector('.card img').src,
        titulo: articulo.querySelector('h4').textContent,
        precio: articulo.querySelector('.precio span ').textContent,
        id: articulo.querySelector('a').getAttribute('data-id'),
        cantidad:1,
    }
    Number(infoArticulo.precio);
    console.log(infoArticulo);
    //revisemos si el articulo ya se encuentra en el array y
    //true solo actualizar la cantidad
    //false adicionar nuevo articulo
    const existeArticulo = articulosCarrito.some(articulo => articulo.id === infoArticulo.id); 
    // some nos indica si el articulo ya fue seleccionado y nos devuelve true o false

    if(existeArticulo){
        const articulos = articulosCarrito.map(articulo=>{
            if(articulo.id === infoArticulo.id){
                articulo.cantidad++;
                return articulo;//retornamos el array mapeado solo con la condicion
            } else {
                return articulo;
            }
        })
        articulosCarrito = [...articulos];
    } else {
        // sino agregamos el producto al carrito
        articulosCarrito = [...articulosCarrito,infoArticulo];
    }    
    carritoHtml();
}

// Inyectar los articulos del array en el HTML del carrito (tbody)
function carritoHtml(){
    //llamar funcion que limpia el html
    limpiarHtml();

    //recorre el array y genera el html
    articulosCarrito.forEach(articulo => {
        //object Destructuring
        const {imagen,titulo,precio,cantidad,id} = articulo;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="80">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-articulo" data-id="${id}">X</a>
        </td>
        `;
        divCarrito.appendChild(row) // insertar un nuevo div dentro del DOM 
    })

    //recorre los articulos para mostar la cantidad en pantalla
    carritoContenedor.textContent = articulosCarrito.length;
    //sacar el valor tota de los productos seleccionados
    /* precioTotal.innerText = articulosCarrito.reduce((articulo, product)=>{ articulo + product.cantidad * product.precio,0}) */
    //llamar la funcion del localStorage
    guardarStorage();
}

// Limpiar el HTML del carrito cuando demos click 
//(borrar lo que este quemado)
function limpiarHtml(){
    //Esta es una forma lenta para aplicativos pequeños
    //divCarrito.innerHTML = '';

    // Esta forma es mejor para limpiar el HTML
    while (divCarrito.firstChild){
        divCarrito.removeChild(divCarrito.firstChild)
    }
}

// Generar un localstorage para realizar un contador de productos
function guardarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito))
}