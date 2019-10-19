$.getJSON("/articles", function (data) {
    // data.foreach( couldnt use it
    for (var i = 0; i < data.length; i++) {
        
        $(".article").append("<div class=a" +
            "<p data-id=" + data[i]._id + ">" + data[i].title +
            "<br />" + data[i].link +
            "</p>" + "</div>")
    }
});

