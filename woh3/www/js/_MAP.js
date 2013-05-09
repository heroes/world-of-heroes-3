var _MAP = {
  //绘制背景的函数:
  drawMap:function(ctx,config,blockW,blockH,dic){
    var cfg = config,c, _w = blockW, _h = blockH, l_w = parseInt(cfg.width) + 2,l_h = parseInt(cfg.height) + 2;
    ctx.width = _w * l_w;
    ctx.height = _h * l_h;
    var c = ctx.getContext("2d");
    for(var i=0;i<l_w;i++){
      for(var j=0;j<l_h;j++){
        if(i === 0||j === 0||i === l_w - 1 ||j===l_h - 1){
          console.log(i,j);
          c.drawImage(dic[cfg.edge],i * _w,j*_h,_w,_h);
        }
      }
    }

    ctx.move = function(direction){
      switch(direction){
        case "left":break;
        case "right":break;
        case "up":break;
        case "dowm":break;
        default: break; 
      }
    };
    ctx.clearAll = function(){
      this.outerHTML = this.outerHTML;  
    }  
    return ctx;
  }
};