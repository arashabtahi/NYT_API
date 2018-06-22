
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ", " + cityStr;

    $greeting.text("So you want to live at "  + address + "?");

    var streetviewUrl = "http://maps.googleapis.com/maps/api/streetview?size=800x500&location=" + address + "";
        $body.append('<img class="bgimg" src="'+ streetviewUrl +'">');


    // load streetview

    // YOUR CODE GOES HERE!




var NYTurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr +
"$sort=newest&api-key=4791f227686d48d38f7592786fcaea5c"

$.getJSON(NYTurl, function(data){


    $nytHeaderElem.text("New York Times Article About " + cityStr);
    articles = data.response.docs;
    for(var i = 0; i <articles.length; i++){
        var article = articles[i];
        $nytElem.append('<li class="article">' +
            '<a href="'+article.web_url+'">'+article.headline.main+
            '</a>' +
            '<p>' + article.snippet+ '</p>' +
            '</li>');


    };
  })

    var wikiurl= "https://en.wikipedia.org/w/api.php?action=opensearch&search="
                  + cityStr + "&format=json&callback=wikiCallback";

    $.ajax({

        url: wikiurl,
        dataType: "jsonp",
        // jasonp: "callback",
        success : function(response) {
            var articleList= response[1];

            for (var i = 0; i < articleList.length; i++){
                articleStr = articleList[i];
                var url = "https://en.wikipedia.org/wiki/" + articleStr;
                $wikiElem.append('<li><a href="'+ url +'">' + articleStr + '</a></li>');

            };
        }
    })


return false;
};
$('#form-container').submit(loadData);