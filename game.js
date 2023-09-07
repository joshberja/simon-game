var buttonColors = ["red", "blue", "green", "yellow"]; // Color patterns
var gamePattern = []; // Game pattern tracker
var userClickedPattern = []; // User click pattern tracker
var level = 0; // Start the level at 0
var started = false; // Track whether the game is on or off

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4); // Generate random number between 0 and 3
  var randomChosenColor = buttonColors[randomNumber]; // randomNumber serves as the index chosen for a button color stored in the buttonColors array

  gamePattern.push(randomChosenColor); // Add the random chosen color to the end of the gamePattern array for tracking

  var selectedButton = $("#" + randomChosenColor); // Select the button with the same id as the random chosen color
  var flashSelectedButton = $(selectedButton)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // Animate flash on the selected button

  playSound(randomChosenColor); // Play the corresponding sound of the random chosen color

  level++; // Increase the level by 1

  $("#level-title").text("Level " + level); // Update the heading to show the level increased to

  userClickedPattern = []; // Reset the user's click pattern to make it ready for the next level
}

$(".btn").click(function () { // Detect when any of the colors are clicked and trigger a handler function if clicked
  if (started === true) {
    var userChosenColor = $(this).attr("id"); // Store the id of the button clicked by the user
  
    playSound(userChosenColor); // Play the sound of the button
    animatePress(userChosenColor); // Pass through the color into the animatePress function to animate the button after the user clicks it
    userClickedPattern.push(userChosenColor); // Add the color that the user clicked into the clicked pattern array for tracking
    checkAnswer(userClickedPattern.length - 1); // Pass the user's last clicked color into the checkAnswer function to evaluate whether or not it matches up with the game's sequence
  }
});

function playSound(name) { // Function for playing the sound
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) { // Function to animate button press

  $("#" + currentColor).addClass("pressed"); // Add the CSS animation class to the button

  // Wait half a second before removing the class
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function gameToggle() { // Function to toggle the game on or off
  started = !started;
}

function startGame() { // Function to start the game
    $("h1").text("Level " + level); // Update the h1 HTML element tag to show the level the user is on
    hideStartBtn();
    nextSequence();
    gameToggle();
};

function hideStartBtn() { // Function to hide the start game button
  $(".startGameBtn").css("display", "none");
}

function showStartBtn() { // Function to show the start game button
  $(".startGameBtn").text("Restart");
  $(".startGameBtn").css("display", "inline-block");
}

$(".startGameBtn").click(function (event) { // Detect when the user clicks the start or restart button 
  if (started === false) {
    startGame();
  }
});

function checkAnswer(currentLevel) { // Function to check the user's last clicked color against the game's pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      // Wait one second before calling the nextSequence() function
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongAudio = new Audio ("./sounds/wrong.mp3"); // Play wrong sound
    wrongAudio.play();
    $("body").addClass("game-over"); // Animate the game over effect
    setTimeout(() => { // Wait a very brief moment before removing the game over effect
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over!"); // Update the title to say show game over message
    startOver(); // Call startOver() function to reset game settings
    showStartBtn();
  }
}

function startOver() { // Function to reset the game settings
  level = 0;
  gamePattern = [];
  gameToggle();
}