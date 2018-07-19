$(document).ready(function() {
  // alert('worked');

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

  var queryURL =
    'https://api.giphy.com/v1/gifs/translate?api_key=CK7TeDVG1uZu3mjxTo2b8PIbqzkQY4wI&s=Apple';

  $.ajax({
    contentType: 'application/json; charset=utf-8',
    url: queryURL,
    method: 'GET',
    async: true,
    dataType: 'json',
    success: function(data) {
      console.log(data);
    },
    error: function(data1) {
      console.log(data1);
    }
  });

  displayGifButtons();
  addNewButton();
});
