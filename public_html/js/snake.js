var snake;
var snakeLength;
var snakeSize;

var context;
var ScreenWidth;
var ScreenHeight;

gameInitialize();
snakeInitialize();
gameDraw();
snakeDraw();


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

function snakeInitialize() {
    snake = [];
    snakeLength = 15;
    snakeSize = 40;
    
    for(var index = snakeLength -1; index >=0; index--){
        snake.push({
            x: index,
            y:0
        });
    }
}

function snakeDraw() {
    for(var index = 0; index < snake.length; index++){
        context.fillStyle = "rgb(219, 187, 42)";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    snakeHeadX++;
    
    var snakeTail = snake.pop();    
    snakeTail.y = snakeHeadY;
    snakeTail.x = snakeheadX;
    snake.unshift(snakeTail);
}