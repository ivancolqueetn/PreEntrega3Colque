// tu almacen - carrito de compra
// que funcionalidad debe tener un carrito de compras?

//1 debe mostrar productos de forma dinamica
//2 debe agregar productos al carrito.
//3 evitar la carga de productos repetidos en el carrito
//4 mostrar el carrito en el html
//5 eliminar productos del carrito
//6 calcular el total de la compra
//7 vaciar el carrito de compras
//8 almacenar carrito en el local sotarage

//9 boton finalizar compra
//10 cambiar cantidaddes de productos en el carrito

class Producto{
    constructor(id,nombre,precio,img){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.img=img;
        this.cantidad=1;
    }
}

const alicate = new Producto(1,'alicate',20,'img/alicate.png');
const destornillador = new Producto(2,'destornillador',50,'img/destornillador.png');
const serrucho = new Producto(3,'serrucho',80,'img/serrucho.png');
const martillo = new Producto(4,'martillo',150,'img/martillo.png');
const taladro = new Producto(5,'taladro',200,'img/taladro.png');
const clavos= new Producto(6,'clavos',30,'img/clavos.png');
const pulidora = new Producto(7,'pulidora',70,'img/pulidora.png');
const llaves = new Producto(8,'llaves',120,'img/llaves.png');

//creamos array con todo nuestro catalogo de productos

const productos= [alicate,destornillador,serrucho,martillo,taladro,clavos,pulidora,llaves]

// creamos el array de carrito
let carrito = [];

// cargar carrito al local

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Modificamos el Dom mostrando los productos;
const contenedorProductos = document.getElementById('contenedorProductos');

//Creamos una funcion para mostrar los productos en stock

const mostrarProductos = ()=>{
    productos.forEach( producto =>{
        const card =document.createElement('div')
        //claslist para ver las clases en el elemento con esto le pasamos 3  clases
        card.classList.add('col-xl-3', 'col-md-6', 'col-sm-12');
        card.innerHTML = `
        <div class="card">
            <img src="${producto.img}" class="card-img-tom imgProductos" alt="">
            <div class="card-body">
                <h2>${producto.nombre}</h2>
                <p>${producto.precio}</p>
                <button class="btn colorBoton" id="boton${producto.id}">Agregar al Carrito</button>
            </div>  
        </div> `
        contenedorProductos.appendChild(card)
        
        //agregar productos al carrito
        const boton =document.getElementById(`boton${producto.id}`)
        boton.addEventListener("click",()=>{
            agregarAlCarrito(producto.id);
        })
    })
}
mostrarProductos();

//creamos la funcion agregar al carrito

const agregarAlCarrito = (id)=>{
    const productoEnCarrito = carrito.find(producto=>producto.id===id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else{
        const producto = productos.find(producto => producto.id===id);
        carrito.push(producto);
    }
    console.log(carrito);
    calcularTotal();

    //trabajamos con el localstorage

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

//mostrar el carrito de compras

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click",()=>{
    mostrarCarrito();
})

const mostrarCarrito = () =>{
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto =>{
        const card =document.createElement('div')
        //claslist para ver las clases en el elemento con esto le pasamos 3  clases
        card.classList.add('col-xl-3', 'col-md-6', 'col-sm-12');
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-tom imgProductos" alt="">
                <div class="card-body">
                    <h2>${producto.nombre}</h2>
                    <p>${producto.precio}</p>
                    <p>${producto.cantidad}</p>
                    <button class="btn colorBoton" id="eliminar${producto.id}" >Eliminar</button>
                </div>  
            </div> `
        contenedorCarrito.appendChild(card)

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", ()=>{
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

// funcion que elimina el producto del carrito
const eliminarDelCarrito = (id)=>{
    const producto=carrito.find(producto=>producto.id===id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();

    //localsotrate
    localStorage.setItem('carrito',JSON.stringify(carrito));
}

//vaciamos todo el carrito de compras.
const vaciarCarrito = document.getElementById("vaciarCarrito");
    vaciarCarrito.addEventListener("click", ()=>{
    console.log('vaciar');
    eliminarTodoElCarrito();

    //localstorage
    localStorage.setItem('carrito',JSON.stringify(carrito));
})

const eliminarTodoElCarrito = ()=>{
    carrito=[];
    mostrarCarrito();
}


// mostrar el mensaje de monto total

const total = document.getElementById('total');

const calcularTotal = ()=>{
    let totalCompra = 0;
    carrito.forEach(producto =>{
        totalCompra +=producto.precio * producto.cantidad
    })
    total.innerHTML= `total ${totalCompra}`
}

// mostrar factura de los productos seleccionados
verFacturaBtn = document.getElementById("verFactura");
verFacturaBtn.addEventListener("click", () => {
    mostrarFactura();
});

const mostrarFactura = () => {
    const factura = document.getElementById("factura");
    factura.innerHTML = ""; // Limpia el contenido actual de la factura

    carrito.forEach(producto => {
        const itemFactura = document.createElement("div");
        itemFactura.classList.add("factura-item");
        itemFactura.innerHTML = `
            <p width= 300 px>${producto.nombre}</p>
            <p>${producto.cantidad}</p>
            <p>$${producto.precio * producto.cantidad}</p>
        `;
        factura.appendChild(itemFactura);
    });

    const totalFactura = document.createElement("div");
    totalFactura.classList.add("factura-total");
    totalFactura.textContent = `Total: $${calcularTotalCompra()}`;
    factura.appendChild(totalFactura);
};

const calcularTotalCompra = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    });
    return totalCompra;
};
