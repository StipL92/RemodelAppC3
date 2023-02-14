let queryStrings = new URLSearchParams(window.location.search);
let parametroUrl = Object.fromEntries(queryStrings.entries());

const url = "http://127.0.0.1:8000/products/" + parametroUrl.id

const listarProveedores = async () => {
    const response = await fetch('http://127.0.0.1:8000/proveedors/');
    const data = await response.json();

    let listProveedors = ``
    data.proveedors.forEach(proveedor => {
        listProveedors += `
        <option value="${proveedor.Id_Proveedor}">${proveedor.Proveedor}</option>`
    });
    document.getElementById("proveedor").innerHTML = listProveedors
}


const listarProducto = async () => {
    const response = await fetch(url)
    const data = await response.json();
    
    document.getElementById("name").value = data.products.Producto
    document.ready = document.getElementById("categoria").value = data.products.Id_Categoria_id
    document.ready = document.getElementById("proveedor").value = data.products.Id_Proveedor_id
    document.getElementById("valor").value = data.products.Valor
    document.getElementById("color").value = data.products.Color
    document.getElementById("tipo").value = data.products.Tipo_Material
    document.getElementById("urlImagen").value = data.products.URL
}

document.getElementById("actualizar").addEventListener("click", async (e) => {
    e.preventDefault();

    let nombre = document.getElementById("name").value;
    let categoria = document.getElementById("categoria").value;
    let proveedor = document.getElementById("proveedor").value;
    let valor = document.getElementById("valor").value;
    let color = document.getElementById("color").value;
    let tipo = document.getElementById("tipo").value;
    let urlImagen = document.getElementById("urlImagen").value;

    const producto = [{
        "Producto": nombre,
        "Id_Categoria_id": categoria,
        "Id_Proveedor_id": proveedor,
        "Valor": valor,
        "Color": color,
        "Tipo_Material": tipo,
        "URL": urlImagen
    }];

    let response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type':'text/plain'},
        body: JSON.stringify(producto)
    });

    const data = await response.json();
    
    if(data.message == "Success"){
        let alerta = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            El producto se ha actualizado correctamente.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `
        document.getElementById("alerta").innerHTML = alerta;
    }
})

document.getElementById("volver").addEventListener("click", (e) => {
    e.preventDefault();
    window.location=document.referrer;
})


window.addEventListener("load", (e) => {
    e.preventDefault();
    listarProducto();
    listarProveedores();
})