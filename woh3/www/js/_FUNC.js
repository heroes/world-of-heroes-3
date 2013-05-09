var _FUNC = {
  //预加载图片
  preloadIMG:function(dic,callback){
    var total_count = 0,
        loading_count = 0,
        resourceDic = {};
    //统计资源文件的数量
    for(var key in dic){total_count++;}
    //预加载图片
    for(var key in dic){
      var img = new Image();
      img.src = dic[key];
      img.key = key;
      img.onload = function(){
        resourceDic[this.key] = this;
        loading_count++;
        if(loading_count === total_count) callback(resourceDic);
      }
    }
  }
}