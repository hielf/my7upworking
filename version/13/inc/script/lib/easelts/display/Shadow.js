define(["require","exports"],function(a,b){var c=function(){function a(a,b,c,d){this.color=null,this.offsetX=0,this.offsetY=0,this.blur=0,this.color=a,this.offsetX=b,this.offsetY=c,this.blur=d}return a.prototype.toString=function(){return"[Shadow]"},a.prototype.clone=function(){return new a(this.color,this.offsetX,this.offsetY,this.blur)},a.identity=null,a}();return c.identity=new c("transparent",0,0,0),c});
//# sourceMappingURL=../../../../sourcemap/lib/easelts/display/Shadow.js.map