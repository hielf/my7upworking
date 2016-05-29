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
define(["require", "exports", "lib/createts/event/Signal", "./../bubble/AbstractBubbleLayerContainer", "lib/easelts/display/Text", "lib/easelts/display/Bitmap", "../../../../config/CanvasSettings", "../../../../data/enum/Font", "lib/createts/utils/Ticker"], function(a, b, c, d, e, f, g, h, i) {
    var j = function(a) {
        function b() {
            a.call(this, 0, 0, 0, 0, "50%", 0),
            this.signals = {
                transitionInStarted: new c,
                transitionOutStarted: new c
            },
            this._enableMask = !0,
            this._text = "",
            this.init()
        }
        return __extends(b, a),
        b.prototype.init = function() {
			

			var w= 170,h=75;
			this.width = w,
            this.height = h,
            this.addBubbleLayers(0, 900, 60),
            this._textField = new f("inc/image/sub-logo.png",170,75,"50%","50%","50%","50%");
            this._textField.cache(0, 0, w, h),
            this._maskMap = new f("inc/image/sub-logo.png",170,75,"50%","50%","50%","50%"),
            this._maskMap.visible = !1,
            this.addChild(this._maskMap),
            this._resultMap =  new f("inc/image/sub-logo.png",170,75,"50%","50%","50%","50%"),
            this._resultMap.alpha = 0,
            this.addChild(this._resultMap),
            this.bubbleLayerContainer.visible = !1,
            this._enableMask && (this._maskMap.compositeOperation = "destination-in",
            this.cache(0, 0, w, h))
        }
        ,
        b.prototype.setText = function(a, b) {
            void 0 === b && (b = !0),
            this._text != a && (a = a.toUpperCase(),
            b ? this._transitionAnimation ? this._targetText = a : this._text && "" != this._text ? (this._targetText = a,
            this._transitionAnimation || this.transitionTextOut()) : this.applyNewText(a, b) : this.applyNewText(a, !1))
        }
        ,
        b.prototype.applyNewText = function(a, b) {
			
			
            var c = this;
            this._text = a,
            this._targetText = null ,
            this._textField.uncache();
           // this._textField.text = a;
            //var d = this._textField.getExactSize();
           // this._textField.cache(0, 0, d.x1, d.y1 + 5),
           // this.setWidth(d.x1),
           // this.setHeight(d.y1 + 5),
            this._enableMask && i.getInstance().tickSignal.connect(function() {
                c.cache(0, 0, c.width, c.height)
            }
            ).once(),
           // this._maskMap.image = this._textField.cacheCanvas,
            //this._resultMap.image = this._textField.cacheCanvas,
            b ? this.transitionTextIn() : (this.endTransition(),
            this._resultMap.alpha = 1)
        }
        ,
        b.prototype.transitionTextIn = function() {
            this.startTransition(),
            this.signals.transitionInStarted.emit(),
            this._transitionAnimation = new TimelineMax({
                align: "normal"
            });
            for (var a = this._bubbleLayers.length, b = .5 + .3 * a, c = 0; 3 > c; c++) {
                var d = this._bubbleLayers[c];
                d.x = .5 * this.width,
                d.y = this.height;
                var e = b - .5 * b * c / (a - 1)
                  , f = b - e
                  , g = .5 * Math.random() ? "-=80" : "+=80";
                this._transitionAnimation.insert(TweenMax.to(d, e, {
                    y: -d.height + this.height,
                    delay: f,
                    ease: Sine.easeOut
                })),
                this._transitionAnimation.insert(TweenMax.to(d, 3, {
                    x: g,
                    repeat: -1,
                    yoyo: !0,
                    delay: f * c,
                    ease: Sine.easeInOut
                }))
            }
            this._transitionAnimation.add(TweenMax.to(this._resultMap, .5, {
                alpha: 1,
                ease: Linear.easeNone,
                onComplete: this.onTransitionInComplete.bind(this)
            }), b - .5)
        }
        ,
        b.prototype.onTransitionInComplete = function() {
            this.endTransition(),
            this._targetText && this.setText(this._targetText, !0)
        }
        ,
        b.prototype.transitionTextOut = function() {
            this.startTransition(),
            this.signals.transitionOutStarted.emit(),
            this._transitionAnimation = new TimelineMax({
                align: "normal"
            });
            for (var a = this._bubbleLayers.length, b = .3 * a, c = a - 1; c >= 0; c--) {
                var d = this._bubbleLayers[c];
                d.x = .5 * this.width,
                d.y = 0;
                var e = b - .5 * b * c / (a - 1)
                  , f = .5 * Math.random() ? "-=80" : "+=80";
                this._transitionAnimation.insert(TweenMax.to(d, e, {
                    y: -d.height,
                    ease: Sine.easeIn
                })),
                this._transitionAnimation.insert(TweenMax.to(d, 3, {
                    x: f,
                    repeat: -1,
                    yoyo: !0,
                    ease: Sine.easeInOut
                }))
            }
            this._transitionAnimation.insert(TweenMax.to(this._resultMap, .5, {
                alpha: 0,
                ease: Linear.easeNone
            })),
            TweenMax.delayedCall(b, this.onTransitionOutComplete.bind(this))
        }
        ,
        b.prototype.onTransitionOutComplete = function() {
            this.endTransition(),
            "" == this._targetText ? (this._text = "",
            this._targetText = null ) : this._targetText && this.applyNewText(this._targetText, !0)
        }
        ,
        b.prototype.startTransition = function() {
            var a = this;
            this._maskMap.visible = !0,
            this.bubbleLayerContainer.visible = !0,
            this._enableMask && (this._tickerSignalConnection = i.getInstance().tickSignal.connect(function() {
                a.updateCache()
            }
            ))
        }
        ,
        b.prototype.endTransition = function() {
            this._transitionAnimation && (this._transitionAnimation.kill(),
            this._transitionAnimation = null ),
            TweenMax.killTweensOf(this._bubbleLayers),
            this._maskMap.visible = !1,
            this.bubbleLayerContainer.visible = !1,
            this._tickerSignalConnection && (this._tickerSignalConnection.dispose(),
            this._tickerSignalConnection = null ),
            this.updateCache()
        }
        ,
        b.prototype.destruct = function() {
            a.prototype.destruct.call(this)
        }
        ,
        b
    }
    (d);
    return j
}
);
//# sourceMappingURL=../../../../../../sourcemap/app/page/home-canvas/component/title/AnimatingTitle.js.map
