let queryStrings = new URLSearchParams(window.location.search);
let parametroUrl = Object.fromEntries(queryStrings.entries());

const url = "http://127.0.0.1:8000/products/" + parametroUrl.id


const eliminarProducto = async () => {
    const getProduct = await fetch(url);
    const data = await getProduct.json();

    const response = await fetch(url, {
        method: 'DELETE'
    });

    window.location=document.referrer;
}

window.addEventListener("load", (e) => {
    e.preventDefault();
    const confirm = window.confirm('¿Estas seguro que deseas eliminar el producto?')
    if (confirm === true ){
        eliminarProducto();
    }else (history.back())
})