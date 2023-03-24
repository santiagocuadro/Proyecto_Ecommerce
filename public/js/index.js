


const agregar = async (e) => {
	e.preventDefault();
	
	//cartId ? => tengo que ver la forma de traer el id del carrito del usuario logeado 
	const res = await fetch(`/api/carrito/${cart}/productos`, { method: "POST" });
	
	window.location.replace("/home");

}

const btnAgregar = document.getElementById("btnAgregar");

btnAgregar.onclick = agregar;



