let kittyX, kittyY; 
let foods = [];     
let lives;          
let totalMeat;      
let totalFood;      
let gameOver;       

const screenWidth = 400;
const screenHeight = 400;

let upKeyPressed = false;
let downKeyPressed = false;
let leftKeyPressed = false;
let rightKeyPressed = false;

// Координати та розміри кнопки
let buttonX;
let buttonY;
let buttonWidth = 120;
let buttonHeight = 40;

var bgImg;

function preload() {
  bgImg = loadImage('bg.jpg');
}

function setup() {
  createCanvas(screenWidth, screenHeight); 
  kittyX = width / 2; 
  kittyY = height / 2;
  lives = 3; 
  totalFood = 20; 
  gameOver = false; 

  // Ініціалізація координат кнопки
  buttonX = (screenWidth - buttonWidth) / 2;
  buttonY = (screenHeight + buttonHeight) / 2;

  totalMeat = 0;
  for (let i = 0; i < totalFood; i++) {
    let food = {
      x: random(15, width-15),
      y: random(15, height-15),
      isMeat: random() < 0.5 
    };

    if (food.isMeat) {
      totalMeat++;
    }

    foods.push(food);
  }
}

function draw() {
  background(bgImg); 

  fill(255, 0, 0); 
  text('😺',kittyX, kittyY, 30, 30); 

  for (let food of foods) {
    if (food.isMeat) {
      text('🍖', food.x, food.y);
    } else {
      text('🍏', food.x, food.y);
    }
  }

  fill(0);
  textSize(20);
  text("❤️" + lives, screenWidth - 50, 30);

  if (totalMeat === 0) {
    gameOver = true;
    fill(0);
    textSize(20);
    text("Гра закінчена! Ви з'їли все м'ясо!", width/2, height/2);
    textSize(15);
    textAlign(CENTER, CENTER);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);
    fill(255);
    text("Почати знову", screenWidth / 2, buttonY + buttonHeight / 2);
  }

  if (lives <= 0) {
    gameOver = true;
    fill(0);
    textSize(20);
    text("Гра закінчена! Ви програли!",width/2, height/2);
    textSize(15);
    textAlign(CENTER, CENTER);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);
    fill(255);
    text("Почати знову", screenWidth / 2, buttonY + buttonHeight / 2);
  }
}

function keyPressed() {
  print(totalFood, totalMeat)
  if (keyCode === UP_ARROW) {
    upKeyPressed = true;
  } else if (keyCode === DOWN_ARROW) {
    downKeyPressed = true;
  } else if (keyCode === LEFT_ARROW) {
    leftKeyPressed = true;
  } else if (keyCode === RIGHT_ARROW) {
    rightKeyPressed = true;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    upKeyPressed = false;
  } else if (keyCode === DOWN_ARROW) {
    downKeyPressed = false;
  } else if (keyCode === LEFT_ARROW) {
    leftKeyPressed = false;
  } else if (keyCode === RIGHT_ARROW) {
    rightKeyPressed = false;
  }
}

function moveKitty() {
  if (!gameOver) {
    if (upKeyPressed && kittyY > 0) {
      kittyY -= 10;
    } 
    if (downKeyPressed && kittyY < screenHeight - 20) {
      kittyY += 10;
    } 
    if (leftKeyPressed && kittyX > 0) {
      kittyX -= 10;
    } 
    if (rightKeyPressed && kittyX < screenWidth - 20) {
      kittyX += 10;
    }
  }
}

function updateGame() {
  for (let i = foods.length - 1; i >= 0; i--) {
    let food = foods[i];
    if (dist(kittyX, kittyY, food.x, food.y) < 20) {
      if (food.isMeat) {
        totalMeat--; 
      } else {
        lives--; 
      }

      foods.splice(i, 1);
    }
  }
}

function update() {
  moveKitty();
  updateGame();
}

setInterval(update, 100); 

function restartGame() {
  kittyX = width / 2;
  kittyY = height / 2;
  lives = 3;
  totalFood = 20;
  totalMeat = 0;
  foods = [];
  gameOver = false;

  for (let i = 0; i < totalFood; i++) {
    let food = {
      x: random(width),
      y: random(height),
      isMeat: random() < 0.5 
    };

    if (food.isMeat) {
      totalMeat++;
    }
    foods.push(food);
  }
}

function mouseClicked() {
  if (gameOver && mouseX >= buttonX && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    restartGame();
  }
}



