
function loadData() {
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    //alert('im an idiot');
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;
    $body.append('<img class="bgimg" src="'+ streetviewUrl +'">');

// NY Times AJAX Request
    var nyTimesAPI = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityStr+'&sort=newest&api-key=8b6c7473cfab0b880708c4e75fc5fbab:12:73858186';
    $.ajax({
        dataType: "json",
        url: nyTimesAPI,
       // data: data,
        success: function(data){
            //console.log(data);
           articles = data.response.docs;
           for (var i=0; i<articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
           }
        },
        error: function(data, error){
            $nytElem.text("New York Times Articles Not Found");
        }
    });

// Wikipedia Request

var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+cityStr+'&format=json&callback=wikiCallback';
$.ajax({
    dataType: "jsonp",
    url: wikiUrl,
    success: function(data){
        console.log(data);
        $.each(data[1], function(i,object){
            var url = data[3];
            $wikiElem.append('<a href="'+url[i]+'">'+object+'</a>');
        })
        }

})

   return false;
};

$('#form-container').submit(loadData);

