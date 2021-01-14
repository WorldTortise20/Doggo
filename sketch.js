//Creating variables
var doggo, dogImg, dogImg2, database, foodStock, foodS;
var gs = "feed";
var food, foodImg;

function preload()
{
  //Loading images
  dogImg = loadImage("dogImg.png");
  dogImg2 = loadImage("dogImg1.png");
  foodImg = loadImage("banana.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);

  doggo = createSprite(250,250,10,10);
  doggo.addImage(dogImg);
  doggo.scale = 0.2;

  food = createSprite(190,300,10,10);
  food.addImage(foodImg);
  food.scale = 0.06;
  food.visible = false;

  foodStock = database.ref("Food");//We are going to database and 'ref'erencing the node "Food".
  foodStock.on("value",readStock);//We are "listening" to the foodStock value and calling user defined function readStock
}


function draw() {  
background(46,139,87);
  drawSprites();
  
  textSize(20)
  fill("red");
  text("Press Up Arrow to feed Doggo!",width/3, 50);
  text("Food left : "+ foodS,width/3, 100);

  feedDoggo();
}

function writeStock(x){
 if(x<=0){
  x=0;
 }else{
  x = x-1;
 }
  database.ref('/').set({Food:x})
}

function readStock(data){
  foodS = data.val();
}

/*function keyPressed(){
  if(keyCode(32)&& gs==="Full"){
    foodS = 10;
    gs = "feed";
  }
}*/

function feedDoggo(){
  if(keyWentDown(UP_ARROW) && gs=== "feed"){  
    writeStock(foodS);
    doggo.addImage(dogImg2);
    food.visible = true;
  }

  if(keyWentUp(UP_ARROW)&& gs=== "feed"){  
    //writeStock(foodS);
    doggo.addImage(dogImg);
    food.visible = false;
  }
  if(foodS===0)
  {
  foodS = 10;
  //doggo.addImage(dogImg);
  //gs="Full";
  }
}