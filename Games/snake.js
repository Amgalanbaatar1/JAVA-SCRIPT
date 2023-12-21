// board

var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var volacityX = 0;
var volacityY = 0;

var snakeBody = [];

//snake food

var foodX;
var foodY;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); //used for drawing on the board
  placeFood();
  document.addEventListener("keyup", changeDirection);
  //   update();
  setInterval(update, 1500 / 10);
};

function update() {
  context.fillStyle = "brown";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "lime";

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }
  for (let d = snakeBody.length - 1; d > 0; d--) {
    snakeBody[d] = snakeBody[d - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  snakeX += volacityX * 25;
  snakeY += volacityY * 25;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let d = 0; d < snakeBody.length; d++) {
    context.fillRect(snakeBody[d][0], snakeBody[d][1], blockSize, blockSize);
  }

  context.fillStyle = "black";
  context.fillRect(foodX, foodY, blockSize, blockSize);
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && volacityY != 1) {
    volacityX = 0;
    volacityY = -1;
  } else if (e.code == "ArrowDown" && volacityY != -1) {
    volacityX = 0;
    volacityY = 1;
  } else if (e.code == "ArrowLeft" && volacityX != 1) {
    volacityX = -1;
    volacityY = 0;
  } else if (e.code == "ArrowRight" && volacityX != -1) {
    volacityX = 1;
    volacityY = 0;
  }
}
function placeFood() {
  // (0-1) * cols =>(0-19.9999) =>(0.19) * 25
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
