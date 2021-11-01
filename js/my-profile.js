//creo constantes para los datos de input según id
const nombresInput = document.getElementById("nombres");
const apellidosInput = document.getElementById("apellidos");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("tel");
const edadInput = document.getElementById("edad");

const user_key = "user"; //constante para la clave de usuario del local storage

//funcion que guarda los datos de los inputs en el localStorage como un string con el JSON.stringify
function guardarDatosUsuario(data) {
  let usuario = JSON.stringify(data);
  localStorage.setItem(user_key, usuario);
  alert("Información guardada correctamente");
}

//creo un objeto usuario que contendrá todos los datos del input 
//y luego los guardo en el local storage con la funcion guardarDatosUsuario()
//esta función la aplico en el botón "guardar" con un onClick en el HTML
function objetoUsuario() {
  let usuario = {
    nombres: nombresInput.value,
    apellidos: apellidosInput.value,
    email: emailInput.value,
    tel: telInput.value,
    edad: edadInput.value
  }
  guardarDatosUsuario(usuario)
}

//recupero datos de input desde el local storage
function recuperarDatosUsuario(key) {
  return localStorage.getItem(key);
}

//borro los datos del local storage 
//esta función la aplico en el botón "limpiar" con un onClick en el HTML
function borrarDatosUsuario(key) {
  localStorage.removeItem(key);

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  let user = recuperarDatosUsuario(user_key); //traigo datos de usuario desde local storage
  if (user != null) { //si el local storage no está vacío lo cargo con los datos de usuario
    user = JSON.parse(user); //como los había guardado como string, uso el JSON.parse para pasarlo a objeto js
    //completo los campos de los inputs con la información del local storage
    nombresInput.value = user.nombres;
    apellidosInput.value = user.apellidos;
    emailInput.value = user.email;
    telInput.value = user.tel;
    edadInput.value = user.edad;
  }

});