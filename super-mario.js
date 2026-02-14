// Player position & physics
let x = 100;
let y = 290;
let vy = 0;           // vertical velocity
let playerW = 40;
let playerH = 40;
let gravity = 0.6;
let jumpForce = -12;
let onGround = false;

// Block
let block = { x: 200, y: 300, w: 80, h: 30 };

// Ground level
let groundY = 330;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(120, 190, 255); // sky

  // ground
  fill(60, 200, 90);
  rect(0, groundY, width, 70);

  // draw block
  fill(139, 90, 43);
  rect(block.x, block.y, block.w, block.h);

  // hold to move
  if (keyIsDown(68)) x += 5; // D
  if (keyIsDown(65)) x -= 5; // A

  applyPhysics();
  drawPlayer();
}

// ==================================================
// PHYSICS & COLLISION
// ==================================================
function applyPhysics() {
  // Apply gravity
  vy += gravity;
  y += vy;

  onGround = false;

  // Player edges
  let playerBottom = y + playerH;
  let playerRight = x + playerW;
  let playerLeft = x;

  // Check landing on block (only from above, when falling)
  let overlapX = playerRight > block.x && playerLeft < block.x + block.w;
  if (overlapX && vy >= 0 && playerBottom >= block.y && playerBottom <= block.y + 15) {
    y = block.y - playerH;
    vy = 0;
    onGround = true;
  }

  // Check landing on ground
  if (y + playerH >= groundY) {
    y = groundY - playerH;
    vy = 0;
    onGround = true;
  }
}

// ==================================================
// JUMP (Space or W)
// ==================================================
function keyPressed() {
  if ((keyCode === 32 || keyCode === 87) && onGround) {
    vy = jumpForce;
    onGround = false;
  }
}

// ==================================================
// 🎨 DRAW PLAYER
// ==================================================
function drawPlayer() {
  fill(255, 60, 60);
  rect(x, y, playerW, playerH);
}