/*-----------------------------------------------------------------------------
 * Variiables
 *-----------------------------------------------------------------------------
 */

var snake;
var snakeLength;
var snakeSize;

var food;

var context;
var ScreenWidth;
var ScreenHeight;
/*-----------------------------------------------------------------------------
 * Executing Game Functions
 * ----------------------------------------------------------------------------
 */

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000/3);
/*-----------------------------------------------------------------------------
 * Game Functions
 * ----------------------------------------------------------------------------
 */

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
    context.fillStyle = "blue";
    context.fillRect(0, 0, screenWidth, screenHeight);
}
/*-----------------------------------------------------------------------------
 * Snake Function
 * ----------------------------------------------------------------------------
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 5;
    snakeSize = 30;
    
    for(var index = snakeLength -1; index >=0; index--){
        snake.push({
            x: index,
            y:0
        });
    }
}

function snakeDraw() {
    for(var index = 0; index < snake.length; index++){
        context.fillStyle = "lime";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    snakeHeadX++;
    
    var snakeTail = snake.pop();    
    snakeTail.y = snakeHeadY;
    snakeTail.x = snakeHeadX;
    snake.unshift(snakeTail);
}
/*-----------------------------------------------------------------------------
 * Food Functions
 * ----------------------------------------------------------------------------
 */

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
}

function foodDraw() {
    context.fillStyle = "gray";
    context.fillRect(food.x, food.y, snakeSize, snakeSize);
}