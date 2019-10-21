$.getJSON("/articles", function (data) {
    // data.foreach( couldnt use it
    for (var i = 0; i < data.length; i++) {

        if (!data[i].savedState) {

            $("#article").append("<div class=article>" +
                "<h2 data-id=" + data[i]._id + ">" +
                data[i].title + "</h2>" +
                "<br />" + "<a href=" + data[i].link + ">" + "→" + "</a>" +
                + "</div>"
            )
            $("#article").append("<div class=test" + "</div>")
        }
    }
});

$(document).on("click", "h2", function () {
    $("#comments").empty();

    var theId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + theId
    })
        .then(function (data) {
            console.log(data);
            $("#comments").append("<h3>" + data.title + "</h3>");
            $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");
            $("#comments").append("<p>" + data.comment + "</p>");
            // if (data.comment) {
            //     $("#bodyinput").val(data.comment);
                
            // }
            console.log(data.comment + "the comment");
        });
});

$(document).on("click", "#savecomment", function () {
    var theId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + theId,
        data: {
            title: $("#bodyinput").val()
        }
    })
        .then(data => {
            console.log(data);
            $("#comments").empty();
        });
    $("#bodyinput").val("");
});