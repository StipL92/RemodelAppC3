const listarProveedores = async () => {

    const resProveedors = await fetch('http://127.0.0.1:8000/proveedors/');
    const dataProveedors = await resProveedors.json();

    let proveedores = `<option value="">SELECCIONE EL PROVEEDOR</option>`
    dataProveedors.proveedors.forEach(proveedor => {
        proveedores += `
        <option value="${proveedor.Id_Proveedor}">${proveedor.Proveedor}</option>`
    });

    document.getElementById("proveedor").innerHTML = proveedores;
}

window.addEventListener("load", function(){
    listarProveedores();
})

document.getElementById("enviar").addEventListener("click", async (e) => {
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
    }]

    let response = await fetch('http://127.0.0.1:8000/products/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type':'text/plain'
            },
            body: JSON.stringify(producto),
        });

    const data = await response.json();
    console.log(data);

    if(data.message = "Success"){
        let alerta = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            Producto agregado correctamente.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>`
        document.getElementById("alerta").innerHTML = alerta;
    }
})

document.getElementById("volver").addEventListener("click", (e) => {
    e.preventDefault();
    window.location=document.referrer;
})