//varieble 

//varieble from html 
const cns = document.getElementById("canvas");
const count = document.querySelector(".title-score");
const btnRestart = document.querySelector(".btn");

const ctx = cns.getContext("2d");
//img start
const imgBg = new Image();
const startImg = new Image();
imgBg.src = "img/snake-block.png";
startImg.src = "img/start.png";


//filed
const cells = 40;
const cellSize = 20;
const cnsWidth = cns.width;
const cnsHeight = cns.height;
const cnsBg = "#000000";

//food
const food = {
    foodX: 0,
    foodY: 0
}
foodColor = "red";

//snake
const snakeColor = "green";

const coordSnake = [
    {x: cellSize * 2, y:0},
    {x: cellSize, y:0},
    {x:0, y:0},
]

let snake = JSON.parse(JSON.stringify(coordSnake))

let snakeHead = {
    x: snake[0].x,
    y: snake[0].y
}

const move = {
    x: cellSize,
    y: 0
}

//score
let score = 0;


imgBg.onload = function (){
    ctx.drawImage(imgBg, 0, 0, cnsWidth, cnsHeight)
    ctx.drawImage(startImg, 250, 400)
}





function drawFiled(){
    ctx.fillStyle = cnsBg;
    ctx.fillRect(0,0,cnsWidth,cnsHeight);

}

function drawSnake(){
    for(let i = 0; i < snake.length; i++){
        const snakePart = snake[i];
        if(
            i !== 0 &&
                snakePart.x === snakeHead.x &&
                snakePart.y === snakeHead.y
        ){
            return endGame();
        }
        ctx.fillStyle = snakeColor;
        ctx.fillRect(snakePart.x, snakePart.y, cellSize,cellSize)
    }
}

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.foodX, food.foodY, cellSize, cellSize)
}

function getRandomNum(){
    return Math.floor(Math.random() * (cnsWidth / cellSize)) * cellSize;
}
console.log(getRandomNum())
function getNewFood(){
    food.foodX = getRandomNum();
    food.foodY = getRandomNum();
}

function ifSnakeEat(){
    if(snakeHead.x === food.foodX && snakeHead.y === food.foodY){
        getNewFood();
        updateScore(score + 1)
        return true
    }

    return false
}

function updateScore(newScore){
    score = newScore;
    count.textContent = score;
}

function moveSnake(){
    snakeHead.x += move.x;
    snakeHead.y += move.y;

    if(snakeHead.x < 0){
        snakeHead.x = cnsWidth - cellSize;
    }
    if(snakeHead.x > cnsWidth - cellSize){
        snakeHead.x = 0;
    }
    if(snakeHead.y < 0){
        snakeHead.y = cnsHeight - cellSize
    }
    if(snakeHead.y > cnsHeight - cellSize){
        snakeHead.y = 0;
    }   

    snake.unshift({
        x: snakeHead.x,
        y: snakeHead.y
    })

    if(!ifSnakeEat()){
        snake.pop();
    }
}

function changeDirectionSnake(e){


    const isGoingRight = move.x > 0;
    const isGoingLeft = move.x < 0;
    const isGoingUp = move.y < 0;
    const isGoingDown = move.y > 0;

    if(e.keyCode === 87 || e.key === "ArrowUp"){
        if(!isGoingDown){
            move.x = 0,
            move.y = -cellSize;
        }
    }
    if(e.keyCode === 83 || e.key === "ArrowDown"){
        if(!isGoingUp){
            move.x = 0,
            move.y = cellSize;
        }
    }
    if(e.keyCode === 68 || e.key === "ArrowLeft"){
        if(!isGoingLeft){
            move.x = cellSize,
            move.y = 0;
        }
    }
    if(e.keyCode === 65 || e.key === "ArrowRight"){
        if(!isGoingRight){
            move.x = -cellSize,
            move.y = 0;
        }
    }
}

function startGame(){
    drawFiled();
    drawSnake();
    drawFood();
    ifSnakeEat()
    moveSnake()
}

document.addEventListener("keydown", changeDirectionSnake)
let endInterval = null;

cns.onclick = function(){
    endInterval = setInterval(startGame, 60)
};


function endGame(){
    location.reload() 
}