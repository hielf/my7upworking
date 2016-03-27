var __extends = this.__extends ||
function(a, b) {
    function c() {
        this.constructor = a
    }
    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
    c.prototype = b.prototype,
    a.prototype = new c
};
define(["require", "exports", "../../../../../lib/easelts/display/Container", "../../../../util/BindValue", "../../../../../lib/temple/utils/Bounds", "../../../../../lib/easelts/display/Bitmap", "../../../../../lib/easelts/display/Text", "../../../../util/StageProvider", "../../../../../lib/easelts/display/Shape", "../../../../../lib/temple/locale/LocaleManager", "../../../../data/enum/Font", "../../../../../lib/easelts/behavior/ButtonBehavior", "../../../../../lib/createts/utils/Ticker"],
function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = function(a) {
        function b() {
            var b = this;
            a.call(this, 300, 23, 0, 0, 0, "50%"),
            this._arrowLeft = new f("inc/image/icons/drag-arrow.png", 11, 7, 0, 0, "50%", "50%"),
            this._arrowRight = new f("inc/image/icons/drag-arrow.png", 11, 7, 0, 0, "50%", "50%"),
            this._xOffset = 0,
            this._mouseDown = !1,
            this.handleMouseDown = function() {
                b._mouseDown = !0,
                b._xOffset = b._stage.mouseX - b.x,
                TweenMax.fromTo(b._track, .8, {
                    scaleX: .5,
                    alpha: .2
                },
                {
                    scaleX: 1,
                    alpha: 0,
                    ease: Quint.easeOut
                }),
                b._stage.addEventListener("stagemousemove", b.handleMouseMove),
                b._stage.addEventListener("stagemouseup", b.handleMouseUp)
            },
            this.handleMouseMove = function() {
                if (b._mouseDown) {
                    var a = b._stage.mouseX - b.x - b._xOffset;
                    b.valueBinding.setValue(b._xBounds.translate(a, b.valueBounds))
                }
            },
            this.handleMouseUp = function() {
                b._mouseDown && (b._mouseDown = !1, b._stage.removeEventListener("stagemousemove", b.handleMouseMove), b._stage.removeEventListener("stagemouseup", b.handleMouseUp), TweenMax.to(b.valueBinding, .5, {
                    setValue: 0,
                    ease: Quint.easeOut
                }), b._xOffset = 0)
            },
            this.init()
        }
        return __extends(b, a),
        b.prototype.init = function() {
            this._stage = h.getStage(),
            this._xBounds = new e(.5 * -this.width, .5 * this.width),
            this.valueBounds = new e( - 1, 1),
            this.valueBinding = new d(0),
            this.valueBinding.changed.connect(this.onValueChanged.bind(this)),
            this._track = new i(null, this.width, this.height, 0, 0, "50%", "50%"),
            this._track.graphics.beginFill("#ffffff").drawRect(0, 0, this.width, this.height),
            this._track.alpha = 0,
            this.addChild(this._track),
            this._bar = new c(46, this.height);
            var a = new i(null, this._bar.width, this._bar.height, 0, 0, "50%", "50%");
            a.graphics.setStrokeStyle(2, "square", "bevel").beginStroke("#ffffff").drawRect(0, 0, a.width, a.height),
            a.cache( - 1, -1, a.width + 2, a.height + 2),
            a.enableMouseInteraction(),
            this._bar.addChild(a),
            this._arrowLeft.scaleX = -1,
            this._arrowLeft.x = .5 * -this._bar.width - 14,
            this._bar.addChild(this._arrowLeft),
            this._arrowRight.x = .5 * this._bar.width + 14,
            this._bar.addChild(this._arrowRight);
            var b = j.getInstance().getString("defaults.drag_to_explore").toUpperCase();
            this._label = new g(b, "12px " + k.DIN_MEDIUM, "#ffffff");
            var f = this._label.getExactSize();
            this._label.setRegX(.5 * f.x1),
            this._label.y = 16,
            this._label.cache(0, 0, f.x1, f.y1 + 3),
            this.addChild(this._label);
            var m = new i(null, a.width, a.height, .5 * -a.width, .5 * -a.height);
            m.graphics.beginFill("#000").drawRect(0, 0, a.width, a.height),
            this._bar.hitArea = m,
            this._bar.enableMouseInteraction(),
            this.addChild(this._bar),
            this.enableMouseInteraction(),
            this.mouseChildren = !1,
            this.addBehavior(new l),
            this.addEventListener(c.EVENT_MOUSE_DOWN, this.handleMouseDown.bind(this)),
            this.visible = !1
        },
        b.prototype.transitionIn = function() {
            this.visible = !0,
            new TimelineMax({
                delay: 1,
                align: "sequence",
                tweens: [TweenMax.from(this._bar, .5, {
                    scaleX: 0,
                    scaleY: 0,
                    ease: Back.easeOut
                }), TweenMax.from(this._arrowLeft, .3, {
                    alpha: 0,
                    x: "+=20",
                    ease: Quint.easeOut,
                    delay: -.1
                }), TweenMax.from(this._arrowRight, .3, {
                    alpha: 0,
                    x: "-=20",
                    ease: Quint.easeOut,
                    delay: -.2
                }), TweenMax.from(this._label, .3, {
                    alpha: 0
                }), TweenMax.to(this.valueBinding, .5, {
                    setValue: -.5,
                    ease: Sine.easeOut
                }), TweenMax.to(this.valueBinding, 1, {
                    setValue: .5,
                    ease: Quint.easeInOut
                }), TweenMax.to(this.valueBinding, .5, {
                    setValue: 0,
                    ease: Quint.easeOut,
                    delay: .5
                })]
            })
        },
        b.prototype.onValueChanged = function(a, b) {
            this._bar.x = this.valueBounds.translate(a, this._xBounds),
            this._arrowLeft.visible = -1 != a,
            this._arrowRight.visible = 1 != a,
            this._tickerSignalConnection || (this._tickerSignalConnection = m.getInstance().tickSignal.connect(this.onUpdate.bind(this)))
        },
        b.prototype.onUpdate = function(a) {
            var b = .8 * (this._bar.x - this._label.x) * a;
            Math.abs(b) > .05 ? this._label.x += b: (this._label.x = this._bar.x, this._tickerSignalConnection.dispose(), this._tickerSignalConnection = null)
        },
        b
    } (c);
    return n
});
//# sourceMappingURL=../../../../../../sourcemap/app/page/home-canvas/component/scroll/DragBar.js.map
