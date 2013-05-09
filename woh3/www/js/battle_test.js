(function(){
var battle_stage = document.getElementById("battle");
var ctx = document.getElementById("battle").getContext("2d");
var init = function(){
    var stageSize = {
        width:0,
        height:0
    }
    battle_stage.setAttribute("height",stageSize.height = window.innerHeight-5);
    battle_stage.setAttribute("width",stageSize.width = window.innerWidth);
 
    var loading_count = 0,total_count = 2;
 
    var resourceDic={
        cao:"img/cao.png",
        walking:"img/walking.png",
    };
 
    var step = 0,state = 0,posX = 0,posY=0;
    var mapMoveStep = function(state){
        var move = {x:0,y:0}
        switch(state){
            case 0:move.x=5;move.y=0;break;
            case 1:move.x=-5;move.y=0;break;
            case 2:move.x=0;move.y=-5;break;
            case 3:move.x=0;move.y=5;break;
            default:break;
        }
        return move;
    }
    var drawAnimation = function(){
        //console.log("111");
        ctx.clearRect(0,0,stageSize.width,stageSize.height);
 
        var sw = parseInt(stageSize.width/50);
        var sh = parseInt(stageSize.height/50);
        for(var i=0;i<=sw;i++){
            for(var j=0;j<sh;j++){
                ctx.drawImage(resourceDic.cao,50*i,50*j,50,50);
            }
        }
        var move = mapMoveStep(state);
        if(step === 0){
            ctx.drawImage(resourceDic.walking,0+200*state,0,100,100,(posX+=move.x),(posY+=move.y),100,100);
            step++;
            console.log(step);
        }
        else{
            ctx.drawImage(resourceDic.walking,100+200*state,0,100,100,(posX+=move.x),(posY+=move.y),100,100);
            step--;
            console.log(step);
        }
        //console.log("222");
    }
 
    var loop = function(){
        drawAnimation();
        //requestAnimationFrame(loop);
        setTimeout(loop,1000/12);
    }
 
    for(var key in resourceDic){
        var img = new Image();
        img.src = resourceDic[key];
        img.key = key;
        img.onload = function(){
            resourceDic[this.key] = this;
            loading_count++;
            if(loading_count === total_count) loop();
        }
    }
    $$("#battle").swipeRight(function(){
                          state = 0;
                         });
    $$("#battle").swipeLeft(function(){
                          state = 1;
                         });
    $$("#battle").swipeUp(function(){
                          state = 2;
                         });
    $$("#battle").swipeDown(function(){
                          state = 3;
                         });
}
 init();
})();