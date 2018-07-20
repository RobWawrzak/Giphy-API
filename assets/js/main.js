$(document).ready(function() {
  // An array of actions, new actions will be pushed into this array;
  var actions = [
    'Dance',
    'Fall',
    'Jog',
    'Reading',
    'Pushing',
    'Swim',
    'Eat',
    'Skipping',
    'Cry',
    'Wink',
    'Running',
    'Strolling',
    'Singing'
  ];
  // Creating Functions & Methods
  // Function that displays all gif buttons
  function displayGifButtons() {
    $('#gifButtons').empty(); // pre-clear on page load
    for (var i = 0; i < actions.length; i++) {
      var gifButton = $('<button>');
      gifButton.addClass('action');
      gifButton.addClass('btn btn-primary');
      gifButton.attr('data-name', actions[i]);
      gifButton.text(actions[i]);
      $('#gifButtons').append(gifButton);
    }
  }

  // Function to add a new action button
  function addNewButton() {
    $('#addGif').on('click', function() {
      var action = $('#action-input')
        .val()
        .trim();
      if (action == '') {
        return false; // added so user cannot add a blank button
      }
      actions.push(action);

      displayGifButtons();
      return false;
    });
  }

  //Function that displays all of the gifs

  function displayGifs() {
    var action = $(this).attr('data-name');

    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      action +
      '&api_key=CK7TeDVG1uZu3mjxTo2b8PIbqzkQY4wI&limit=10';
    console.log(queryURL);

    $.ajax({
      contentType: 'application/json; charset=utf-8',
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
      var results = response.data; //shows results of gifs
      console.log(results);
      if (results == '') {
        alert("There isn't anything to show for this option");
      }
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $('<div>');
        gifDiv.addClass('gifDiv');
        var gifRating = $('<p>').text('Rating:' + results[i].rating);
        gifDiv.append(gifRating);
        var gifImage = $('<img>');
        gifImage.attr('src', results[i].images.fixed_height_small_still.url); //src of still image
        gifImage.attr(
          'data-still',
          results[i].images.fixed_height_small_still.url
        );
        gifImage.attr('data-animate', results[i].images.fixed_height_small.url);
        gifImage.attr('data-state', 'still'); //set the image state
        gifImage.addClass('image');
        gifDiv.append(gifImage); //pulling still image of gifImage
        $('#gifsView').prepend(gifDiv);
      }
    });
  }
  // $('.action').click(displayGifs);
  $(document).on('click', '.action', displayGifs);
  displayGifButtons();
  addNewButton();
});
