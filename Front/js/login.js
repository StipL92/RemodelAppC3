document.getElementById("logear").addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let response = await fetch('http://127.0.0.1:8000/users/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type':'text/plain'
            },
            body: JSON.stringify([{
                "username": username,
                "password": password
            }])
        });
        const data = await response.json();
        let alerta = ``

        if(data.message === "Success"){
            window.location.href = "dashboard.html";
        } else {
            alerta += `
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            Los datos ingresados no son correctos.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
            `
            document.getElementById("alerta").innerHTML = alerta;
        };
})