let body;
let ctx ;
let scoreBoard;

let boxSize=20  ;
let row=30;
let column=30;
let w;
let h;

let snakeX=0;
let snakeY=0;

let foodX;
let foodY;
let movX=0;
let movY=0;
let foodNum;

let SNAKE_SPEED=8;
let snakeBody=[];
let score=0;

let selectedSnake;

let setBoardSize =function(){
    w=row*boxSize;
    h=column*boxSize;
    body.width=w;
    body.height=h;
}

function setGround(){
   
    for(let i=0;i<w;i+=boxSize){
        for(let j=0;j<h;j+=boxSize){           
            if((i/boxSize+j/boxSize)%2==0){
                ctx.fillStyle="#8AE600";
            }
            else{
                ctx.fillStyle="#7ACC00";
            }
            ctx.fillRect(i,j,boxSize,boxSize);
        }
    }
}

function start(){
    window.open("index.html"); 

}


const snakeBodies=["./media/Orangebody.png","./media/Purplebody.png","./media/Bluebody.png"]
const snakeHeadUps=["./media/OrangeheadUp.png","./media/PurpleheadUp.png","./media/BlueheadUp.png"]
const snakeHeadDowns=["./media/OrangeheadDown.png","./media/PurpleheadDown.png","./media/BlueheadDown.png"]
const snakeHeadLefts=["./media/OrangeheadLeft.png","./media/PurpleheadLeft.png","./media/BlueheadLeft.png"]
const snakeHeadRights=["./media/OrangeheadRight.png","./media/PurpleheadRight.png","./media/BlueheadRight.png"]


let snakeB;
let headDown;
let headUp;
let headLeft;
let headRight;
let fs;
let myInterval;
let wallHackValue=true;


window.addEventListener('load', function1);


function function1(){   
   
    if(window.opener.document!=null){
        
        boxSize=parseInt(window.opener.document.getElementById("form1").elements[0].value);
        row=parseInt(window.opener.document.getElementById("form1").elements[1].value);
        column=parseInt(window.opener.document.getElementById("form1").elements[2].value);
        SNAKE_SPEED=parseInt(window.opener.document.getElementById("form1").elements[3].value);
    }
    // boxSize=parseInt(window.opener.document.getElementById("form1").elements[0].value);
    // row=parseInt(window.opener.document.getElementById("form1").elements[1].value);
    // column=parseInt(window.opener.document.getElementById("form1").elements[2].value);
    // SNAKE_SPEED=parseInt(window.opener.document.getElementById("form1").elements[3].value);
    var ele=window.opener.document.getElementById("form2");
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            selectedSnake=parseInt(ele[i].value);
        }
    }
    var wallHack=window.opener.document.getElementById("form3");
    if(wallHack[1].checked){
        wallHackValue=false;
    }
    

    snakeB=new Image();
    snakeB.src=snakeBodies[selectedSnake];

    headDown=new Image();
    headDown.src=snakeHeadDowns[selectedSnake];

    headUp=new Image();
    headUp.src=snakeHeadUps[selectedSnake];

    headLeft=new Image();
    headLeft.src=snakeHeadLefts[selectedSnake];

    headRight=new Image();
    headRight.src=snakeHeadRights[selectedSnake];
    
    body=document.getElementById("canvas");
    scoreBoard=document.getElementById("point");
    ctx=body.getContext('2d');
    setBoardSize();
    placeFood();
    document.addEventListener("keyup",changeDirection);

    myInterval=setInterval(update,1000/SNAKE_SPEED);
    
}

const apple=new Image();
apple.src="./media/apple.png";

const cherry=new Image();
cherry.src="./media/cherry.png";

const strawberry=new Image();
strawberry.src="./media/strawberry.png";

const banana=new Image();
banana.src="./media/banana.png";

const baklava=new Image();
baklava.src="./media/baklava.png";

let foods=[apple,strawberry,cherry,banana,baklava];
let values=[5,15,10,20,50];

 

let over=false;

function gameOver() {

    clearInterval(myInterval);
    
    return;
}

function update(){

    if(over){
        
        // fs=document.getElementById("fScore");
        // fs.innerHTML="Your Score is: 10" ;  
        window.open("gameover.html","_self");
        gameOver();
        return;
    }
    setGround();
    ctx.drawImage(foods[foodNum],foodX,foodY,boxSize,boxSize);
    if(snakeX==foodX&&snakeY==foodY){
        snakeBody.push([foodX, foodY])
        score+=values[foodNum];
        document.getElementById("point").innerHTML=score;
        placeFood();
    }
    
    for(let i=snakeBody.length-1;i>=1;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }
    
    
    snakeX+=movX*boxSize;
    snakeY+=movY*boxSize;
    
    if(movX==-1){
        ctx.drawImage(headLeft,snakeX,snakeY,boxSize,boxSize);
    }
    else if(movX==1){
        ctx.drawImage(headRight,snakeX,snakeY,boxSize,boxSize);
    }
    else if(movY==-1){
        ctx.drawImage(headUp,snakeX,snakeY,boxSize,boxSize);    
    }
    else if(movY==1){
        ctx.drawImage(headDown,snakeX,snakeY,boxSize,boxSize);
    }
    else{
        ctx.drawImage(headDown,snakeX,snakeY,boxSize,boxSize);
    }
    
    
    for(let i =0;i<snakeBody.length;i++){
         ctx.drawImage(snakeB,snakeBody[i][0],snakeBody[i][1],boxSize,boxSize);
    }
    
    if(wallHackValue){
        if(snakeX<0){
        snakeX=w;
        }
        if(snakeY<0){
            snakeY=h;
        }
        if(snakeX>w){
            snakeX=0;
        }
        if(snakeY>h){
            snakeY=0;   
        }
    }
    if(!wallHackValue){
        
        if (snakeX < 0 || snakeX > column*boxSize || snakeY < 0 || snakeY > row*boxSize) {

            over = true;
        }

    }

    

    for(let i =1;i<snakeBody.length;i++){
        if(snakeBody[i][0]==snakeX&&snakeBody[i][1]==snakeY){
            over=true;
        }
    }
    
}



function changeDirection(e){
    if(e.code=="ArrowUp" &&movY!=1){
        movX=0;
        movY=-1;
    }
    if(e.code=="ArrowDown"&&movY!=-1){
        movX=0;
        movY=1;
    }
    if(e.code=="ArrowLeft"&&movX!=1){
        movX=-1;
        movY=0;
    }
    if(e.code=="ArrowRight" &&movX!=-1){
        movX=1;
        movY=0;
    }
}


function placeFood() {
    foodX = Math.floor(Math.random() * (w/boxSize)) * boxSize ;
    foodY = Math.floor(Math.random() * (h/boxSize)) *boxSize;
    foodNum=Math.floor(Math.random() * foods.length);
}