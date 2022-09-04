
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

// random Button click function.

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("level "+ level)

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

};

// Button click function

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// Sound on button click function.

function playSound(name){
  
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

};

//  Button animation function.

function animatePress(currentColour) {
  document.querySelector("#"+ currentColour).classList.add("pressed");
  setTimeout(() => {
      document.querySelector("#"+ currentColour).classList.remove("pressed");
  }, 100);
};


$(document).keydown(function(){
  if (!started) {
    $("#level-title").text("level "+level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
    document.querySelector("body").classList.add("game-over");
  setTimeout(() => {
      document.querySelector("body").classList.remove("game-over");
  }, 200);
  startOver();

  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  }
