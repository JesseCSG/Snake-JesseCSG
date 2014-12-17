/*-----------------------------------------------------------------------------
 * Variiables
 *-----------------------------------------------------------------------------
 */

var snake;
var snakeLength;
var snakeSize;
var snakeDiretion;
var snake_array;

var food;

var context;
var ScreenWidth;
var ScreenHeight;

var gameState;
var gameStartMenu;
var gameOverMenu;
var restartButton;
var playHUD;

/*-----------------------------------------------------------------------------
 * Executing Game Functions
 * ----------------------------------------------------------------------------
 */

gameInitialize();
snakeInitialize();
foodInitialize();
snakeUpdate();
setInterval(gameLoop, 1000/15);
/*-----------------------------------------------------------------------------
 * Game Functions
 * ----------------------------------------------------------------------------
 */

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    document.addEventListener("keydown", snakeMovement);
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    gameStartMenu = document.getElementById("gameStart");
    centerMenuPosition(gameStartMenu);
    
    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);
    
    restartButton = document.getElementById("restartButton");
    document.addEventListener("click", gameRestart);
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    setState("PLAY");
}

function gameLoop() {
    gameDraw();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

function gameDraw() {
    context.fillStyle = "gray";
    context.fillRect(0, 0, screenWidth, screenHeight);
    context.clearRect(0, 0, screenWidth, screenHeight);
}

function gameRestart() {
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    showMenu(gameStartMenu);
    setState("PLAY");
    
}
/*-----------------------------------------------------------------------------
 * Snake Function
 * ----------------------------------------------------------------------------
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 3;
    snakeSize = 30;
    snakeDirection = "down";
    
    for(var index = snakeLength -1; index >=0; index--){
        snake.push({
            x: index,
            y:0
        });
    }
}

function snakeDraw() {
    for(var index = 0; index < snake.length; index++){
        context.fillStyle = "blue";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
        context.strokeStyle = "black";
        context.strokeRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);
    checkSnakeCollisions(snakeHeadX, snakeHeadY);
    
    if(snakeDirection == "down") {
        //down arrow key
        snakeHeadY++;
    }
    else if(snakeDirection == "left") {
        //left arrow key
        snakeHeadX--;
    }
    else if(snakeDirection == "up") {
        //up arrow key
        snakeHeadY--;
     }
    else if(snakeDirection == "right") {
        //right arrow key
        snakeHeadX++;
    }
    
    var snakeTail = snake.pop();    
    snakeTail.y = snakeHeadY;
    snakeTail.x = snakeHeadX;
    snake.unshift(snakeTail);
}

function snakeMovement(event) {
    if (event.keyCode == "40" && snakeDirection != "up") {
        // down arrow
        snakeDirection = "down";
    }
    else if (event.keyCode == '38' && snakeDirection != "down") {
        // up arrow
        snakeDirection = "up";
    }
    else if (event.keyCode == '39' && snakeDirection != "left") {
        // right arrow
        snakeDirection = "right";
    }
    else if (event.keyCode == '37' && snakeDirection != "right") {
        // left arrow
        snakeDirection = "left";
    }
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
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "dark gray";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
    context.strokeStyle = "black";
    context.strokeRect(snake.x * snakeSize, snake.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

/*-----------------------------------------------------------------------------
 * Input Functions
 *-----------------------------------------------------------------------------
 */

function keyboardHandeler(event){
    console.log(event);
}

/*-----------------------------------------------------------------------------
 * Collision Handeling
 * ----------------------------------------------------------------------------
 */

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;
        setFoodPosition();
    }
    
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        setState("Game Over");
    }
    if(snakeHeadY * snakeSize >= screenHeight || snakeHeadY * snakeSize < 0) {
        setState("Game Over");
    }
}

function checkSnakeCollisions(snakeHeadX, snakeHeadY) {
    for(var index = 1; index < snake.length; index++) {
      if(snakeHeadX == snake[index].x && snakeHeadY == snake[index].y) {
          setState("Game Over");
          return;
      }  
    }
}

/* ----------------------------------------------------------------------------
 * Game State Heading
 * ----------------------------------------------------------------------------
 */

function setState(state) {
    gameState = state;
    showMenu(state);
    
}

/*-----------------------------------------------------------------------------
 * Menu Functions
 * ----------------------------------------------------------------------------
 */

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function hideMenu(menu) {
    menu.style.visibility = "hidden";
}

function showMenu(state) {
    if (state == "PLAY") {
        displayMenu(gameStartMenu);
    }
    else if(state == "Game Over") {
        displayMenu(gameOverMenu);
    }
}

function centerMenuPosition(menu) {
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
}