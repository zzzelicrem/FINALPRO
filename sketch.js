const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

//game objects
var box1,box2,box3,box4,box5,box6,box7,box8,box9; 
var pig1,pig2,pig3,pig4;
var log1,log2,log3,log4,log5,log6,log7;
var bird, slingshot,platform;

//game sounds
var music,birdSelectSound,birdFlySound,pigSnortSound,finish;

//background images
var backgroundImg;
var bg = "sprites/bg1.png";

//games state
var gameState = "onSling";

//score
var score = 0;

//birds
var birds=[];

function preload() {

    getBackgroundImg();
    bgImg=loadImage(bg);

    music = loadSound("sounds/Angry-Birds-Theme-Song.mp3");
    birdFlySound = loadSound("sounds/angry_bird_flying.mp3");
    pigSnortSound = loadSound("sounds/pig_snort.mp3");
    birdSelectSound = loadSound("sounds/bird_select.mp3");
    finish = loadSound("sounds/Mistery-of-Danch-unfinished.mp3");
    
}

function setup(){
    var canvas = createCanvas(1500,500);
    canvas.position(15, 70);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(800,height,1600,20);
    platform = new Ground(150, 350, 300, 285);
    wall = new Ground(1500,250,10,500);

    box1 = new Box(700,350,70,70);
    box2 = new Box(920,350,70,70);
    box3 = new Box(700,300,70,70);
    box4 = new Box(920,290,70,70);
    box5 = new Box(810,210,70,70);
    box6 = new Box(620,350,70,70);
    box7 = new Box(990,350,70,70);
    box8 = new Box(500,350,100,100);
    box9 = new Box(1100,350,100,100);

    pig1 = new Pig(810, 350);
    pig2 = new Pig(600, 280);
    pig3 = new Pig(800, 300);
    pig4 = new Pig(1050, 300);
    pig5 = new Pig(800, 150);

    log1 = new Log(810,310,270, PI/2);
    log2 = new Log(670,350,150, PI/12);
    log3 =  new Log(810,230,290, PI/2);
    log4 = new Log(770,180,150, PI/15);
    log5 = new Log(860,170,150, -PI/15);
    log6 = new Log(935,350,150, -PI/15);
    log7 = new Log(800,100,150, PI/2);

    bird = new Bird(200,50);    
    bird2 = new Bird(150,170);   
    bird3 = new Bird(100,170);     
    bird4 = new Bird(50,170);    

    birds.push(bird4)
    birds.push(bird3)
    birds.push(bird2)
    birds.push(bird)

    slingshot = new SlingShot(bird.body,{x:200, y:50});

    music.play();
    music.loop();
    
}

function draw(){

    if(backgroundImg){
        background(backgroundImg);
        
        noStroke();
        textFont("Impact")
        textSize(20)
        fill("Red")
        text("Score : " + score, width-300, 20); 
        
        if(birds.length>0){
            text("Press Space Key for Next Bird", width/2-200, 25); 
            text("Bird :  "+birds.length,width/2-100, 60)
           
        }
        else{
            text("Click on 'Reload Button' to reload the Game Level",width/2-200, 70)
        }
        
    }
    else{
        //background("lightblue");
        background(bgImg);
        noStroke();
        textFont("Impact")
        textSize(20)
        fill("Red")
        text("Score : " + score, width-300, 20); 
        
        if(birds.length>0){
            text("Press Space Key for Next Bird", width/2-200, 25); 
            text("Bird :  "+birds.length,width/2-100, 60)
            
        }
        else{
            text("Click on 'Reload Button' to reload the Game Level",width/2-200, 70)
        }
         
    }
    Engine.update(engine);
    
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();
    box7.display();
    box8.display();
    box9.display();

    ground.display();

    pig1.display();
    pig1.score();
    pig2.display();
    pig2.score();
    pig3.display();
    pig3.score();
    pig4.display();
    pig4.score();
    pig5.display();
    pig5.score();

    log1.display();
    log2.display();
    log3.display();
    log4.display();
    log5.display();
    log6.display();
    log7.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();

    platform.display();
   
    slingshot.display(); 
    
}

//pull the bird with the rubber band when mouse is dragged
function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(birds[birds.length-1].body, birds[birds.length-1].body.position, {x:5,y:-5})
        birdSelectSound.play()
        return false;
    }
}
//fly the bird when mouse is released
function mouseReleased(){
    slingshot.fly();
    birdFlySound.play()
    birds.pop();
    gameState = "launched";
    return false;
}

//set next bird when space key is pressed
function keyPressed(){
    if((keyCode === 32) && gameState ==="launched"){
        if(birds.length>=0 ){   
            Matter.Body.setPosition(birds[birds.length-1].body, {x: 200 , y: 50});         
            slingshot.attach(birds[birds.length-1].body);
            
            gameState = "onSling";
            birdSelectSound.play()
        }
        
    }
    
}


async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    
}
