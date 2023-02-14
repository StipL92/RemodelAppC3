let queryStrings = new URLSearchParams(window.location.search);
let parametroUrl = Object.fromEntries(queryStrings.entries());

const url = "http://127.0.0.1:8000/proveedors/" + parametroUrl.id;

const listarProveedor = async () => {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("nameP").value = data.proveedors.Proveedor;
    document.getElementById("ciudad").value = data.proveedors.Ciudad;
    document.getElementById("direccion").value = data.proveedors.Direccion;
    document.getElementById("telefono").value = data.proveedors.Telefono;
    document.getElementById("whats").value = data.proveedors.Whatsapp;
    document.getElementById("correo").value = data.proveedors.Correo;
}

document.getElementById("enviarProveedor").addEventListener("click", async (e) => {
    e.preventDefault();

    let nombre = document.getElementById("nameP").value;
    let ciudad = document.getElementById("ciudad").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let whats = document.getElementById("whats").value;
    let mail = document.getElementById("correo").value;

    let proveedor = [{
        "Proveedor": nombre, 
        "Ciudad": ciudad, 
        "Direccion": direccion, 
        "Telefono": telefono, 
        "Whatsapp": whats, 
        "Correo": mail
    }]

    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type':'text/plain'},
        body: JSON.stringify(proveedor)
    })
    const data = await response.json();

    if(data.message == "Success"){
        let alerta = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            Información del proveedor actualizada correctamente.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `
        document.getElementById("alerta").innerHTML = alerta;
    }
})

window.addEventListener("load", () => {
    listarProveedor();
})

