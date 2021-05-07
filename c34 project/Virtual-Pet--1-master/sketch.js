//Create variables here
var dog;
var dog1;
var dog2;
var happyDog;
var database;
var foodS = 0;
var foodStock;
function preload()
{
	//load images here
  dog1  = loadImage("images/dogImg.png");
  dog2 =  loadImage("images/dogImg1.png");
  
}

function setup() {
  
	createCanvas(500, 500);
  dog  = createSprite(300,200,50,50);
  dog.addImage(dog1);
  dog.scale  = 0.3;
  
  database = firebase.database();

  foodStockref  = database.ref("foodStock");
  foodStockref.on("value", readStock    );
  
}
function readStock(data){
  foodS = data.val();

}


function draw() {  
  background(46,139,87);
  fill("black");
  textSize(15);
  text("Press Left Arrow To Feed" , 50,50);
  text("Food Remaining:" + foodS , 100, 100 );

  if(keyDown(LEFT_ARROW)){
    writeStock(foodS);
    dog.addImage(dog2);
    dog.scale  = 0.3;
}

  drawSprites();
  //add styles here

}

function writeStock(x){
  if(x<=0){
    x = 0

  }
  else{
    x = x-1;
  }
  
  database.ref("/").update({
    foodStock : x 
  });

}



