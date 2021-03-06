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
define(["require", "exports", "../../../../../lib/easelts/display/Container", "../bubble/BubbleEmitter", "app/util/PlatformProfiler", "app/data/DataManager", "../bubble/config/CategoryTitleBubbleConfig", "app/config/CanvasSettings", "./AnimatingTitle", "./AnimatingTitleMobile", "lib/easelts/geom/Size"], function(a, b, c, d, e, f, g, h, i, j, k) {
    var l = function(a) {
        function b() {
            a.call(this, 0, 0, 0, 0, "50%", 0),
            this._defaultTitle = "#11111111FEELSGOODTOBEYOU",
            this._isEnabled = !0,
            this._isMobile = !1,
            this._baseY = 65,
            this._titleY = 0,
            this._scale = 1,
            this._autoResize = !1,
            this.init()
        }
        return __extends(b, a),
        b.prototype.init = function() {
            this._isMobile = e.getInstance().isMobile,
            this._defaultTitle = this._isMobile ? "#FEELSGOOD\nTOBEYOU" : "#FEELSGOODTOBEYOU";
            f.getInstance().articleModel.getCategories();
            this._smallEmitter = new d(f.getInstance().smallBubblePool,1,new g);
            this._smallEmitter.width = 100;
            this._smallEmitter.useAutoUpdate = !0;
            this.addChild(this._smallEmitter);
            h.useTitleBubbleTransitions ? this._title = new i : this._title = new j;
            this._title.setX("50%");
            this._title.signals.transitionOutStarted.connect(this.onTextTransitionOutStarted.bind(this)),
            this.addChild(this._title),
            this._baseY = this._isMobile ? 110 : 65,
            this.visible = !1
        }
        ,
        b.prototype.show = function(a) {
            var b = this;
            void 0 === a && (a = !1),
            this.visible = !0,
            this.updatePositionProperties(),
              document.getElementById("prelayer").style.display="block",

            a ? (this.applyPositionProperties(),
            this._autoResize = !0) : new TimelineMax({
                tweens: [TweenMax.to(this._title, 3, {
                    y: this._titleY,
                    ease: Quint.easeInOut
                }), TweenMax.to(this, 3, {
                    y: this._baseY,
                    scaleX: .9,
                    scaleY:.9,
                    ease: Quint.easeInOut
                })],
                delay: .5,
                onComplete: function() {
                    b._autoResize = !0;
					 document.getElementById("rotate-logo").classList.add("rotate");
					 document.getElementById("rotate-logo").addEventListener("webkitAnimationEnd", function(){
						 document.getElementById("rotate-logo").classList.remove("rotate");
						 setTimeout(function(){
							 document.getElementById("rotate-logo").classList.add("rotate");

						 },5000)

					 });

                }
            })
        }
        ,
        b.prototype.changeCategory = function(a, b) {
            void 0 === b && (b = !0),
            this._currentCategory = a,
            this._isEnabled && (a ? this._title.setText(a.pageTitle, b) : this._title.setText(this._defaultTitle, b))
        }
        ,
        b.prototype.enable = function() {
            this._isEnabled || (this._currentCategory ? this._title.setText(this._currentCategory.pageTitle) : this._title.setText(this._defaultTitle),
            this._isEnabled = !0)
        }
        ,
        b.prototype.disable = function() {
            this._isEnabled && (this._title.setText(""),
            this._isEnabled = !1)
        }
        ,
        b.prototype.emitBubbles = function(a) {
            void 0 === a && (a = 0),
            this._isMobile || (this._smallEmitter.y = this._title.y + this._title.height - 5 + a,
            this._smallEmitter.width = this._title.width - 40,
            this._smallEmitter.startEmitting(500))
        }
        ,
        b.prototype.onTextTransitionOutStarted = function() {
            this.emitBubbles()
        }
        ,
        b.prototype.updatePositionProperties = function() {
            if (!this._isMobile) {
                var a = new k(this.parent.width,this.parent.height);
                if (a.width > 400)
                    var b = a.width - 300
                      , c = Math.min(b / this._title.width, 1);
                else
                    var c = Math.min((a.width - 100) / this._title.width, 1);
                if (a.height > 750) {
                    var d = Math.min((a.height - 100) / this._title.height, 1);
                    this._titleY = 0
                } else {
                    var d = .7;
                    this._titleY = -30
                }
                this._scale = Math.min(c, d)
            }
        }
        ,
        b.prototype.applyPositionProperties = function() {

			console.log(this._scale);
            this.y = this._baseY,
            this.scaleX = this.scaleY = this._scale,
            this._title.y = this._titleY
        }
        ,
        b.prototype.onResize = function(b) {
            a.prototype.onResize.call(this, b),
            this._autoResize && !this._isMobile && (this.updatePositionProperties(),
            this.applyPositionProperties())
        }
        ,
        b
    }
    (c);
    return l
}
);
//# sourceMappingURL=../../../../../../sourcemap/app/page/home-canvas/component/title/CategoryTitle.js.map
