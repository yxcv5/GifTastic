    var topics = ["Happiness", "Life", "Friendship", "Wealth", "Health", "Travel", "Time", "Prejudice", 
                  "Hatred", "Love", "Jealousy", "Truth", "Parenthood", "Children", "Success", "Failure"];
    var gallery = [];

      function renderButtons() {

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
          var a = $("<button class='btn-info btn-md'>").addClass("topic");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#buttons").append(a);
        }
      }

      function displayGallery() {
      	var topicName = $(this).attr("data-name");
      	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=quote+" + 
      	                topicName;

      	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          gallery = response.data;
          $("#gallery").empty();
          for(var i=0; i<gallery.length; i++) {
             var imgDiv = $("<div class='imgDiv'>");
             var galleryImage = $("<img class='gif'>").attr("src", gallery[i].images.fixed_height_still.url);
             galleryImage.attr("data-still", gallery[i].images.fixed_height_still.url);
             galleryImage.attr("data-animate", gallery[i].images.fixed_height.url);
             galleryImage.attr("data-state", "still");
             var rating = $("<h4>").text("Rating: " + gallery[i].rating);
             imgDiv.append(rating, galleryImage);
             $("#gallery").append(imgDiv);
          }
        });
      }

      function animateGif() {
         var state = $(this).attr("data-state");
         if(state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
         }
         else if(state === "animate") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");  
         }
      }

      $("#add-topic").on("click", function(event) {
          event.preventDefault();
          var newTopic = $("#topic-input").val().trim();
          topics.push(newTopic);
          renderButtons();
          $("#topic-input").val("");
      });

      $(document).on("click", ".topic", displayGallery);
      $(document).on("click", ".gif", animateGif);
      renderButtons();

