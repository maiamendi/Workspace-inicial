//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login").addEventListener('submit', validarForm);
  });



  function validarForm(evento) {
    evento.preventDefault();
    var usuario = document.getElementById('usuario').value;
    if(usuario.length == 0) {
      alert('El campo usuario no puede estar vacío');
      return;
    }
    var password = document.getElementById('password').value;
    if (password.length == 0) {
      alert('El campo contraseña no puede estar vacío');
      return;
    }
    //guardo usuario
    localStorage.setItem('usuario', document.getElementById('usuario').value);
    window.location.href = "./home.html";
  }



