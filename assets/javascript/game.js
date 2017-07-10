// Begin White Belt Javascript / Jquery

// Begin Document
$( document ).ready(function() {

// My Array of Kevin's
var topics = ["Kevin Hart", "Kevin Costner", "Kevin Kline", "Kevin Bacon", "Kevin Smith", 
               "Kevin Pollak", "Kevin James", "Kevin Sorbo", "Kevin Spacey", "Kevin Dillon"];

// Button Display
function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gifButtonsView").append(gifButton);
    }
}

// Function to add a new action button
function addNewButton(){
    $("#addGif").on("click", function(){
    var action = $("#topics-input").val().trim();
    $("#topics-input").val("");
    if (action == ""){
      return false; 
    }
    topics.push(action);
    displayGifButtons();
    return false;
    });
}

// Displays Gif's
function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); 
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty();
        var results = response.data;
        if (results == ""){
          alert("There isn't a Giphy for this button");
        }
        for (var i=0; i<results.length; i++){
            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsView").append(gifDiv);
        }
    });
}

// Calling Functions
displayGifButtons();
addNewButton();
 
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});