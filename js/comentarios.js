var comentariosArray = [];

function showComments() {

    let htmlContentToAppend = "";
    for (let i = 0; i < comentariosArray.length; i++) {
        let comentario = comentariosArray[i];
        htmlContentToAppend += `
        <div class="comment-section">
        <div class="container">
          <div class="review">
            <h2 class="R-title">Comentarios</h2>
            <div class="comment-section">

              <div class="media media-review">
                <div class="media-user"><img src="img/person-circle.svg" alt=""></div>
                <div class="media-body">
                  <div class="M-flex">
                    <h2 class="title"><span> Robert Bye </span>DD-MM-YYYY</h2>
                    <div class="rating-row">
                      <ul>
                        <li class=""><i class="fa fa-star"></i></li>
                        <li class=""><i class="fa fa-star"></i></li>
                        <li class=""><i class="fa fa-star"></i></li>
                        <li class=""><i class="fa fa-star-o"></i></li>
                        <li class=""><i class="fa fa-star-o"></i></li>
                      </ul>
                    </div>
                  </div>
                  <div id="description" class="description"> ` + comentario.description + ` </div>


                </div>
              </div>
              `
    }
    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
};



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

        }
        showComments();
    });
});