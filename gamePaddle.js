var context = document.getElementById("canvas").getContext("2d");
var   showPoint = document.getElementById("showPoint");
var x=20;
var y=20;
var radius =20;
var speedX=3;
var speedY=7;
var player={
      width:100,
      height:20,
      x:0,
      y:canvas.clientHeight-20,
      step:10,
}
var isMoveLeft=false;
var isMoveRight=false;
//----------------------
function setPleyer(){
    context.beginPath();
    context.rect(player.x,player.y,player.width,player.height);
    context.fillStyle="black";
    context.fill();
    context.closePath();
}

function setBall(){
    context.beginPath();
    context.arc(x,y,radius,0,2*Math.PI);
    context.fillStyle="blue";
    context.fill();
    context.closePath();
}

//-------------------------
function moveBall(){
    x+=speedX;
    y+=speedY;
}
function ballTouchCanvas(){
    if( x<0 || x>canvas.clientWidth-radius){
         speedX=-speedX;
    }
    if(y<0){
     speedY=-speedY;
   }
   if(y>canvas.clientHeight){
       alert("Game Over");
       y=20;
       x=20;
   }
}
document.addEventListener("keydown",function(event){
    if(event.keyCode===37){
        isMoveLeft=true;
    }else{
        if(event.keyCode===39){
            isMoveRight=true
        }
    }
})
document.addEventListener("keyup",function(event){
    if(event.keyCode===37){
        isMoveLeft=false;
    }else{
        if(event.keyCode===39){
            isMoveRight=false
        }
    }
})
function movePlayer(){
     if(isMoveRight){
         player.x+=player.step;
     }else{
         if(isMoveLeft){
             player.x-=player.step;
         }
     }
}
function ballTouchPabble(){
 if(x>player.x && x<player.x+100 && y>canvas.clientHeight-player.height && y<canvas.clientHeight){
     speedY=-speedY
     showPoint.textContent=parseFloat(showPoint.textContent)+1;
 }

}
function pabbleTouchCanvas(){
if( player.x<0){
    player.x=0;
}
if(player.x > canvas.clientWidth-player.width){
    player.x=canvas.clientWidth-player.width;
}
}
function runCanvas(){
    context.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    setBall();
    moveBall();
    ballTouchCanvas()
    setPleyer();
    movePlayer();
    ballTouchPabble();
    pabbleTouchCanvas();
    requestAnimationFrame(runCanvas)
}
runCanvas()