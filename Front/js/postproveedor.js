document.getElementById("enviarProveedor").addEventListener("click", async (e) => {
    e.preventDefault();
    
    let nombre = document.getElementById("nameP").value;
    let ciudad = document.getElementById("ciudad").value;
    let direccion = document.getElementById("direccion").value;
    let tel = document.getElementById("telefono").value;
    let whats = document.getElementById("whats").value;
    let mail = document.getElementById("correo").value;

    const proveedor = [{
        "Proveedor": nombre,
        "Ciudad": ciudad,
        "Direccion": direccion,
        "Telefono": tel,
        "Whatsapp": whats,
        "Correo": mail
    }];

    let response = await fetch('http://127.0.0.1:8000/proveedors/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'text/plain'
        },
        body: JSON.stringify(proveedor)
    });
    const data = await response.json();
    
    if(data.message === "Success") {
        let alerta = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                        El proveedor ha sido ingresado correctamente.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
        document.getElementById("alerta").innerHTML = alerta;
    }
})