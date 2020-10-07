

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
  
  createCanvas(600,600);
  
  //creating the monkey
  monkey = createSprite(100,450,50,50);
  monkey.addAnimation("monkeyrunning", monkey_running);
  monkey.scale = 0.2;
  
  //creating the ground and giving it x velocity
  ground = createSprite(0,515,1200,15)
  ground.velocityX = -6;
  
  //creating the groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  //giving initial survival time
  survivalTime = 0;
}


function draw() {

  background("lightBlue");
  
  //make continuously moving ground
  if(ground.x < 0){
    
    ground.x = ground.width/2;
  }
  
  //making the monkey jump on pressing space
  if(keyDown("space")){
    monkey.velocityY = - 4;
    
  }
  
  //giving the gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //making the monkey collide with the ground
  monkey.collide(ground);
  
  
  //call the functions
  food();
  obstacles();
  
  drawSprites();
  
  //display the survival time
  stroke("black");
  fill("black");
  textSize(15);
  survivalTime = Math.ceil(frameCount/getFrameRate());
  text("Survival Time : "+ survivalTime, 450,50);
}

function food(){
  
  if(frameCount%80 == 0){
    
    //creating the banana after every 80 frames
    banana = createSprite(550,480,50,50);
    banana.addImage(bananaImage);
    banana.scale = 0.13;
    
    //giving random y positions
    banana.y = Math.round(random(350,450));
    
    //giving x velocity and lifetime
    banana.velocityX = -5;
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding to the group
    bananaGroup.add(banana);
  }
}

function obstacles(){
  
  if(frameCount%300 == 0){
    
    //creating the obstacles after every 300 frames
    obstacle = createSprite(550,470,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    
    //giving x velocity and lifetime
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    
    //adjusting the depth
    obstacle.depth = banana.depth;
    obstacle.depth = obstacle.depth - 1;
    
    obstacle.depth = monkey.depth;
    obstacle.depth = monkey.depth + 1;
    
    //adding to the group
    obstacleGroup.add(obstacle);
  }
  
}
