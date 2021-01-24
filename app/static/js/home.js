$(document).on("click", "#search", function () {
    search($('#type').val(), $('#name').val());
});

$(document).ready(function () {
    search($('#type').val(), $('#name').val());
});

function search(type, name) {
    $.get({
        url: "/search",
        data: {type, filters: {name}},
        success: function (data) {
            let result = JSON.parse(data);
            if (result.errNo === 0) {
                if (result.response.length === 0) {
                    $(".cards").html(`<h2 style="margin-left: 10px;">К сожалению ничего не найдено...<label for="name"><span class="badge badge-secondary" style="margin-left: 15px; cursor: pointer">Попробуйте другой запрос</span></label></h2>`);
                    return;
                }
                $(".cards").html("");
                result.response.forEach(res => {
                    $(".cards").append(createCard({name: res.name, description: res.description, type:res.queryType, id:res.id}));
                });
            }
        },
    });
}

function relocateTo(path) {
    window.location.replace(path);
}

function createCard(params) {
    return `
        <div class="col-md-4 card-wrap">
          <div class="card mb-4 shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">${params.name}</text></svg>
            <div class="card-body">
              <p class="card-text">${params.description || ""}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" onclick='relocateTo("/${params.type}/${params.id}")' class="btn btn-sm btn-outline-secondary">Просмотреть</button>
                  <!--<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>-->
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
    `;
}