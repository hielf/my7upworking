var __extends = this.__extends || function(a, b) {
    function c() {
        this.constructor = a
    }
    for (var d in b)
        b.hasOwnProperty(d) && (a[d] = b[d]);
    c.prototype = b.prototype,
    a.prototype = new c
}
;
define(["require", "exports", "lib/easelts/display/Container", "./Logo", "./IntroTitle", "../bubble/BubbleEmitter", "app/data/DataManager", "../bubble/config/IntroBubbleConfig", "app/config/CanvasSettings", "app/util/PlatformProfiler"], function(a, b, c, d, e, f, g, h, i, j) {
    var k = function(a) {
        function b() {
            a.call(this, 0, 0, "50%", "50%", "50%", "50%"),
            this.init()
        }
        return __extends(b, a),
        b.prototype.init = function() {
            this.logo = new d,
            this.title = new e("#1111FEELSGOODTOBEYOU"),
            this.title.y = this.logo.height,
            this.width = Math.max(this.logo.width, this.title.width),
            this.height = this.title.y + this.title.height,
            this.addChild(this.logo, this.title),
            this._bubbleConfig = new h,
            this.createEmitters(),
            this.visible = !1
        }
        ,
        b.prototype.createEmitters = function() {
            i.useIntroEmitters && (this._emitter1 = this.createEmitter(),
            this._emitter1.x = 32,
            this._emitter1.y = 368,
            this.addChild(this._emitter1),
            this._emitter2 = this.createEmitter(),
            this._emitter2.x = 475,
            this._emitter2.y = 368,
            this.addChild(this._emitter2),
            this._emitter3 = this.createEmitter(),
            this._emitter3.x = 415,
            this._emitter3.y = 110,
            this.addChild(this._emitter3),
            this._emitter4 = this.createEmitter(),
            this._emitter4.x = 180,
            this._emitter4.y = 40,
            this.addChild(this._emitter4),
            this._emitter5 = this.createEmitter(),
            this._emitter5.x = 365,
            this._emitter5.y = 0,
            this.addChild(this._emitter5))
        }
        ,
        b.prototype.createEmitter = function() {
            var a = new f(g.getInstance().smallBubblePool,.15,this._bubbleConfig);
            return a.width = 1,
            a.useAutoUpdate = !0,
            a.scaleX = .5,
            a.scaleY = .5,
            a
        }
        ,
        b.prototype.transitionIn = function() {
            var a = this;
            this.visible = !0,
            this.logo.transitionIn(),
            this.title.transitionIn(),
            i.useIntroEmitters && (TweenMax.delayedCall(.5, function() {
                return a._emitter1.startEmitting(4800)
            }
            ),
            TweenMax.delayedCall(.5, function() {
                return a._emitter2.startEmitting(4800)
            }
            ),
            TweenMax.delayedCall(2.4, function() {
                return a._emitter3.startEmitting(2800)
            }
            ),
            TweenMax.delayedCall(3.2, function() {
                return a._emitter4.startEmitting(2300)
            }
            ),
            TweenMax.delayedCall(3.6, function() {
                return a._emitter5.startEmitting(1800)
            }
            ))
        }
        ,
        b.prototype.transitionOut = function() {
            this.logo.transitionOut(),
            j.getInstance().isMobile ? this.title.transitionOut() : this.title.visible = !1
        }
        ,
        b.prototype.onResize = function(b) {
            a.prototype.onResize.call(this, b);
            var c = Math.min((b.width - 100) / this.width, 1)
              , d = Math.min((b.height - 100) / this.height, 1)
              , e = Math.min(c, d);
            this.scaleX = e,
            this.scaleY = e
        }
        ,
        b
    }
    (c);
    return k
}
);
//# sourceMappingURL=../../../../../../sourcemap/app/page/home-canvas/component/intro/Intro.js.map
