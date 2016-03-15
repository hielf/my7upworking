define(["require","exports"],function(a,b){var c=function(){function a(a){void 0===a&&(a=null),this._target=a,this._destructed=!1,this._events={},this._eventsSingle={},this._target||(this._target=this)}return a.prototype.throwAlreadyDestructed=function(){throw"eventDispatcher already distructed"},a.prototype.emptyArray=function(a){for(;a.length>0;)a.pop()},a.prototype.addEventListener=function(a,b,c){void 0===c&&(c=!1),this._destructed&&this.throwAlreadyDestructed(),c?(this._eventsSingle.hasOwnProperty(a)||(this._eventsSingle[a]=[]),this._eventsSingle[a].push(b)):(this._events.hasOwnProperty(a)||(this._events[a]=[]),this._events[a].push(b))},a.prototype.dispatchEvent=function(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];if(this._destructed&&this.throwAlreadyDestructed(),this._events.hasOwnProperty(a))for(var d=0,e=this._events[a].length;e>d;++d)this._events[a][d].apply(this._target,b);if(this._eventsSingle.hasOwnProperty(a)){for(var d=0,e=this._eventsSingle[a].length;e>d;++d)this._eventsSingle[a][d].apply(this._target,b);this.emptyArray(this._eventsSingle[a])}},a.prototype.removeAllEventListeners=function(a){if(this._destructed&&this.throwAlreadyDestructed(),"undefined"==typeof a){for(var b in this._events)this._events.hasOwnProperty(b)&&(this.emptyArray(this._events[b]),this._events[b]=null);for(var b in this._eventsSingle)this._eventsSingle.hasOwnProperty(b)&&(this.emptyArray(this._eventsSingle[b]),this._eventsSingle[b]=null)}else this._events.hasOwnProperty(a)&&this.emptyArray(this._events[a]),this._eventsSingle.hasOwnProperty(a)&&this.emptyArray(this._eventsSingle[a])},a.prototype.removeEventListener=function(a,b){if(this._destructed&&this.throwAlreadyDestructed(),this._events[a])for(var c=0,d=this._events[a].length;d>c;++c)if(this._events[a][c]===b)return void this._events[a].splice(c,1);if(this._eventsSingle[a])for(var c=0,d=this._eventsSingle[a].length;d>c;++c)if(this._eventsSingle[a][c]===b)return void this._eventsSingle[a].splice(c,1)},a.prototype.destruct=function(){this._destructed&&this.throwAlreadyDestructed(),this._destructed=!0,this._events=null,this._eventsSingle=null},a}();return c});
//# sourceMappingURL=../../../../../sourcemap/lib/createjs/easeljs/component/EventDispatcher.js.map