//variables

var invisibleGround;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var fruitGroup, obstacleGroup;
var deadLine, deadLine;
var ran;
var jumpSound;
var monkeyDead;
var Background;


function preload() {
//loading bg image
  backgroundImage = loadImage("background0.png")
  
//loading monkey running Image
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  
//loading banana image
  bananaImage = loadImage("banana.png");
  
//loading obstacles,dead monkey,etc...Image   
  obstacleImage = loadImage("obstacle.png");
  monkeyDead = loadImage("dead image.png");
  deadLine = loadImage("dead slogan.png");
  
 // Loading game sounds 
  jumpSound = loadSound("jump.mp3");
  bananaSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
}



function setup() {
  
//creating canvas
  createCanvas(600, 430);

//creating bg
  Background = createSprite(270, 200);
  Background.addImage("background", backgroundImage)
  Background.scale = 1.3;
  
 //declaring score=0;
  score = 0;
  
 //creating monkey
  monkey = createSprite(70, 370, 5, 5);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.19;
  monkey.addImage("dead", monkeyDead);
 // monkey.debug = true;

//creating Invisible ground to let monkey stand  
  
  invisibleGround = createSprite(250, 430, 400, 10)
  invisibleGround.visible = false;
  
//declaring groups
  fruitGroup = createGroup();
  obstacleGroup = createGroup();

}


function draw() {

  //colliding monkey with invisible ground;
  monkey.collide(invisibleGround)
  
//to jump monkey
  if (keyWentDown("space") && monkey.y >= 350) {
    monkey.velocityY = -20;
    jumpSound.play();
  }
  monkey.velocityY = monkey.velocityY + 0.8

//declaring fruit and obtacle Functions;
  fruit();
  Obstacle();

//to score a point touch banana
  if (fruitGroup.isTouching(monkey)) {
    score = score + 1
    fruitGroup.destroyEach();
    bananaSound.play();

  }
  
//ending the game
  if (obstacleGroup.isTouching(monkey)) {
    monkey.changeAnimation("dead", monkeyDead);
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    fruitGroup.setLifetimeEach(-1);
    dead_line = createSprite(250, 100, 5, 5)
    dead_line.addImage("deadLine", deadLine);
    dieSound.play();
  }

  drawSprites();
  
//displaying  score
  text("Score=" + score, 40, 370);

}
  function fruit() {
    if (frameCount % 150 === 0) {
      banana = createSprite(450, 170, 5, 5);
      banana.y = Math.round(random(80, 200))
      banana.addAnimation("bannanaImage", bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -3;
      banana.lifetime = 150;
      fruitGroup.add(banana);
    }

  }


  function Obstacle() {
    if (frameCount % 200 === 0) {

      obstacle = createSprite(470, 395, 5, 5);
      obstacle.addImage("rock", obstacleImage);
      obstacle.scale = 0.2;
      obstacle.velocityX = -7;
      obstacle.debug = true;
      obstacle.setCollider("circle", 5, 5, 260)
      obstacleGroup.add(obstacle);
    }

  }