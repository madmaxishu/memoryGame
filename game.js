var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


$(document).keydown(function() {
    if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

$(".btn").click(function(){
    var userChosencolor = $(this).attr("id");
    userClickedPattern.push(userChosencolor);
    playSound(userChosencolor);
    animatePress(userChosencolor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if ( gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout (function() {
            nextSequence();
        }, 1000);
    }
}
    else {
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
        }
    }



function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"); 
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100 );
}

function startOver() {
        
     started = false;

     level = 0;
     gamePattern = [];

   }





 