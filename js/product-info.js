var product = [];
var listaProductos = [];


function showImgGallery(array) {

  let htmlContentToAppend = "";

  htmlContentToAppend += `
    <div class="carousel-item active">
      <img class="d-inline w-80" src=${array[0]} alt="First slide">
    </div>
    `
  for (let i=1; i < array.length; i++) {
    htmlContentToAppend += `
    <div class="carousel-item">
      <img class="d-inline w-80" src=${array[i]} alt="First slide">
    </div>
    `
  }
  
  document.getElementById("carrusel").innerHTML = htmlContentToAppend;
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

};


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
    user: localStorage.getItem("usuario")
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
      

      //Muestro productos relacionados desde products_url
      let relatedProduct = product.relatedProducts;

      getJSONData(PRODUCTS_URL).then(function (resultObj2) {
         if (resultObj2.status === "ok") {
          listaProductos = resultObj2.data;
          let htmlContentToAppend = "";
          for (let i = 0; i < relatedProduct.length; i++) {
            let productoRelacionado = listaProductos[relatedProduct[i]]
            htmlContentToAppend +=`
            <div class="container mb-3">
            <div class="card" style="width: 12rem;">
          <img src="${productoRelacionado.imgSrc}" class="card-img-top mt-3" alt="imagen auto">
          <div class="card-header">${productoRelacionado.currency + " " + productoRelacionado.cost} </div>
          <div class="card-body">
          <h4 class="card-title">${productoRelacionado.name}</h4>
            <p class="card-text"> ${productoRelacionado.description}</p>
            <a href="product-info.html" class="btn btn-primary">Ver artículo</a>
            
          </div>
        </div>
        </div>
        
      `
          }
        
         document.getElementById("relatedProducts").innerHTML += htmlContentToAppend;
          
        }});
           


      //Muestro las imagenes en forma de carrusel
      showImgGallery(product.images);
      }});

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentariosArray = resultObj.data;

      //Muestro los comentarios
      showCommentarios(comentariosArray);
    }
  });


});