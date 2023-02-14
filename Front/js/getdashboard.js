let queryStrings = new URLSearchParams(window.location.search);
let parametroUrl = Object.fromEntries(queryStrings.entries());

const tituloCategoria = (id) => {
    switch(id){
        case "1":
            document.getElementById("tituloCategoria").innerHTML = "LISTAR PRODUCTOS POR CATEGORIA - BAÑO"
            break;
        case "2":
            document.getElementById("tituloCategoria").innerHTML = "LISTAR PRODUCTOS POR CATEGORIA - CARPINTERIA"
            break;
        case "3":
            document.getElementById("tituloCategoria").innerHTML = "LISTAR PRODUCTOS POR CATEGORIA - COCINA"
            break;
        case "4":
            document.getElementById("tituloCategoria").innerHTML = "LISTAR PRODUCTOS POR CATEGORIA - PINTURA"
            break;
        case "5":
            document.getElementById("tituloCategoria").innerHTML = "LISTAR PRODUCTOS POR CATEGORIA - PISO"
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
    
    let producsTable = ``;
    categoriaActiva.forEach((product) => {

        let proveedores = dataProveedor.proveedors.filter(function(element){
            return element.Id_Proveedor == product.Id_Proveedor_id;
        });

        producsTable += `<tr>
                <td>${product.Producto}</td>
                <td>${proveedores[0].Proveedor}</td>
                <td>${product.Valor}</td>
                <td>${product.Color}</td>
                <td>${product.Tipo_Material}</td>
                <td><a href="editarproducto.html?id=${product.Id_ProductoIngresado}"><i class="material-icons">edit</i></a></td>
                <td><a href="eliminarproducto.html?id=${product.Id_ProductoIngresado}"><i style="color:#eb4034;" class="material-icons">delete</i></a></td>
            </tr>
        `
        
    })
    document.getElementById("productos").innerHTML = producsTable;
}

const listProveedores = async () => {
    const response = await fetch('http://127.0.0.1:8000/proveedors/')
    const data = await response.json();

    tablaProveedores = ``;
    data.proveedors.forEach((proveedor) => {
        tablaProveedores += `
                            <tr>
                                <td>${proveedor.Proveedor}</td>
                                <td>${proveedor.Ciudad}</td>
                                <td>${proveedor.Direccion}</td>
                                <td>${proveedor.Telefono}</td>
                                <td>${proveedor.Whatsapp}</td>
                                <td>${proveedor.Correo}</td>
                                <td><a href="dashboardeditarproducto.html?id=${proveedor.Id_Proveedor}"><i class="material-icons">edit</i></a></td>
                                <td><a href="eliminarproveedor.html?id=${proveedor.Id_Proveedor}"><i style="color:#eb4034;" class="material-icons">delete</i></a></td>
                            </tr>
        `
    });

    document.getElementById("proveedores").innerHTML = tablaProveedores;
}

window.addEventListener("load", () => {
    tituloCategoria(parametroUrl.id);
    listProducts(parametroUrl.id);
    listProveedores();
})
