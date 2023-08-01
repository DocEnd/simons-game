
var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []

var userClickedPattern = []

var level = 0

var started = false

function nextSequence() {
    userClickedPattern=[]
    level++
    $("#level-title").text("Level " + level);
    var randomChoisenColour = buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomChoisenColour);
    
    $("#"+randomChoisenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    palySound(randomChoisenColour)
    
    console.log(gamePattern)
    console.log(started)
        
}

function palySound(name) {
    var sound = new Audio("./sounds/"+name+".mp3");
    sound.play();
} 

function animatePress (currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout( function() {$("#"+currentColor).removeClass("pressed")},100)
}

$(".btn").click(function () {
    var userChosenColor = this.id
    userClickedPattern.push(userChosenColor)
    console.log(userClickedPattern)
    palySound(userChosenColor)
    animatePress(userChosenColor)
    checkUnswer(currentLevel = userClickedPattern.length -1)
})


$(document).keydown(function () {
    if (!started) {
    started = true
    nextSequence()}
    

});


function checkUnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Good");
        if (userClickedPattern.length === gamePattern.length){
        setTimeout( function() {nextSequence()}, 1000)
        }

    } else {
        console.log("Bad")
        var sound = new Audio ("./sounds/wrong.mp3")
        sound.play()
        $("body").addClass("game-over")
        setTimeout(function() { $("body").removeClass("game-over")}
        ,200)
        $("h1").text("Game Over, Press Any Key to Restart")
        started = false
    }
}