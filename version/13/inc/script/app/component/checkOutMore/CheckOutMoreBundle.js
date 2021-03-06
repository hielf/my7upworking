var __extends = this.__extends ||
    function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        c.prototype = b.prototype,
            a.prototype = new c
    };
define("app/component/checkOutMore/CheckOutMoreController", ["require", "exports", "lib/temple/component/AbstractComponentController", "app/data/DataManager"],
    function(a, b, c, d) {
        var e = function(a) {
            function b(b, c) {
                a.call(this, b, c),
                    this.options = c,
                    this.articleData = c.articleData,
                    this.iScrollerActive = !1,
                    this.mobileCarousel = !1
            }
            return __extends(b, a),
                b.prototype.init = function() {
                    var b = this;
                    a.prototype.init.call(this),
                        d.getInstance().transitionInDone() ? this.addData() : this._subscriptions.push(d.getInstance().transitionInDone.subscribe(function(a) {
                            a && b.addData()
                        }))
                },
                b.prototype.addData = function() {
                    var a = this;
                    $(this.element).addClass("check-out-more-" + this.eventNamespace.replace(".", "")),
                        this.containerPos = -150,
                        this._$container = $(this.element).find(".articles");
                    for (var b = this.articleData.articles,
                             c = 0; c < b.length; c++) {
                        var d = b[c];
                        this.getArticle(d,
                            function(b) {
                                b.success && (console.log(b), a.viewModel.articles.push(b.data))
                            })
                    }
                    $(window).on("resize" + this.eventNamespace, $.debounce(100,
                        function() {
                            a.onResize()
                        })),
                        this.onResize()
                },
                b.prototype.getArticle = function(a, b) {
                    d.getInstance().articleModel.getArticleBySlug(a,
                        function(a) {
                            b(a)
                        })
                },
                b.prototype.gotoArticle = function(a, b) {
                    d.getInstance().articleSwitchDirection = 0,
                        this.options.controller.gotoArticle(a, b)
                },
                b.prototype.onResize = function() {
                    this.windowWidth = $(window).width();
                    var a = $(window).height();
                    if ($(this.element).height(a), d.getInstance().isMobile()) {
                        var b = 4 * this._$container.find(".item").innerWidth() + 5;
                        TweenLite.set(this._$container, {
                            width: b + "px"
                        }),
                        0 == this.mobileCarousel && (this.initIScrollCarousel(), this.mobileCarousel = !0, this.iScrollerActive = !1)
                    } else if (d.getInstance().isTablet()) {
                        var b = this.windowWidth + 300;
                        TweenLite.set(this._$container, {
                            width: b + "px"
                        }),
                        0 == this.iScrollerActive && (this.initIScroller(), this.mobileCarousel = !1, this.iScrollerActive = !0)
                    } else this.iScrollerActive && this.iScroller && (this.iScroller.destroy(), this.iScroller = null, this.iScrollerActive = !1),
                        this._$container.css({
                            width: "100%",
                            left: "auto",
                            "padding-right": "0",
                            transform: "translate(0,0)"
                        });
                    this.containerWidth = $(this._$container).width()
                },
                b.prototype.initIScroller = function() {
                    var a = this;
                    console.log("init iScroller check out more"),
                    this.iScroller && (this.iScroller.destroy(), this.iScroller = null, this.iScrollerActive = !1),
                        setTimeout(function() {
                                a.iScroller = new IScroll(".check-out-more-" + a.eventNamespace.replace(".", "") + " .articles-container", {
                                    eventPassthrough: !0,
                                    scrollX: !0,
                                    scrollY: !1,
                                    mouseWheel: !1,
                                    tap: !0,
                                    click: !0
                                }),
                                    a.iScroller.scrollTo( - 150, 0)
                            },
                            60)
                },
                b.prototype.initIScrollCarousel = function() {
                    var a = this;
                    console.log("init iScroller carousel check out more"),
                    this.iScroller && (this.iScroller.destroy(), this.iScroller = null, this.iScrollerActive = !1),
                        setTimeout(function() {
                                a.iScroller = new IScroll(".check-out-more-" + a.eventNamespace.replace(".", "") + " .articles-container", {
                                    eventPassthrough: !0,
                                    scrollX: !0,
                                    scrollY: !1,
                                    mouseWheel: !1,
                                    tap: !0,
                                    click: !0,
                                    momentum: !1,
                                    snap: "div.item",
                                    snapSpeed: 400
                                }),
                                    a.iScroller.goToPage(1, 0, 1)
                            },
                            60)
                },
                b.prototype.destruct = function() {
                    this.iScroller && (this.iScroller.destroy(), this.iScroller = null),
                        $(window).off("resize" + this.eventNamespace),
                        this.articles = null,
                        this._$container = null,
                        this.containerPos = null,
                        this.containerWidth = null,
                        this.windowWidth = null,
                        this.articleData = null,
                        this.iScrollerActive = null,
                        this.mobileCarousel = null,
                        a.prototype.destruct.call(this)
                },
                b
        } (c);
        return e
    });
var __extends = this.__extends ||
    function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        c.prototype = b.prototype,
            a.prototype = new c
    };
define("app/component/checkOutMore/CheckOutMoreViewModel", ["require", "exports", "lib/temple/component/AbstractComponentViewModel", "knockout"],
    function(a, b, c, d) {
        var e = function(a) {
            function b() {
                a.call(this),
                    this.articles = d.observableArray([])
            }
            return __extends(b, a),
                b.prototype.gotoArticle = function(a, b) {
                    this.controller.gotoArticle(a, b)
                },
                b.prototype.destruct = function() {
                    this.articles = null,
                        a.prototype.destruct.call(this)
                },
                b
        } (c);
        return e
    }),
    define("text!app/component/checkOutMore/checkOutMore.html", [],
        function() {
            return '<div class="component-checkOutMore">\r\n	<div class="content">\r\n		<h2 data-bind="localizedText: {id: \'defaults.article.check_out_more\', html: true}"></h2>\r\n\r\n		<div class="articles-container">\r\n			<section class="articles" data-bind="foreach: articles">\r\n				<div class="item" data-bind="\r\n					tap: function(){\r\n						$root.gotoArticle($data.category.category, $data.slug)\r\n					},\r\n					attr: {\r\n						\'test\': $data.id\r\n					}">\r\n					<div class="top">\r\n						<div class="image-wrap">\r\n							<div class="image" data-bind="style: { backgroundImage: \'url(\' + smallImage + \')\' }"></div>\r\n							<div class="category-icon">\r\n								<div class="icon" data-bind="css: \'category_\' + categoryID"></div>\r\n							</div>\r\n							<div class="curved-text-wrap">\r\n	' +
                //'							<div class="curved-text" data-bind="circleType: { fluid:true, dir: 1, radius: 120 }">\r\n									<div data-bind="text: category.pageTitle"></div>\r\n								</div>\r\n			' +
                '				</div>\r\n						</div>\r\n					</div>\r\n					<div class="bottom">\r\n						<h2 data-bind="html: title"></h2>\r\n					</div>\r\n				</div>\r\n			</section>\r\n		</div>\r\n\r\n	</div>\r\n</div>'
        }),
    define("app/component/checkOutMore/CheckOutMoreBundle", ["require", "exports", "app/component/checkOutMore/CheckOutMoreController", "app/component/checkOutMore/CheckOutMoreViewModel", "text!app/component/checkOutMore/checkOutMore.html"],
        function(a, b, c, d, e) {
            b.controller = c,
                b.viewmodel = d,
                b.template = e
        });
//# sourceMappingURL=../../../../sourcemap/app/component/checkOutMore/CheckOutMoreBundle.js.map
