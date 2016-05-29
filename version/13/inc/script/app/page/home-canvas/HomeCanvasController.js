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
define(["require", "exports", "../AbstractHomeController", "lib/easelts/display/Stage", "./component/bubble/BubbleEmitter", "./component/node/NodeContainer", "./component/intro/Intro", "./component/title/CategoryTitle", "./component/scroll/DragBar", "./component/scroll/ScrollIndicator", "app/data/DataManager", "app/data/model/ArticleModel", "app/data/enum/HomePageType", "app/util/PlatformProfiler", "lib/gaia/api/Gaia", "app/data/enum/Page", "lib/temple/control/sequence/Sequence", "app/control/ConfigureCanvasSettingsTask", "app/control/LoadFontsTask", "app/control/LoadCanvasAssetsTask", "lib/temple/control/sequence/tasks/MethodTask", "lib/temple/control/sequence/tasks/WaitTask", "./component/bubble/BubblePool", "./component/bubble/SmallBubble", "app/util/StageProvider", "lib/easelts/ui/Touch", "lib/createts/utils/Ticker", "./component/MainContainer", "./component/bubble/ForegroundBubble", "./component/bubble/BackgroundBubble", "app/config/CanvasSettings", "app/page/home-canvas/component/bubble/config/BackgroundBubbleConfig", "app/page/home-canvas/component/bubble/config/ForegroundBubbleConfig", "app/util/BindValueConnection"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H) {
    var I = function(a) {
        function b() {
            a.call(this, m.CANVAS),
            this._showIntro = !0,
            this._isReady = !1,
            this._hasStarted = !1,
            this._isMobile = !1,
            this._isLoadingNewArticles = !1
        }
        return __extends(b, a),
        b.prototype.init = function() {
            var b = this;
            a.prototype.init.call(this),
            this._dataManager = k.getInstance(),
            this._articleModel = this._dataManager.articleModel,
            this._isMobile = n.getInstance().isMobile;
            var c = o.api.getCurrentBranch();
            c != p.HOME && (this._showIntro = !1,
            this.activateHeaderAndFooter()),
            this._dataManager.popupActive.subscribe(this.onPopupStateChanged.bind(this));
            var d = new q;
            d.add(new r);
            //d.add(new s),
           // d.add(new t);
            d.add(new u(this.createUI.bind(this)));
            d.add(new v(100));
            d.add(new u(function() {
                $(".loader", b.element).remove(),
                b._isReady = !0
            }
            ));
            d.add(new u(this.start.bind(this)));
            d.execute()
        }
        ,
        b.prototype.createUI = function() {
            var a = this;
            this._stage = new d(this.element),
            this._stage.enableMouseInteraction(),
            this._stage.setFps(60),
            y.setStage(this._stage),
            z.enable(this._stage),
            A.maxDelta = 1e3,
            A.deltaDivider = 1e3 / 30;
            var b = new w(x);
            b.populate(100),
            this._dataManager.smallBubblePool = b,
            this._mainContainer = new B,
            this._stage.addChild(this._mainContainer);
            var c = new w(D);
            c.populate(15),
            this._backgroundEmitter = new e(c,E.backgroundEmitterChance,new F),
            this._mainContainer.addChild(this._backgroundEmitter),
            this._backgroundEmitter.setWidth("100%"),
            this._backgroundEmitter.setX("50%"),
            this._backgroundEmitter.setY("100% + 15"),
            this._categoryTitle = new h,
            this._categoryTitle.setX("50%"),
            this._categoryTitle.visible = !1,
            this._mainContainer.addChild(this._categoryTitle),
            this._showIntro && (this._intro = new g,
            this._intro.setY("50%"),
            this._mainContainer.addChild(this._intro)),
            this._nodeContainer = new f,
            this._nodeContainer.signals.articleSelected.connect(function(b) {
                return a.selectArticle(b)
            }
            ),
            this._nodeContainer.signals.requestNewArticles.connect(function(b) {
                return a.scrollEndReached(b)
            }
            ),
            this._mainContainer.addChild(this._nodeContainer);
            var k = new w(C);
            k.populate(50),
            this._foregroundEmitter = new e(k,E.foregroundEmitterChance,new G),
            this._mainContainer.addChild(this._foregroundEmitter),
            this._foregroundEmitter.setWidth("100%"),
            this._foregroundEmitter.setX("50%"),
            this._foregroundEmitter.setY("100% + 30"),
            this._isMobile ? (this._scrollIndicator = new j(this._nodeContainer.scrollIndexBinding),
            this._scrollIndicator.setX("50%"),
            this._scrollIndicator.setY("100% - 70"),
            this._mainContainer.addChild(this._scrollIndicator)) : (this._dragBar = new i,
            this._dragBar.setX("50%"),
            this._dragBar.setY("100% - 80"),
            // this._mainContainer.addChild(this._dragBar),
            new H(this._dragBar.valueBinding,this._nodeContainer.scrollSpeedBinding,this._dragBar.valueBounds,this._nodeContainer.scrollSpeedBounds))
        }
        ,
        b.prototype.start = function() {
            var a = this
              , b = o.api.getCurrentBranch();
            if (b == p.HOME || -1 != b.indexOf(p.POPUP_POPUP)) {
                this._hasStarted = !0,
                this._stage.start(),
                this._backgroundEmitter.startEmitting(),
                this._foregroundEmitter.startEmitting();
                var c = this.getCurrentCategory();
                this._isMobile || this._categoryTitle.changeCategory(null , !1);
                var d = new TimelineMax({
                    align: "sequence"
                });
                this._intro ? (d.append(TweenMax.delayedCall(.5, function() {
                    return a._intro.transitionIn()
                }
                )),
                d.append(TweenMax.delayedCall(7.5, function() {
                    a._foregroundEmitter.boost(1.5),
                    a._intro.transitionOut(),
                    a._isMobile || (a._categoryTitle.y = a._intro.title.localToGlobal(0, 0).y,
                    a._categoryTitle.scaleX = a._categoryTitle.scaleY = a._intro.scaleY,
                    a._categoryTitle.show())
                }
                ))) : (this._categoryTitle.show(!0),
                this._categoryTitle.changeCategory(null )),
                d.append(TweenMax.delayedCall(1, function() {
                    a._isMobile && a._categoryTitle.show(!0),
                    a._nodeContainer.start(),
                    a.loadCurrentCategory(),
                    a.activateHeaderAndFooter()
                }
                )),
                d.append(TweenMax.delayedCall(2, function() {
                    a._intro && a._intro.destruct(),
                    a._categoryTitle.changeCategory(c),
                    a._dragBar && a._dragBar.transitionIn()
                }
                )),
                d.append(TweenMax.delayedCall(1.5, function() {
                    return a._mainContainer.enableMouseInteraction()
                }
                ))
            }
        }
        ,
        b.prototype.onPopupStateChanged = function(a) {
            var b = this;
            this._stage.mouseEnabled = this._stage.mouseChildren = !a,
            this._hasStarted ? (a || setTimeout(function() {
                k.getInstance().previewMode() ? (b._nodeContainer.reset(),
                b._articleModel.resetArticles()) : b._nodeContainer.activateNodes(),
                b._categoryTitle.enable()
            }
            , 1e3),
            A.getInstance().setPaused(a)) : !a && this._isReady && this.start()
        }
        ,
        b.prototype.onCategoryChanged = function(b) {
            a.prototype.onCategoryChanged.call(this, b),
            this._isLoadingNewArticles = !1,
            this._currentCategory = b,
            this._nodeContainer.updateArticles(b),
            this._categoryTitle.changeCategory(b),
            this.updateScrollIndicator(b)
        }
        ,
        b.prototype.updateScrollIndicator = function(a) {
            this._scrollIndicator && (a ? this._scrollIndicator.setNumBullets(a.articles.length) : this._scrollIndicator.setNumBullets(this._articleModel.homeArticleList.articles.length))
        }
        ,
        b.prototype.selectArticle = function(a) {
            this._stage.mouseEnabled = this._stage.mouseChildren = !1,
            this._foregroundEmitter.boost(2),
            this._nodeContainer.deactivateNodes(),
            this._categoryTitle.disable(),
            setTimeout(function() {
                o.api.gotoPopup(p.POPUP_ARTICLE, {
                    category: a.category.link,
                    title: a.slug
                })
            }
            , 500)
        }
        ,
        b.prototype.activateHeaderAndFooter = function() {
            this._dataManager.showFooter(!0),
            this._dataManager.showHeader(!0)
        }
        ,
        b.prototype.scrollEndReached = function(a) {
            var b = this;
            if (!this._isLoadingNewArticles) {
                this._isLoadingNewArticles = !0;
                var c = null  != this._currentCategory ? this._currentCategory.id : null ;
                k.getInstance().articleModel.loadArticles(c, l.DEFAULT_ARTICLE_LIMIT, a, function(a) {
                    b.getCurrentCategory() == b._currentCategory && b._nodeContainer.updateArticles(b._currentCategory)
                }
                )
            }
        }
        ,
        b.prototype.destruct = function() {
            a.prototype.destruct.call(this)
        }
        ,
        b
    }
    (c);
    return I
}
);
//# sourceMappingURL=../../../../sourcemap/app/page/home-canvas/HomeCanvasController.js.map
