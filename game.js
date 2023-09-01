// --- Steps 1-6 - Create A New Pattern ---
// --- Steps 7-9 - Show the Sequence to the User with Animation and Sounds ---
// --- Steps 10-13 - Check Which Button is Pressed ---
// --- Steps 14-16 - Add Sounds to Click Buttons ---
// --- Steps 17-18 - Add Animations to User Clicks ---
// --- Steps 19-23 - Start the Game ---
// --- Steps 24-28 - Check the User's Answer Against the Game Sequence ---
// --- Steps 29-31 - Game Over ---
// --- Steps 32-34 - Restart the Game ---

// 3) We need to create a "buttonColors" array and set it to hold the color sequence: "red", "blue", "green", "yellow".
var buttonColors = ["red", "blue", "green", "yellow"];
console.log("buttonColors: " + buttonColors);

// 5) We need to create an empty "gamePattern" array to track the button color pattern throughout the game.
var gamePattern = [];

// 12) We need to create an empty "userClickedPattern" array to track the user's click pattern throughout the game.
var userClickedPattern = [];

// 1) We need to create a "nextSequence" function.
function nextSequence() {
  // 2) Inside, we need to capture the sequence that generates a random number between 0 and 3, then store it in a "randomNumber" variable.
  var randomNumber = Math.floor(Math.random() * 4);
  console.log("randomNumber: " + randomNumber);

  // 4) We need to create a "randomChosenColor" variable and use the "randomNumber" from step 2 to select a random color from the "buttonColors" array.
  var randomChosenColor = buttonColors[randomNumber];
  console.log("randomChosenColor: " + randomChosenColor);

  // 6) We need to add the "randomChosenColor" generated in step 4 to the end of the "gamePattern" array.
  gamePattern.push(randomChosenColor);
  console.log("gamePattern: " + gamePattern);

  // 7) Use jQuery to select the button with the same id as the randomChosenColor
  var selectedButton = $("#" + randomChosenColor);
  // console.log("selectedButton: " + selectedButton);

  // 8) Use jQuery to animate a flash to the button selected in step 7
  var flashSelectedButton = $(selectedButton)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // 9) Play the sound for the button color selected in step 7
  //   var audioSequence = new Audio("./sounds/" + randomChosenColor + ".mp3");
  //   audioSequence.play();
  //   console.log(audioSequence.play());
  //   function makeSound(key) {
  //     $("#" + key).click(function() {
  //         var audio = new Audio("./sounds/" + randomChosenColor + ".mp3')");
  //     });
  //     return audio.play();
  //   };
  // 16) Refactor the code in playSound() function so that it will work for both playing sound when the computer chooses the next color in nextSequence() function, and when a user clicks a button
  playSound(randomChosenColor);

  // 22) Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  // ++level;
  // console.log("Level prefix increment: " + level);
  level++;
  console.log("Level postfix increment: " + level);

  // 23) Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  // 28) Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  // console.log(userClickedPattern);
}

// 10) Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  // 11) Inside the handler, create a "userChosenColor" variable to store the id of the button that got clicked.
  var userChosenColor = $(this).attr("id");
  console.log("userChosenColor: " + userChosenColor);

  // Button click event (uncomment this and passthrough "event" into the anonymous function)
  // var btnClickEvent = event;
  // console.log(btnClickEvent);
  // console.log("btnClickEvent object: " + btnClickEvent);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  // 13) Add the contents of the "userChosenColor" variable created in step 11 to the end of the "userClickedPattern" array in step 12.
  userClickedPattern.push(userChosenColor);
  console.log("userClickedPattern: " + userClickedPattern);

  // Convert gamePattern and userClickedPattern arrays to strings
  // gamePattern = JSON.stringify(gamePattern);
  // userClickedPattern = JSON.stringify(userClickedPattern);
  // console.log("gamePattern array data type: " + typeof gamePattern);
  // console.log("userClickedPattern array data type: " + typeof userClickedPattern);
  // console.log("Does the game sequence and user click pattern match?" + gamePattern === userClickedPattern);
  // console.log(JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern));

  // var compareArrays = (userClickedPattern, gamePattern) => {
  //   for (var i = 0; i < userClickedPattern.length; i++) {
  //     if (userClickedPattern[i] !== gamePattern[i]) {
  //       console.log("The array elements don't match");
  //       return false;
  //     } else true;
  //   }
  //   compareArrays();
  // };

  // 25) Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence. https://flexiple.com/javascript/get-last-array-element-javascript/
  // console.log(userClickedPattern.length - 1);
  checkAnswer(userClickedPattern.length - 1);
});

// What the "this" keyword does -- it's referring to the button object that triggered the click
// $(".btn").click(function () {
//   console.log(this);
// });

// nonjQuery method
// document.querySelectorAll(".btn").forEach(function(event){
//     event.addEventListener("click", function(){
//         var userChosenColor = this.id;
//         console.log("userChosenColor: " + userChosenColor);
//         userClickedPattern.push(userChosenColor);
//         console.log("userClickedPattern " + userClickedPattern);
//     });
// });

// 14) In the same way we played sounds in the nextSequence() function, when a user clicks on a button, the corresponding sound should be played. e.g. if the Green button is clicked, then green.mp3 should be played. Create a new function called "playSound()" that takes a single input paramater called "name".
function playSound(name) {
  // 15) Take the code we used to play sound in the nextSequence() function from step 9 and move it inside this function.

  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
  // console.log(audio.play());
}

// 17) Create a new function called "animatePress()" that takes in a single input parameter called "currentColor"
function animatePress(currentColor) {
  // 18) Take a look inside the styles.css file, you can see there is a class called "pressed", it will add a box shadow and changes the background colour to grey. Use jQuery to add the ".pressed" class to the button that gets clicked inside the animatePress() function.
  // console.log("currentColor: " + currentColor);
  // $("#" + currentColor).addClass("pressed").fadeIn(100).fadeOut(100).removeClass("pressed").fadeIn(100);

  $("#" + currentColor).addClass("pressed");

  // setTimeout(function() {
  //     $("#" + currentColor).removeClass("pressed");
  // }, 100);
  // or
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// 20) Created a new variable called "level" and start at level 0.
var level = 0;

// You'll need a way to keep track of whether the game has started or not, so you only call nextSequence() on the first keypress. Tracking for whether the game has started or not.
var started = false;
console.log("started creation: " + started);

function gameToggle() {
  started = !started;
  console.log("started toggle: " + started);
}

// 19) Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function (event) {
  if (event.key === "a" && started === false) {
    $("h1").text("Level " + level);
    // 21) The h1 HTML element tag starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $(document).off("keydown");
    nextSequence();
    gameToggle();
  }
  // console.log(event);
  // console.log(event.key);
});

// var equalsCheck = (gamePattern, userClickedPattern) => {
//   return JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern);
// }

// if (equalsCheck(gamePattern, userClickedPattern))
// console.log("The arrays have the same elements.");

// var equalsCheck = (gamePattern, userClickedPattern) =>
//   gamePattern.length === userClickedPattern.length &&
//   gamePattern.every(v, i) => v === userClickedPattern[i]);

// 24) Create a new function called checkAnswer(), it should take one input with the name currentLevel.
function checkAnswer(currentLevel) {
  // 26) Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so, then log "success", otherwise log "wrong".
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    // 27) If the user got the most recent answer right in step 26, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      // 28) Call nextSequence() after a 1000 milisecond delay.
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    // 29) In the sounds folder, there is a sound called "wrong.mp3". Play this sound if the user got one of the answers wrong.
    var wrongAudio = new Audio ("./sounds/wrong.mp3");
    wrongAudio.play();
    // 30) In the styles.css file, there is a class called "game-over". Apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 miliseconds.
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    // 31) Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("h1").text("Game Over, Press Any Key to Restart");
    // 33) Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}

// 32) Create a new function called startOver().
function startOver() {
  // 34) Inside this function, you'll need to reset the values of level, gamePattern, and started variables.
  level = 0;
  console.log(level);
  gamePattern = [];
  console.log(gamePattern);
  gameToggle();
  console.log(started);
}