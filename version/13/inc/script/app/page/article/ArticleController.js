var __extends = this.__extends ||
    function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        c.prototype = b.prototype,
            a.prototype = new c
    };
define(["require", "exports", "knockout", "app/page/CustomAbstractController", "lib/gaia/api/Gaia", "app/data/DataManager", "app/data/enum/Page", "app/util/Analytics"],
    function(a, b, c, d, e, f, g, h) {
        var i = function(a) {
            function b() {
                a.call(this),
                    this.nextArticle = null,
                    this.prevArticle = null,
                    this.lastScrollPos = 0,
                    this.animating = !1,
                    this.contentReadySubscriptions = [],
                    this.buttonsAnimated = !1,
                    this.transitionInAnimation = !1,
                    this.transitioning = !1
            }
            return __extends(b, a),
                b.prototype.init = function() {
                    var b = this;
                    a.prototype.init.call(this),
                        this.nextArticleReady = c.observable(!1),
                        this.currentArticleReady = c.observable(!1),
                        this.contentContainer = $(this.element).find(".content-container"),
                        this.currentContentContainer = $(this.contentContainer).find(".current-content"),
                        this._$shareIcons = $(this.element).find(".social-share"),
                        this._$buttons = $(this.element).find(".buttons"),
                        this._$logo = $("#page-header").find(".logo"),
                        this._$headerCloseButton = $(".view-article .close-btn"),
                        this._$headerLogo = $("#page-header .logo"),
                        this._$headerSocialButton = $(".social-share"),
                        this._$indicator = $(this.element).find(".indicator"),
                        this._$headerCircle = $("#page-header .circle"),
                        this._$icon1 = $("#page-header .social-icon.twitter"),
                        this._$icon2 = $("#page-header .social-icon.facebook"),
                        this._$icon3 = $("#page-header .social-icon.googleplus"),
                        $("#page-header").removeClass("disable-hover"),
                        $("#page-footer .left span.title").addClass("hide"),
                        this._subscriptions.push(f.getInstance().previewMode.subscribe(function() {
                            b.transitionInAnimation = !1,
                                b.transitioning = !0,
                                b.loadNextArticle(e.api.getParam("title"),
                                    function() {
                                        b.switchContent(f.getInstance().articleSwitchDirection)
                                    })
                        }))
                },
                b.prototype.onDeeplink = function(b) {
                    if (a.prototype.onDeeplink.call(this, b), "index" != b.routeResult[0].branch && "index/canvas" != b.routeResult[0].branch && "index/home" != b.routeResult[0].branch && "index/home/popup/contact" != b.routeResult[0].branch && "index/home/popup/privacy-policy" != b.routeResult[0].branch && "index/home/popup/terms-of-use" != b.routeResult[0].branch && "index/home/popup/copyright-notification" != b.routeResult[0].branch && "index/home/article/lightBox" != b.routeResult[0].branch && "index/home/article/lightBox" != e.api.getCurrentBranch()) {
                        if (1 == f.getInstance().lightBoxActive) return void(f.getInstance().lightBoxActive = !1);
                        this.transitionInAnimation = !1,
                            this.transitioning = !0,
                            this.switchContent(f.getInstance().articleSwitchDirection)
                    }
                },
                b.prototype.transitionIn = function() {
                    var a = this;
                    f.getInstance().showNextButton(!1),
                        f.getInstance().showPrevButton(!1),
                        this.transitionInAnimation = !0;
                    var b = $(window).height();
                    $(this.element).css("visibility", "visible"),
                        $(this.element).removeClass("show-button"),
                        TweenLite.set(this.element, {
                            y: b + "px"
                        }),
                        this.loadComponents(function() {
                            var b = new TimelineLite({
                                onComplete: function() {
                                    return a.transitionInComplete()
                                }
                            });
                            b.to(a.element, 2.5, {
                                y: "0",
                                ease: Quint.easeInOut
                            }),
                                setTimeout(function() {
                                        var c = {
                                                y: "0",
                                                ease: Power4.easeOut,
                                                clearProps: "y"
                                            },
                                            d = {
                                                scale: 1,
                                                ease: Power4.easeOut,
                                                clearProps: "scale",
                                                onComplete: function() {
                                                    $(this.target).addClass("show")
                                                }
                                            };
                                        f.getInstance().isMobile() ? b.to(a._$categoryIcon, 1, {
                                                y: "-50%",
                                                ease: Power4.easeOut,
                                                clearProps: "all"
                                            },
                                            "-=1.2") : b.to(a._$categoryIcon, 1, c, "-=1.2"),
                                            b.to(a._$articleTitle, 1, c, "-=0.9"),
                                            b.to(a._$categoryText, 1, c, "-=0.9"),
                                            b.to(a._$summary, 1, c, "-=0.9"),
                                            b.to(a._$scrollDown, 1, c, "-=0.9"),
                                            b.to(a._$playBtn, 1, d, "-=0.3")
                                    },
                                    1e3)
                        })
                },
                b.prototype.transitionInComplete = function() {
                    $(this.element).addClass("show-button"),
                        $(this.element).addClass("scrollable"),
                        $(this.element).find(".current-content .component-intro .scroll-down").addClass("animate"),
                        $(this.element).find(".current-content .component-article-video .scroll-down").addClass("animate"),
                        $(this.element).find(".current-content .component-article-gallery .scroll-down").addClass("animate"),
                        f.getInstance().transitionInDone(!0),
                        f.getInstance().popupActive(!0),
                        this.addEvents(),
                        this.loadNextAndPrev(),
                        a.prototype.transitionInComplete.call(this)
                },
                b.prototype.transitionOut = function() {
                    var a = this,
                        b = $(window).height();
                    $(this.element).removeClass("scrollable"),
                        f.getInstance().popupActive(!1);
                    var c = new TimelineLite({
                        onComplete: function() {
                            $(a.element).css("visibility", "hidden"),
                                a.transitionOutComplete(),
                                f.getInstance().transitionInDone(!1),
                                $("#page-header").removeClass("show"),
                            window.mobileDevice && $("#page-header").addClass("disable-hover")
                        }
                    });
                    c.to(this._$buttons, .5, {
                        opacity: 0,
                        ease: Power3.easeInOut
                    }),
                        c.to(this._$indicator, .5, {
                                opacity: 0,
                                ease: Power3.easeInOut
                            },
                            "-=0.5"),
                        c.to(this.element, 2, {
                            y: b + "px",
                            ease: Quint.easeInOut
                        })
                },
                b.prototype.addEvents = function() {
                    var a = this;
                    this.currentContentContainer.on("scroll" + this.eventNamespace,
                        function() {
                            a.onScroll()
                        }),
                        this.currentContentContainer.on("mousewheel" + this.eventNamespace + " DOMMouseScroll" + this.eventNamespace,
                            function(b) {
                                var c = a.currentContentContainer.scrollTop(),
                                    d = a.viewModel.indicatorBullets()[1].scrollPos;
                                a.setScrollPos(function() {
                                    d = a.viewModel.indicatorBullets()[1].scrollPos
                                }),
                                a.animating && (b.preventDefault(), b.stopPropagation()),
                                (b.originalEvent.detail > 0 && d > c || b.originalEvent.wheelDelta < 0 && d > c) && (b.preventDefault(), b.stopPropagation(), 0 == a.animating && (a.animating = !0, a.scrollToPoint(d, 1)))
                            })
                },
                b.prototype.loadComponents = function(a) {
                    var b = this,
                        c = f.getInstance();
                    c.transitionInDone(!1),
                        this.routeCategory = e.api.getParam("category"),
                        this.routeSlug = e.api.getParam("title"),
                        c.articleModel.loadArticle(this.routeSlug,
                            function(d) {
                                b.article = d.data,
                                    console.log("--"),
                                    console.log(b.article),
                                    console.log("--");
                                for (var e = 0; e < b.article.components.length; e++) {
                                    var f = b.article.components[e];
                                    "intro" == f.componentName && (f.category = b.article.category, f.headerImage || (f.headerImage = "inc/image/missing-image.jpg"))
                                }
                                b.viewModel.articleData(null),
                                    b.viewModel.components([]),
                                    b.viewModel.indicatorBullets([]),
                                    b.viewModel.articleData(b.article),
                                    b.viewModel.components(b.article.components),
                                    c.currentArticle(null),
                                    c.currentArticle(b.article),
                                    b.trackPageViewAndSetPageTitle(),
                                    b.makeIndcators(function() {
                                        a && a()
                                    })
                            })
                },
                b.prototype.placeComponentsInCurrentContainer = function(a, b) {
                    0 == a ? this.article = this.nextArticle: this.article = this.prevArticle,
                        this.viewModel.articleData(null),
                        this.viewModel.components([]),
                        this.viewModel.indicatorBullets([]),
                        this.viewModel.articleData(this.article),
                        this.viewModel.components(this.article.components),
                        f.getInstance().currentArticle(null),
                        f.getInstance().currentArticle(this.article),
                        this.trackPageViewAndSetPageTitle(),
                        this.makeIndcators(function() {
                            b && b()
                        })
                },
                b.prototype.trackPageViewAndSetPageTitle = function() {
                    var a = f.getInstance();
                    document.title = this.article.title.replace("<br>", " ").replace(":", " -") + " | 7UP®";
                    var b = this.article.title.replace(": ", "-");
                    b = "article/" + b.replace(/ /g, "-"),
                        h.trackPage(b),
                        this.addTrackingPixel(),
                        a.sharePageUrl(window.location.href),
                        console.log("- Share url:  " + a.sharePageUrl())
                },
                b.prototype.makeIndcators = function(a) {
                    for (var b, d = f.getInstance(), e = !1, g = 0; g < this.article.components.length; g++) {
                        var h = this.article.components[g];
                        if (b = {
                                componentName: h.componentName,
                                active: c.observable(!1),
                                scrollPos: 0
                            },
                            0 == g && b.active(!0), this.viewModel.indicatorBullets.push(b), "intro" == h.componentName) {
                            e = !0;
                            var i = new Image;
                            i.onload = function() {
                                a && a()
                            },
                                i.src = h.headerImage,
                                d.shareMediaUrl(_baseurl + h.headerImage),
                                console.log("- share media: " + d.shareMediaUrl())
                        }
                        g == this.article.components.length - 1 && 0 == e && a && setTimeout(function() {
                                a()
                            },
                            500)
                    }
                },
                b.prototype.loadNextAndPrev = function() {
                    var a = this,
                        b = f.getInstance(),
                        c = $(this.element).find(".current-content .component-intro .button-prev"),
                        d = $(this.element).find(".current-content .component-intro .button-next");
                    this.viewModel.prevArticleData([]),
                        this.viewModel.nextArticleData([]),
                        this.viewModel.prevComponents([]),
                        this.viewModel.nextComponents([]),
                        this.nextArticle = null,
                        this.prevArticle = null,
                        this.article.next_article_slug ? b.articleModel.loadArticle(this.article.next_article_slug,
                            function(b) {
                                if (console.log("- Next data", b), b.success) {
                                    for (var c = 0; c < b.data.components.length; c++)"intro" == b.data.components[c].componentName && (b.data.components[c].category = a.article.category);
                                    a.nextArticle = b.data,
                                        a.addNextPrevArticleData("next", b.data)
                                } else f.getInstance().showNextButton(!1),
                                    d.addClass("hide")
                            }) : (f.getInstance().showNextButton(!1), d.addClass("hide")),
                        this.article.previous_article_slug ? b.articleModel.loadArticle(this.article.previous_article_slug,
                            function(b) {
                                if (console.log("- Previous data", b), b.success) {
                                    for (var d = 0; d < b.data.components.length; d++)"intro" == b.data.components[d].componentName && (b.data.components[d].category = a.article.category);
                                    a.prevArticle = b.data,
                                        a.addNextPrevArticleData("prev", b.data)
                                } else f.getInstance().showPrevButton(!1),
                                    c.addClass("hide")
                            }) : (f.getInstance().showPrevButton(!1), c.addClass("hide"))
                },
                b.prototype.addNextPrevArticleData = function(a, b) {
                    var c = $(this.element).find(".current-content .component-intro .button-next"),
                        d = $(this.element).find(".current-content .component-intro .button-prev"),
                        e = b.components[0];
                    if ("next" == a ? (this.viewModel.nextArticleData(b), this.viewModel.nextComponents.push(e), c.remove("hide"), f.getInstance().showNextButton(!0)) : "prev" == a && (this.viewModel.prevArticleData(b), this.viewModel.prevComponents.push(e), d.removeClass("hide"), f.getInstance().showPrevButton(!0)), "intro" == e.componentName) {
                        var g = new Image;
                        g.onload = function() {
                            console.log(a + " image loaded")
                        },
                            g.src = e.headerImage
                    }
                },
                b.prototype.loadNextArticle = function(a, b) {
                    var c = this,
                        d = f.getInstance();
                    d.showNextButton(!0),
                        this.nextArticleReady(!1),
                        this.viewModel.nextArticleData([]),
                        this.viewModel.nextComponents([]),
                        this.nextArticle = null,
                        d.articleModel.loadArticle(a,
                            function(a) {
                                if (console.log("- Next data", a.data.components), a.success) {
                                    for (var b = 0; b < a.data.components.length; b++)"intro" == a.data.components[b].componentName && (a.data.components[b].category = c.article.category);
                                    c.nextArticle = a.data;
                                    var d = a.data.components[0];
                                    if (c.viewModel.nextArticleData(a.data), c.viewModel.nextComponents.push(d), "intro" == d.componentName) {
                                        var e = new Image;
                                        e.onload = function() {
                                            console.log("next image loaded")
                                        },
                                            e.src = d.headerImage
                                    }
                                }
                            }),
                        this.contentReadySubscriptions.push(this.nextArticleReady.subscribe(function(a) {
                            if (c.contentReadySubscriptions) {
                                for (; c.contentReadySubscriptions.length;) c.contentReadySubscriptions.shift().dispose();
                                c.contentReadySubscriptions = []
                            }
                            a && b()
                        }))
                },
                b.prototype.switchContent = function(a) {
                    var b = this,
                        c = function(a) {
                            b.placeComponentsInCurrentContainer(a,
                                function() {
                                    setTimeout(function() {
                                            TweenLite.set(b.contentContainer, {
                                                x: "-0%"
                                            }),
                                                b.animateButtonsBack(function() {
                                                    b.loadNextAndPrev(),
                                                        f.getInstance().transitionInDone(!0),
                                                        b.transitioning = !1,
                                                        b._$buttons.removeClass("dark"),
                                                        $(b.element).find(".buttons .back-to-top").removeClass("show"),
                                                        $(b.element).find(".current-content .component-intro .scroll-down").addClass("animate"),
                                                        $(b.element).find(".current-content .component-article-video .scroll-down").addClass("animate"),
                                                        $(b.element).find(".current-content .component-article-gallery .scroll-down").addClass("animate")
                                                })
                                        },
                                        100)
                                })
                        };
                    0 == a ? TweenLite.to(this.contentContainer, 1, {
                        x: "-100%",
                        ease: Power3.easeInOut,
                        onComplete: function() {
                            c(a)
                        }
                    }) : TweenLite.to(this.contentContainer, 1, {
                        x: "100%",
                        ease: Power3.easeInOut,
                        onComplete: function() {
                            c(a)
                        }
                    })
                },
                b.prototype.gotoNext = function() {
                    f.getInstance().articleSwitchDirection = 0,
                        this.gotoFunc(this.nextArticle.category.link, this.nextArticle.slug)
                },
                b.prototype.gotoPrev = function() {
                    f.getInstance().articleSwitchDirection = 1,
                        this.gotoFunc(this.prevArticle.category.link, this.prevArticle.slug)
                },
                b.prototype.gotoArticle = function(a, b) {
                    var c = this;
                    this.loadNextArticle(b,
                        function() {
                            c.gotoFunc(a, b)
                        })
                },
                b.prototype.gotoFunc = function(a, b) {
                    e.api.gotoPopup(g.POPUP_ARTICLE, {
                        category: a,
                        title: b
                    })
                },
                b.prototype.animateButtonsBack = function(a) {
                    var b = this;
                    if (this.buttonsAnimated && f.getInstance().isMobile()) {
                        var c = new TimelineLite({
                                onComplete: function() {
                                    b.buttonsAnimated = !1,
                                        a()
                                }
                            }),
                            d = {
                                y: "0px",
                                ease: Power3.easeInOut
                            };
                        c.to(this._$headerCloseButton, .8, d),
                            c.to(this._$headerSocialButton, .8, d, "-=0.5"),
                            c.to(this._$headerLogo, .8, d, "-=0.5")
                    } else a()
                },
                b.prototype.toggleShare = function() {
                    f.getInstance().isMobile && this._$shareIcons.toggleClass("active")
                },
                b.prototype.closePopup = function() {
                    f.getInstance().sharePageUrl(_baseurl),
                        f.getInstance().shareMediaUrl(_baseurl + "inc/data/share/pin-600.png"),
                        e.api.closePopup()
                },
                b.prototype.onScroll = function() {
                    var a = this;
                    if (!this.transitioning) {
                        var b = this.currentContentContainer.scrollTop(),
                            c = $(this.element).find(".buttons .back-to-top"),
                            d = ($(this.element).find(".current-content:nth-of-type(1)").height(), $(window).height());
                        this.currentContentContainer.scrollTop() > 0 ? c.addClass("show") : c.removeClass("show"),
                            this.setScrollPos();
                        for (var e = function(b) {
                                //"story" == b.componentName || "photos" == b.componentName || "location" == b.componentName || "article-video" == b.componentName || "article-gallery" == b.componentName || "article-text" == b.componentName ? a._$buttons.addClass("dark") : a._$buttons.removeClass("dark")
                                "story" == b.componentName || "photos" == b.componentName|| "article-video" == b.componentName || "article-gallery" == b.componentName || "article-text" == b.componentName ? a._$buttons.addClass("dark") : a._$buttons.removeClass("dark")
                            },
                                 g = 0; g < this.viewModel.indicatorBullets().length; g++) {
                            var h = this.viewModel.indicatorBullets()[g],
                                i = this.viewModel.indicatorBullets()[g + 1];
                            //"location" == h.componentName && h.scrollPos - d <= b && f.getInstance().loadMap(!0),
                                g != this.viewModel.indicatorBullets().length - 1 ? 0 == b && 0 == g || b < i.scrollPos && 0 == g ? this.viewModel.indicatorBullets()[0].active(!0) : b >= h.scrollPos && b < i.scrollPos ? (h.active(!0), e(h)) : h.active(!1) : b >= h.scrollPos ? (h.active(!0), e(h)) : h.active(!1)
                        }
                        b < this.viewModel.indicatorBullets()[1].scrollPos ? $("html").removeClass("indicator-move") : $("html").addClass("indicator-move"),
                            this.lastScrollPos = b
                    }
                },
                b.prototype.setScrollPos = function(a) {
                    var b = this.currentContentContainer.scrollTop();
                    if (0 == this.viewModel.indicatorBullets()[1].scrollPos || 0 == this.viewModel.indicatorBullets()[2].scrollPos || this.viewModel.indicatorBullets()[1].scrollPos == this.viewModel.indicatorBullets()[2].scrollPos) for (var c = 0; c < this.viewModel.indicatorBullets().length; c++) {
                        var d = this.viewModel.indicatorBullets()[c],
                            e = $(this.element).find(".current-content .component-" + d.componentName);
                        e.position() && (d.scrollPos = Math.round(e.position().top) + Math.round(b)),
                        a && c == this.viewModel.indicatorBullets().length - 1 && a()
                    }
                },
                b.prototype.scrollToComponent = function(a) {
                    var b = this,
                        c = this.viewModel.indicatorBullets()[a].scrollPos,
                        d = function() {
                            b.setScrollPos(function() {
                                c = b.viewModel.indicatorBullets()[a].scrollPos,
                                    b.animateScrollTo(c)
                            })
                        };
                    0 == this.viewModel.indicatorBullets()[1] ? d() : a > 0 && 0 == c ? d() : (d(), this.animateScrollTo(c))
                },
                b.prototype.scrollToTop = function() {
                    this.scrollToPoint(0, .5)
                },
                b.prototype.scrollToPoint = function(a, b) {
                    var c = this;
                    clearTimeout(this.animatingTimeout),
                        TweenLite.to(this.currentContentContainer, b, {
                            scrollTo: {
                                y: a,
                                autoKill: !1
                            },
                            ease: Power4.easeInOut
                        }),
                        this.animatingTimeout = setTimeout(function() {
                                c.animating = !1
                            },
                            1e3)
                },
                b.prototype.animateScrollTo = function(a) {
                    this.currentContentContainer.animate({
                            scrollTop: a
                        },
                        500)
                },
                b.prototype.addTrackingPixel = function() {
                    var a = $("#trackingpixel");
                    a.length > 0 && (console.log("--- tracking pixel already exists"), a.remove());
                    var b = '<img id="trackingpixel" src="' + this.article.tracking_pixel + '" style="position:absolute;left:-100000px;opacity:0" />';
                    $(b).appendTo(this.element)
                },
                b.prototype.destruct = function() {
                    if (f.getInstance().transitioning = !1, $("#page-header").removeClass("article-header"), $("#page-footer .left span.title").removeClass("hide"), this.currentContentContainer && this.currentContentContainer.off("scroll" + this.eventNamespace + " mousewheel" + this.eventNamespace + " DOMMouseScroll" + this.eventNamespace), this.articles = null, this.articleID = null, this.contentContainer = null, this.currentContentContainer = null, this.lastScrollPos = null, this.animating = null, this.nextArticleReady = null, clearTimeout(this.animatingTimeout), this.animatingTimeout = null, this.buttonsAnimated = null, this._$shareIcons = null, this._$buttons = null, this._$logo = null, this._$headerCloseButton = null, this._$headerLogo = null, this._$headerSocialButton = null, this._$categoryIcon = null, this._$articleTitle = null, this._$categoryText = null, this._$summary = null, this._$scrollDown = null, this._$playBtn = null, this._$indicator = null, this.contentReadySubscriptions) {
                        for (; this.contentReadySubscriptions.length;) this.contentReadySubscriptions.shift().dispose();
                        this.contentReadySubscriptions = null
                    }
                    a.prototype.destruct.call(this)
                },
                b
        } (d);
        return i
    });
//# sourceMappingURL=../../../../sourcemap/app/page/article/ArticleController.js.map
