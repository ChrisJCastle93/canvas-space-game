const playerSpeed = 4;
const playerSize = 50;
const numberOfGhosts = 5;
const ghostSize = 30;

let startGame = false;

class Scene {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.backgroundImage = new Image();
    this.backgroundImage.src =
      "https://i.pinimg.com/originals/8d/bb/58/8dbb588536397d8571c934332ff1dffc.jpg";
    this.backgroundY = 0;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  animateBackground() {
    this.backgroundY += 1;
    this.ctx.drawImage(
      this.backgroundImage,
      0,
      this.backgroundY % this.canvas.height,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.drawImage(
      this.backgroundImage,
      0,
      (this.backgroundY % this.canvas.height) - this.canvas.height,
      this.canvas.width,
      this.canvas.height
    );
  }
  score() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "50px monospace";
    this.ctx.fillText(`👻 ${ghosts.length}`, 50, 50);
    this.ctx.fillText(`🚀 ${ufo.actions}`, this.canvas.width - 150, 50);
  }
}

const distance = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

class Ghost {
  constructor() {
    this.x = Math.random() * scene.canvas.width;
    this.y = Math.random() * scene.canvas.height;
    this.image = new Image();
    this.image.src = "https://media.giphy.com/media/Qr8JE9Hvi7ave/200.gif";
  }
  draw() {
    scene.ctx.drawImage(this.image, this.x, this.y, ghostSize, ghostSize);
  }
}

class Ufo {
  constructor() {
    this.x = scene.canvas.width / 2 - playerSize / 2;
    this.y = scene.canvas.height / 2 - playerSize / 2;
    this.speedY = 0;
    this.speedX = 0;
    this.actions = 0;
    this.image = new Image();
    this.image.src =
      "https://media.giphy.com/media/xThtaaGyhb0kZ052A8/giphy.gif";
  }
  draw() {
    scene.ctx.drawImage(this.image, this.x, this.y, playerSize, playerSize);
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) {
      this.x = -playerSize;
    }
    if (this.x < -playerSize) {
      this.x = canvas.width;
    }
    if (this.y > canvas.height) {
      this.y = -playerSize;
    }
    if (this.y < -playerSize) {
      this.y = canvas.height;
    }
  }
  moveUp() {
    this.speedY = -playerSpeed;
    this.speedX = 0;
  }
  moveDown() {
    this.speedY = playerSpeed;
    this.speedX = 0;
  }
  moveRight() {
    this.speedX = playerSpeed;
    this.speedY = 0;
  }
  moveLeft() {
    this.speedX = -playerSpeed;
    this.speedY = 0;
  }
}

const scene = new Scene();
let ghosts = new Array(numberOfGhosts)
  .fill(null)
  .map((_, index) => new Ghost(index)); // creates an array with a determined number of ghosts
const ufo = new Ufo();

const remove = (ghostId) => ghosts.filter((ghost) => ghost.id !== ghostId);

document.addEventListener("keydown", (event) => {
  if (event.key === "s") {
    startGame = true;
    return;
  }
  ufo.actions += 1;
  const pressedKey = event.key;
  switch (pressedKey) {
    case "ArrowLeft":
      ufo.moveLeft();
      break;
    case "ArrowRight":
      ufo.moveRight();
      break;
    case "ArrowUp":
      ufo.moveUp();
      break;
    case "ArrowDown":
      ufo.moveDown();
      break;
  }
});

function update() {
  scene.clear();
  scene.animateBackground();
  if (startGame) {
    ghosts.forEach((ghost) => ghost.draw());
    ufo.draw();
  } else {
    scene.ctx.fillText(
      'Press "s" to start the game!',
      scene.canvas.width / 2 - 400,
      scene.canvas.height
    );
  }
  scene.score();
  // ghost.forEach((ghost) => ghost.draw());
  // ufo.draw();
  if (ghosts.length) {
    requestAnimationFrame(update);
  }
}

update();
