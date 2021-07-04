var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  var music = new Audio("sounds/" + name + ".mp3");
  music.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);
  //   $("level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function () {
  if (level != 0) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentSelectedColor) {
  if (
    gamePattern[currentSelectedColor] ===
    userClickedPattern[currentSelectedColor]
  ) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
