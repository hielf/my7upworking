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
define(["require", "exports", "./../bubble/AbstractBubbleLayerContainer", "lib/easelts/display/Text", "lib/easelts/display/Bitmap", "app/data/enum/Font", "app/config/CanvasSettings", "lib/createts/utils/Ticker", "app/util/StageProvider"], function(a, b, c, d, e, f, g, h, i) {
    var j = function(a) {
        function b(b) {
            a.call(this, 0,0,"50%",0,"50%"),
            this.init(b)
        }
        return __extends(b, a),
        b.prototype.init = function(a) {
			
			
            this._maskText =new e("inc/image/sub-logo.png",170,75,"50%","50%","50%","50%");
           // var b = this._maskText.getExactSize();
            this._maskText.compositeOperation = "destination-in",
            this.width = 170,
            this.height = 75,
            this._maskText.width = this.width,
            this._maskText.height = this.height,
            //this._maskText.cache(0, 0, this.width, this.height),
            this.addChild(this._maskText),
            this.addBubbleLayers(g.introNumExtraBubbleLayers,null,500),
            this._foregroundText = new e("inc/image/sub-logo.png",170,75,"50%","50%","50%","50%"),
            this._foregroundText.alpha = 0,
            this.addChild(this._foregroundText),
            this.cache(0, 0, this.width, this.height),
            this.visible = !1
        }
        ,
        b.prototype.getTransitionInAnimation = function() {
            for (var a = new TimelineMax({
                align: "normal"
            }), b = this._bubbleLayers.length, c = 7, d = 0; b > d; d++) {
                var e = this._bubbleLayers[d]
                  , f = c - .35 * c * d / (b - 1)
                  , g = c - f
                  , h = 15 * (d + 1)
                  , i = d % 2 == 0 ? "-=" + h : "+=" + h;
                a.insert(TweenMax.to(e, f, {
                    y: -e.height + this.height,
                    delay: g,
                    ease: Linear.easeNone
                })),
                a.insert(TweenMax.to(e, 2, {
                    x: i,
                    repeat: -1,
                    yoyo: !0,
                    delay: 1.2 * d,
                    ease: Sine.easeInOut
                }))
            }
            return a.add(TweenMax.to(this._foregroundText, 2, {
                alpha: 1,
                ease: Linear.easeNone,
                onComplete: this.onTransitionInComplete.bind(this)
            }), c - 2),
            a
        }
        ,
        b.prototype.transitionIn = function() {
            var a = this;
            this._tickerSignalConnection = h.getInstance().tickSignal.connect(function() {
                a.updateCache()
            }
            ),
            this.visible = !0,
            this.getTransitionInAnimation()
        }
        ,
        b.prototype.onTransitionInComplete = function() {
            TweenMax.set(this._bubbleLayers, {
                alpha: 0
            }),
            TweenMax.killTweensOf(this._bubbleLayers),
            this.removeAllChildren(),
            this.addChild(this._foregroundText),
            this.uncache(),
            this._tickerSignalConnection.dispose(),
            this._tickerSignalConnection = null 
        }
        ,
        b.prototype.transitionOut = function() {
            TweenMax.to(this, 2, {
                y: -i.getStage().height * (1 / this.parent.scaleX),
                ease: Quint.easeIn,
                delay: .2
            })
        }
        ,
        b
    }
    (c);
    return j
}
);
//# sourceMappingURL=../../../../../../sourcemap/app/page/home-canvas/component/intro/IntroTitle.js.map
