const ORDER_ASC_BY_COST = "Menor precio";
const ORDER_DESC_BY_COST = "Mayor precio";
const ORDER_BY_PROD_SOLD = "Relevancia";
var currentProductsArray = [];
var currentSortProdCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLD) {
        result = array.sort(function (a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if (aSold > bSold) {
                return -1;
            }
            if (aSold < bSold) {
                return 1;
            }
            return 0;
        });
    }

    return result;
}


function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">

                        <h4 class="mb-1">` + product.name + `</h4>

                        <small class="text-muted">` + product.soldCount + ` vendidos</small>

                      </div>

                      <p class="mb-1">` + product.description + `</p>
                      <br>
                      <br>
                       <h5 class= "text-right">` + product.currency + ` ` + product.cost + `  </h5>
                  </div>

            </div>

        </div>
        `

        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}


function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortProdCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortProdCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("menorPrecio").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("mayorPrecio").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("relevancia").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilterProd").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMinProd").value = "";
        document.getElementById("rangeFilterCountMaxProd").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterProd").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio

        minCount = document.getElementById("rangeFilterCountMinProd").value;
        maxCount = document.getElementById("rangeFilterCountMaxProd").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showProductsList();
    });
});