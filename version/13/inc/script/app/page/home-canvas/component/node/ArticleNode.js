var __extends = this.__extends ||
    function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        c.prototype = b.prototype,
            a.prototype = new c
    };
define(["require", "exports", "./ForceDirectedNode", "lib/easelts/display/Bitmap", "lib/easelts/display/Container", "./RoundImage", "lib/easelts/display/Text", "lib/easelts/display/Shape", "app/util/StageProvider", "../title/CircularText", "app/config/CanvasSettings", "app/data/enum/Font", "app/data/DataManager", "lib/temple/locale/LocaleManager", "lib/easelts/event/PointerEvent", "lib/temple/config/ConfigManager"],
    function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        var q = function(a) {
            function b(b, c) {
                var d = this;
                a.call(this, c, c),
                    this.isReady = !1,
                    this.isActive = !1,
                    this._isBecomingInactive = !1,
                    this._showStatus = !1,
                    this._categoryIconX = 0,
                    this._categoryIconY = 0,
                    this._data = null,
                    this._stage = null,
                    this._isMouseOvered = !1,
                    this._isExpanded = !1,
                    this._categoryTextEnabled = !0,
                    this._container = null,
                    this._glow = null,
                    this._image = null,
                    this._categoryText = null,
                    this._labelText = null,
                    this._statusText = null,
                    this._featuredText = null,
                    this._categoryIcon = null,
                    this._activeStateTransition = null,
                    this._isDestructed = !1,
                    this.onImageLoaded = function() {
                        d._image.removeEventListener(f.EVENT_LOAD_COMPLETE, d.onImageLoaded.bind(d)),
                            d.enableMouseInteraction(),
                            d._container.enableMouseInteraction(),
                            d._container.visible = !0,
                            d.isReady = !0,
                            TweenMax.to(d._image, .5, {
                                alpha: 1,
                                onComplete: function() {
                                    d._glow && TweenMax.to(d._glow, .5, {
                                        alpha: 1
                                    }),
                                    2 == d.getNumChildren() && d.removeChildAt(0),
                                    d.isActive && !d._isBecomingInactive && d.expand()
                                }
                            })
                    },
                    this.handleMouseOver = function(a) {
                        TweenMax.killTweensOf(d._image),
                            new TimelineMax({
                                tweens: [TweenMax.to(d._image, .2, {
                                    scaleX: 1.08,
                                    scaleY: 1.08,
                                    ease: Quad.easeOut
                                }), TweenMax.to(d._image, .3, {
                                    scaleX: .95,
                                    scaleY: .95,
                                    ease: Sine.easeInOut
                                }), TweenMax.to(d._image, .3, {
                                    scaleX: 1,
                                    scaleY: 1,
                                    ease: Sine.easeOut
                                })],
                                align: "sequence"
                            })
                    },
                    this.handleMouseOut = function(a) {},
                    this.handleClick = function(a) {
                        TweenMax.killTweensOf(d._image),
                            new TimelineMax({
                                tweens: [TweenMax.to(d._image, .3, {
                                    scaleX: .9,
                                    scaleY: .9,
                                    ease: Quint.easeOut
                                }), TweenMax.to(d._image, .4, {
                                    scaleX: 1.05,
                                    scaleY: 1.05,
                                    ease: Sine.easeInOut
                                }), TweenMax.to(d._image, .4, {
                                    scaleX: 1,
                                    scaleY: 1,
                                    ease: Sine.easeOut
                                })],
                                align: "sequence"
                            })
                    },
                    this._radius = .5 * this.width,
                    this._radiusPow = this._radius * this._radius,
                    setTimeout(this.setData.bind(this, b), 3e3 * Math.random() + 3e3),
                    this._data = b,
                    this.init()
            }
            return __extends(b, a),
                b.prototype.init = function() {
                    this.mouseChildren = !1,
                        this._container = new e,
                        this._container.visible = !1,
                        this.addChild(this._container);
                    var a = new h;
                    a.graphics.beginFill("#fff").drawCircle(0, 0, this._radius),
                        this.addChildAt(a, 0),
                        this.hitArea = a,
                        this._data ? this.buildAssets() : this._categoryIcon = new d("inc/image/icons/icn-category-1-active.png"),
                        this._stage = i.getStage()
                },
                b.prototype.setData = function(a) {
                    this._data || (this._data = a, this.buildAssets())
                },
                b.prototype.buildAssets = function() {
                    this._data.featured && (this._glow = new d("inc/image/glow.png", 345, 345, 0, 0, "50%", "50%"), this._glow.alpha = 0, this._glow.scaleX = this._glow.scaleY = this.width / 225, this._container.addChild(this._glow));
                    var a = b._categoryTexts[this._data.category.id];
                    if (!a) {
                        var c = new j(""
                            //this._data.category.pageTitle.toUpperCase()
                            , k.circularTextSize, this._radius + k.circularTextOffset);
                        a = new d(c.cacheCanvas, c.cacheCanvas.width, c.cacheCanvas.height),
                            b._categoryTexts[this._data.category.id] = a
                    }
                    this._categoryText = a.clone(),
                        this._categoryText.setGeomTransform(null, null, -30, 30, "50%", "50%"),
                        this._container.addChild(this._categoryText),
                        this._labelText = new g(this._data.title.replace("<br>", "\n"), k.articleTextSize + "px " + "Microsoft YaHei", "#ffffff"),
                        this._labelText.textAlign = g.TEXT_ALIGN_CENTER,
                        this._labelText.lineWidth = this.width,
                        this._labelText.alpha = 0,
                        // this._labelText.height = 10,
                        console.log(this._labelText);
                        this._container.addChild(this._labelText);
                    var e = this._labelText.getExactSize();
                    if (this._labelText.cache( - this._radius - 5, 0, this.width + 10, e.height + 10), m.getInstance().previewMode() && void 0 != this._data.status && p.getInstance().getProperty("authorized")) {
                        var h = "";
                        switch (this._data.status) {
                            case 0:
                                h = "PENDING";
                                break;
                            case 1:
                                h = this._data.published ? "PUBLISHED": "ACCEPTED";
                                break;
                            case 2:
                                h = "REJECTED"
                        }
                        this._statusText = new g(h, k.featuredTextSize + "px " + "Microsoft YaHei", "#ec1a38"),
                            this._statusText.textAlign = g.TEXT_ALIGN_CENTER,
                            this._statusText.y = this._radius + 7,
                            this._container.addChild(this._statusText);
                        var i = this._statusText.getExactSize();
                        this._statusText.cache( - this._radius, 0, this.width, i.height + 5)
                    }
                    if (this._data.featured) {
                        var o = n.getInstance().getString("defaults.featured").toUpperCase();
                        this._featuredText = new g(o, k.featuredTextSize + "px " + "Microsoft YaHei", "#f6e001"),
                            this._featuredText.textAlign = g.TEXT_ALIGN_CENTER,
                            this._featuredText.alpha = 0,
                            this._featuredText.y = this._radius + k.articleTextOffset + e.y1 + k.featuredTextOffset,
                            this._container.addChild(this._featuredText);
                        var q = this._featuredText.getExactSize();
                        this._featuredText.cache( - this._radius, 0, this.width, q.height + 5)
                    }
                    var r = this._data.smallImage ? this._data.smallImage: "inc/image/temp/7up-vintage-art.png";
                    this._image = new f(r, this.width, this._data.featured),
                        this._image.addEventListener(f.EVENT_LOAD_COMPLETE, this.onImageLoaded.bind(this)),
                        this._image.alpha = .01,
                        this._container.addChild(this._image),
                        this._categoryIconX = Math.cos(.25 * Math.PI) * this._radius,
                        this._categoryIconY = Math.sin(.25 * Math.PI) * this._radius;
                    var s = "inc/image/icons/icn-category-" + this._data.category.id + "-active.png";
                    this._categoryIcon = new d(s, 48, 48, this._categoryIconX, this._categoryIconY, "50%", "50%"),
                        this._categoryIcon.scaleX = this._categoryIcon.scaleY = 30 / this._categoryIcon.width,
                        this._container.addChild(this._categoryIcon),
                        this.addEventListener("mouseover", this.handleMouseOver),
                        this.addEventListener("mouseout", this.handleMouseOut),
                        this.addEventListener("click", this.handleClick)
                },
                b.prototype.applyForce = function(b) {
                    if (this.isActive) {
                        if (this._isBecomingInactive && !this.visible) return void(this.isActive = !1);
                        a.prototype.applyForce.call(this, b),
                            this._categoryIcon.x = this._categoryIconX - Math.max( - 20, Math.min(20, this.vx)) * b,
                            this._categoryIcon.y = this._categoryIconY - Math.max( - 20, Math.min(20, this.vy)) * b
                    }
                },
                b.prototype.activate = function(a) {
                    void 0 === a && (a = 0),
                    this.isActive && this.visible || (this.x = this.anchorNode.x, this.y = .5 * this._stage.height + this.height, this.driftXMultiplier = 3, this.anchorNode.y = this.anchorNode.baseY, this._categoryIcon.y = 2 * this.height),
                        this.anchorNode.weightMultiplier = .01,
                        this.cy = 0,
                        this._isBecomingInactive = !1,
                        this.isActive = !0,
                        this.killActiveStateTransition(),
                        this._activeStateTransition = new TimelineMax({
                            tweens: [TweenMax.to(this, 3, {
                                driftXMultiplier: 1
                            }), TweenMax.to(this.anchorNode, 3, {
                                weightMultiplier: 1,
                                y: this.anchorNode.baseY
                            }), TweenMax.to(this._categoryIcon, 5, {
                                y: this._categoryIconY,
                                ease: Quint.easeOut
                            }), TweenMax.delayedCall(1.25, this.expand.bind(this))],
                            delay: a
                        })
                },
                b.prototype.deactivate = function() {
                    this._isBecomingInactive = !0,
                        this.killActiveStateTransition(),
                        this.collapse(),
                        this._activeStateTransition = new TimelineMax({
                            tweens: [TweenMax.to(this, 2, {
                                cy: -1
                            }), TweenMax.to(this.anchorNode, 4, {
                                y: -this._stage.height
                            })]
                        })
                },
                b.prototype.killActiveStateTransition = function() {
                    this._activeStateTransition && (this._activeStateTransition.kill(), this._activeStateTransition = null)
                },
                b.prototype.expand = function(a) {
                    void 0 === a && (a = 0),
                    !this._isExpanded && this.isReady && (this._isExpanded = !0, this._categoryText.visible = !0, TweenMax.to(this._labelText, 2, {
                        alpha: 1,
                        y: this._radius + k.articleTextOffset,
                        ease: Quint.easeOut,
                        delay: a
                    }), this._categoryTextEnabled && this.showCategoryText(a), this._featuredText && TweenMax.to(this._featuredText, 1, {
                        alpha: 1,
                        delay: a + 1
                    }))
                },
                b.prototype.collapse = function(a) {
                    void 0 === a && (a = 0),
                    this._isExpanded && this.isReady && (this._isExpanded = !1, this._featuredText && TweenMax.to(this._featuredText, .5, {
                        alpha: 0,
                        delay: a
                    }), TweenMax.to(this._labelText, 2, {
                        alpha: 0,
                        y: 0,
                        ease: Quint.easeIn,
                        delay: a
                    }), TweenMax.to(this._categoryIcon, 4, {
                        y: 2 * -this.height,
                        ease: Sine.easeIn
                    }), this.hideCategoryText(a))
                },
                b.prototype.toggleCategoryText = function(a) {
                    this._categoryTextEnabled != a && (this._categoryTextEnabled = a, this._isExpanded && this.isReady && (a ? this.showCategoryText() : this.hideCategoryText()))
                },
                b.prototype.showCategoryText = function(a) {
                    void 0 === a && (a = 0),
                        TweenMax.to(this._categoryText, 3, {
                            x: 0,
                            y: 0,
                            ease: Quint.easeOut,
                            delay: a
                        })
                },
                b.prototype.hideCategoryText = function(a) {
                    void 0 === a && (a = 0),
                        TweenMax.to(this._categoryText, 1, {
                            x: -30,
                            y: 30,
                            ease: Quint.easeIn,
                            delay: a
                        })
                },
                b.prototype.checkMouseOver = function() {
                    var a = this.globalToLocal(this._stage.mouseX, this._stage.mouseY),
                        b = a.x * a.x + a.y * a.y < this._radiusPow; ! this._isMouseOvered && this.mouseEnabled && b ? (this.dispatchEvent(new o("mouseover", !0, !1, a.x, a.y, null, 0, !0, null, null)), this._isMouseOvered = !0, this._stage.canvas.style.cursor = "pointer") : !this._isMouseOvered || b && this.mouseEnabled || (this.dispatchEvent(new o("mouseout", !0, !1, a.x, a.y, null, 0, !0, null, null)), this._isMouseOvered = !1, this._stage.canvas.style.cursor = "")
                },
                Object.defineProperty(b.prototype, "data", {
                    get: function() {
                        return this._data
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                b.prototype.destruct = function() {
                    this._isDestructed || (this._isDestructed = !0, this.removeEventListener("mouseover", this.handleMouseOver), this.removeEventListener("mouseout", this.handleMouseOut), this.removeEventListener("click", this.handleClick), this.isReady = !1, this.isActive = !1, this._data = null, this.killActiveStateTransition(), a.prototype.destruct.call(this))
                },
                b._categoryTexts = {},
                b
        } (c);
        return q
    });
//# sourceMappingURL=../../../../../../sourcemap/app/page/home-canvas/component/node/ArticleNode.js.map
