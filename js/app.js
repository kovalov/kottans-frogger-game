class Enemy {
  constructor(x, y, speedX, fieldWidth, player) {
    this.sprite = 'images/enemy-bug.png';
    this.fieldWidth = fieldWidth;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.player = player;
  }

  checkCollision() {}

  update(dt) {
    if (this.x >= this.fieldWidth) {
      this.x = 0;
    }

    this.x += dt * this.speedX;

    this.checkCollision();
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor(params) {
    this.sprite = 'images/char-boy.png';
    this.fieldWidth = params.fieldWidth;
    this.fieldHeight = params.fieldHeight;
    this.x = params.fieldWidth / 2;
    this.y = params.fieldHeight;
    this.speedX = params.speedX;
    this.speedY = params.speedY;
  }

  update(dt) {}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    switch (key) {
      case 'left':
        if (this.x > 0) this.x -= this.speedX;
        break;

      case 'up':
        if (this.y > 0) this.y -= this.speedY;
        break;

      case 'right':
        if (this.x < this.fieldWidth) this.x += this.speedX;
        break;

      case 'down':
        if (this.y < this.fieldHeight) this.y += this.speedY;
        break;

      default:
        break;
    }
  }

  setDefault() {
    this.x = this.fieldWidth / 2;
    this.y = this.fieldHeight;
  }
}

const playerConfiguration = {
  fieldWidth: 400,
  fieldHeight: 375,
  speedY: 80,
  speedX: 100,
};

const player = new Player(playerConfiguration);

const allEnemies = [
  new Enemy(0, 50, 80, 400, player),
  new Enemy(0, 135, 100, 400, player),
  new Enemy(0, 215, 120, 400, player),
];

function handleClick(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener('keyup', handleClick);
