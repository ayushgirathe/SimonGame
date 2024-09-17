var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started =false;

var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("fail");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        startOver();
    }

}


function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}