var product = {};


//Función que toma las imagenes del array y las muestra en forma de carrusel
function showImgGallery(array) {

  let htmlContentToAppend = "";

  htmlContentToAppend += `
     <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" data-interval="2000">
     <div class="carousel-inner">
       <div class="carousel-item active">
         <img class="d-inline w-75" src=${array[0]} alt="First slide">
       </div>
       <div class="carousel-item">
         <img class="d-inline w-75" src=${array[1]} alt="Second slide">
       </div>
       <div class="carousel-item">
         <img class="d-inline w-75" src=${array[2]} alt="Third slide">
       </div>
       <div class="carousel-item">
         <img class="d-inline w-75" src=${array[3]} alt="Third slide">
       </div>
     </div>
   </div>
        `

  document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}

// Función para dibujar estrellas
function drawStars(stars) {

  let number = parseInt(stars);
  let html = "";
  for (let i = 1; i <= number; i++) {
    html += `<span class="fa fa-star checked"></span>`

  }
  for (let j = number + 1; j <= 5; j++) {
    html += `<span class="fa fa-star-o"></span>`
  }
  return html;

}


//Función que muestra los comentarios desde el array
var comentariosArray = [];

function showCommentarios(array) {

  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let comentario = array[i];
    htmlContentToAppend +=
      ` 
    <div class = "mb-4 pb-4 border-bottom">
  <div class = "d-flex mb-3 align-items-center">
  <img src = "img/usuario.png" alt = ""  class="avatar rounded-circle" width="50" height="50">
  <div class = "ml-2">
  <h5 class = "mb-1">   ` + comentario.user + ` </h5>
  <p class = "font-12 mb-0"> <span> ` + comentario.dateTime + ` </span> </p> 
  </div> 
  </div> 
  <div class = "mb-2">
  <span class = "font-14 mr-2"> 
  ${drawStars(comentario.score)}
  </span >
  </div> 
  <p> ` + comentario.description + ` </p>
  </div>
  </div>
  
  `
  }
  document.getElementById("comentarios").innerHTML = htmlContentToAppend;
};

//Función para guardar los comentarios con el mismo formato 
//que tienen los ya dados
var comments = [];

function saveComment() {
  let date = new Date();
  let formatDate = date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0') + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  comment = {
    message: document.getElementById("textarea").value,
    completeDate: formatDate,
    score: document.getElementById("score").value,
    user: localStorage.getItem("user")
  }

  comments.unshift(comment);
  showComment();
}


//Función que muestra el comentario guardado
function showComment() {
  let html = ""
  for (let i = comments.length - 1; i >= 0; i--) {
    let comentario = comments[i];
    html += `
        <div class = "mb-4 pb-4 border-bottom">
        <div class = "d-flex mb-3 align-items-center">
        <img src = "img/usuario.png" alt = ""  class="avatar rounded-circle" width="50" height="50">
        <div class = "ml-2">
        <h5 class = "mb-1">   ` + comment.user + ` </h5>
        <p class = "font-12 mb-0"> <span> ` + comment.completeDate + ` </span> </p> 
        </div> 
        </div> 
        <div class = "mb-2">
        <span class = "font-14 mr-2"> 
        ${drawStars(comment.score)}
        </span >
        </div> 
        <p> ` + comment.message + ` </p>
        </div>
        </div>
         `


  }
  document.getElementById("comentarios").innerHTML += html;
  document.getElementById("formulario").reset();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;

      //Muestro la información del producto

      let productNameHTML = document.getElementById("productName");
      let productDescriptionHTML = document.getElementById("productDescription");
      let productCategoryHTML = document.getElementById("productCategory");
      let productSoldHTML = document.getElementById("productSold");
      let productCostHTML = document.getElementById("productCost");


      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCategoryHTML.innerHTML = product.category;
      productSoldHTML.innerHTML = product.soldCount;
      productCostHTML.innerHTML = product.currency + " " + product.cost;


      //Muestro las imagenes en forma de carrusel
      showImgGallery(product.images);
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentariosArray = resultObj.data;

      //Muestro los comentarios
      showCommentarios(comentariosArray);
    }
  });
});