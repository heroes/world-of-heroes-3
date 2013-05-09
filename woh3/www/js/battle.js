(function(){
  var start = function(dic){
    var ctx_ground = document.getElementById("ctx-ground");  
    //获取屏幕的宽高
    var screenW = window.innerWidth; 
    var screenH = window.innerHeight;
    alert(screenH);
    //设置人物层的宽高
    var ctx_item = document.getElementById("ctx-item"),
        ctx_role = document.getElementById("ctx-role");
        ctx_role.setAttribute("width",screenW);
        ctx_role.setAttribute("height",screenH);
        ctx_item.setAttribute("width",screenW);
        ctx_item.setAttribute("height",screenH);
        document.body.style.width = screenW+"px";

    //设置地图的初始位置
    ctx_ground.style.bottom = 0;
    _MAP.drawMap(ctx_ground,config.maps.section1,50,50,dic);

  }
  _FUNC.preloadIMG(config.resourceImg["section1"],start);
  
})();