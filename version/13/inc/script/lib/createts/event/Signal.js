var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c};define(["require","exports","./SignalAbstract"],function(a,b,c){var d=function(a){function b(){a.apply(this,arguments)}return __extends(b,a),b.prototype.emit=function(){var a=this;this.dispatching()?this.defer(function(){return a.emitImpl()}):this.emitImpl()},b.prototype.emitImpl=function(){for(var a=this.willEmit(),b=a;null!=b;)b._listener(),b.stayInList||b.dispose(),b=b._next;this.didEmit(a)},b}(c);return d});
//# sourceMappingURL=../../../../sourcemap/lib/createts/event/Signal.js.map