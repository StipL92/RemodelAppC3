let queryStrings = new URLSearchParams(window.location.search);
let parametroUrl = Object.fromEntries(queryStrings.entries());

const nombreCategorias = (id) => {
    switch(id){
        case "1":
            document.getElementById("tituloCategoria").innerHTML = "PRODUCTOS DISPONIBLES - BAÑO"
            break;
        case "2":
            document.getElementById("tituloCategoria").innerHTML = "PRODUCTOS DISPONIBLES - CARPINTERIA"
            break;
        case "3":
            document.getElementById("tituloCategoria").innerHTML = "PRODUCTOS DISPONIBLES - COCINA"
            break;
        case "4":
            document.getElementById("tituloCategoria").innerHTML = "PRODUCTOS DISPONIBLES - PINTURA"
            break;
        case "5":
            document.getElementById("tituloCategoria").innerHTML = "PRODUCTOS DISPONIBLES - PISO"
            break;
    }
}

const listProducts = async (id) => {
    
    const response = await fetch("http://127.0.0.1:8000/products/");
    const productos = await response.json();
    
    const response2 = await fetch("http://127.0.0.1:8000/proveedors/");
    const dataProveedor = await response2.json();

    let categoriaActiva = productos.products.filter(function(idCategoria){
        return idCategoria.Id_Categoria_id == id;
    })
    
    let bodyProductos = ``;
    categoriaActiva.forEach((product) => {

        let proveedores = dataProveedor.proveedors.filter(function(element){
            return element.Id_Proveedor == product.Id_Proveedor_id;
        });
        
        bodyProductos += `
        <div class="productos mt-4 mb-4">
            <img src="${product.URL}" alt="Imagen del producto">
            <h6 class="proveedor mt-1">${proveedores[0].Proveedor}</h6>
            <h4 class="tituloproducto">${product.Producto}</h4>
            <h4 class="descripcionproducto">${pesoCop.format(product.Valor)}</h4>
            <h4 class="descripcionproducto">Color: ${product.Color}</h4>
            <h4 class="descripcionproducto">Material: ${product.Tipo_Material}</h4>
            <button type="button" class="contactoproveedor" data-toggle="modal" data-target="#exampleModal${product.Id_ProductoIngresado}">CONTACTAR PROVEEDOR</button>
        </div>
        
        <div class="modal fade" id="exampleModal${product.Id_ProductoIngresado}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><strong>${proveedores[0].Proveedor.toUpperCase()}</strong></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <div class="modal-body" id="cuerpoProveedor">
                    <p><strong>DIRECCIÓN:</strong> ${proveedores[0].Direccion.toUpperCase()}</p>
                    <p><strong>CIUDAD:</strong> ${proveedores[0].Ciudad.toUpperCase()}</p>
                    <p><strong>CORREO:</strong> ${proveedores[0].Correo}</p>
                    <p><strong>TELEFONO:</strong> ${proveedores[0].Telefono.toUpperCase()}</p>
                    <p><strong>WHATSAPP:</strong> ${proveedores[0].Whatsapp.toUpperCase()}</p>
                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <a href="mailto:${proveedores[0].Correo}"><button type="button" class="btn btn-primary"><i class="fa fa-envelope-o"></i></button></a>
                        <a target="_blank" href="https://api.whatsapp.com/send?phone=+57${proveedores[0].Whatsapp}&text=Hola%20${proveedores[0].Proveedor},%20necesito%20informaci%C3%B3n%20sobre%20un%20producto"><button type="button" class="btn btn-success"><i class="fa fa-whatsapp"></i></button></a>
                    </div>
                </div>
            </div>
        </div>`
    })
    document.getElementById("productos").innerHTML = bodyProductos;
}

const pesoCop = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
})

window.addEventListener("load", function (){
    listProducts(parametroUrl.id);
    nombreCategorias(parametroUrl.id);
})