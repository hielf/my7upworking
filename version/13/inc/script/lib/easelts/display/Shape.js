var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c};define(["require","exports","./Graphics","./DisplayObject","../enum/DisplayType"],function(a,b,c,d,e){var f=function(a){function b(b,d,e,f,g,h,i){void 0===d&&(d=1),void 0===e&&(e=1),void 0===f&&(f=0),void 0===g&&(g=0),void 0===h&&(h=0),void 0===i&&(i=0),a.call(this,d,e,f,g,h,i),this.type=4,this.graphics=b?b:new c}return __extends(b,a),b.prototype.isVisible=function(){var a=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.prototype.draw=function(b,c){return a.prototype.draw.call(this,b,c)?!0:(this.graphics.draw(b,this),!0)},b.prototype.clone=function(a){void 0===a&&(a=!1);var c=new b(a&&this.graphics?this.graphics.clone():this.graphics);return this.cloneProps(c),c},b.prototype.toString=function(){return"[Shape ()]"},b}(d);return f});
//# sourceMappingURL=../../../../sourcemap/lib/easelts/display/Shape.js.map