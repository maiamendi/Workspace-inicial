const CART_INFO_DESAF = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

let productosCarrito = [];
let total_final = "Total: USD "
let DOLLAR_SYMBOL = "USD "
let PERCENTAGE_SYMBOL = '%';
let porcentajeEnvio = 0.15;

//muestra los productos y los subtotales segun el valor del input
function showCarrito() {
  //inicializo el id en 0
  let index = 0;
  let htmlToAppend = "";
  for (let article of productosCarrito) {
    //igualo el id al numero de index en el json, así cada producto tiene su propio id
    id = index;
    //paso todo a USD para unificar monedas
    if (article.currency == "UYU") {
      article.unitCost = parseFloat(article.unitCost / 40);
    };
    let subtotal = parseFloat(article.count * article.unitCost);
    htmlToAppend += `
        <tr>
          <td>
            <div class="row">
              <div class="col-md-4 text-left">
                <img src=${article.src} alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow">
              </div>
              <div class="col-md-8 text-left mt-sm-2">
                <h5> ${article.name} </h5>
              </div>
            </div>
          </td>
          <td></td>
          <td class="text-center fuente-precio"> USD ${article.unitCost}</td>
          <td></td>
          <td>
            <input type="number" class="form-control form-control-md text-center" min="1" value=${article.count} onChange="updateProductoSubtotal(this.value, ${article.unitCost},${id})">
          </td>
          <td></td>
          <td class="text-right fuente-precio">USD</td>
          <td id="${id}"class="fuente-precio subtotal">${subtotal}</td>
          <td class="actions">
            <div class="text-left">
              <button class="btn btn-white border-secondary bg-white btn-sm mb-2">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
    `
    index++;
  }

  document.getElementById("shoppingCart").innerHTML += htmlToAppend;
};


//muestra el subtotal del producto al modificar la cantidad del mismo - función que uso en el onChange
function updateProductoSubtotal(cantidad, costo, id) {
  if (cantidad > 0) {
    document.getElementById(id).innerHTML = parseFloat(cantidad * costo);
    updateTotalCosts();
  } else {
    //creo una alerta para cuando la cantidad es menor a 1
    alert("La cantidad debe ser mayor o igual a 1")
  };
};



//muestro subtotal, porcentaje de envío y costo total
function updateTotalCosts() {
  let subtotalFinal = 0;
  let subtotales = document.getElementsByClassName("subtotal");
  for (let sub of subtotales) {
    subtotalFinal += parseFloat(sub.innerHTML);
  }
  document.getElementById("subTotalFinal").innerHTML = DOLLAR_SYMBOL + subtotalFinal;

  let porcentajeEnvioHTML = document.getElementById("porcentajeEnvio");
  let totalCostHTML = document.getElementById("totalCost");

  let porcentajeEnvioToShow = DOLLAR_SYMBOL + Math.round((porcentajeEnvio * subtotalFinal));
  let totalCostToShow = DOLLAR_SYMBOL + (Math.round((subtotalFinal * porcentajeEnvio * 100) / 100) + subtotalFinal);

  porcentajeEnvioHTML.innerHTML = porcentajeEnvioToShow;
  totalCostHTML.innerHTML = totalCostToShow;
};








//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_DESAF).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productosCarrito = resultObj.data.articles;

      showCarrito();
      updateTotalCosts();
    }
  });

//hace la cuenta del costo de envío y el total según el porcentaje del tipo de envío seleccionado
  document.getElementById("envioPremium").addEventListener("change", function () {
    porcentajeEnvio = 0.15;
    updateTotalCosts();
  });

  document.getElementById("envioExpress").addEventListener("change", function () {
    porcentajeEnvio = 0.07;
    updateTotalCosts();
  });

  document.getElementById("envioStandard").addEventListener("change", function () {
    porcentajeEnvio = 0.05;
    updateTotalCosts();
  });
});