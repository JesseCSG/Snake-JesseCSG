var snake;

var context;
var ScreenWidth;
var ScreenHeight;

gameInitialize();
gameDraw();


function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

function gameLoop() {
    
}

function gameDraw() {
    context.fillStyle = "rgb(19, 63, 168)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}
