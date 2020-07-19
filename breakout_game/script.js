const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const won = document.getElementById("win");
const play = document.getElementById("play");

let life = 3;
let score = 0;

//define properties of objects such as ball and paddle
const ball = {
  x: canvas.width / 2,
  y: canvas.width / 2,
  speed: 4,
  size: 10,
  dx: 4,
  dy: 4,
};

const ball2 = {
  x: canvas.width / 2 - 20,
  y: canvas.width / 2,
  speed: 4,
  size: 10,
  dx: 4,
  dy: 4,
  visible: true,
};

//Paddlei info
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
  visible: true,
};

//info of brick
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const brickRow = 5;
const brickColumn = 9;
//The arrays of bricks to be created
const bricks = [];
for (let i = 0; i < brickColumn; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickRow; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}
console.log(bricks);

//Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#a8dadc";
  ctx.fill();
  ctx.closePath();
}

//Draw the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

//Draw the scores
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawLife() {
  ctx.font = "20px Arial";
  ctx.fillText(`Life: ${life}`, canvas.width - 190, 30);
}

//Draw the bricks
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function draw() {
  drawBall();
  drawPaddle();
  drawScore();
  drawLife();
  drawBricks();
}

//to Move paddle
function movePaddle() {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //Wall detection for right and left
  if (ball.x + ball.size > canvas.width || ball.x + ball.size < 0) {
    ball.dx *= -1;
  }
  //Wall detection for up and down
  if (ball.y + ball.size > canvas.height || ball.y + ball.size < 0) {
    ball.dy *= -1;
  }

  if (
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y &&
    ball.x - ball.size > paddle.x
  ) {
    ball.dy = -ball.speed;
  }

  //Brick collison
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  //When ball hits the floor
  if (ball.y + ball.size > canvas.height) {
    //window.location.reload(); => problem that the ball starts again from the same position
    life -= 1;
    if (life === 0) {
      life = 3;
      score = 0;
      showAllbricks();
    }
  }
}

//increase the score
function increaseScore() {
  score++;

  if (life === 0) {
    score = 0;
    showAllbricks();
  }

  if (score % (brickRow * brickColumn) === 0) {
    won.style.display = "flex";
  }
}

//Show ALL bricks after losing
function showAllbricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

function update() {
  //clear the canvas for movement showing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePaddle();
  moveBall();
  draw();

  requestAnimationFrame(update);
}

update();

//Event listners
//Keyboard event listeners for moving paddle
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});

play.addEventListener("click", () => {
  won.style.display = "none";
  life = 3;
  score = 0;
  showAllbricks();
});
