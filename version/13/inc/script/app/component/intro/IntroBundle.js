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
define("app/component/intro/IntroController", ["require", "exports", "lib/temple/component/AbstractComponentController", "knockout", "app/data/DataManager"], function(a, b, c, d, e) {
    var f = function(a) {
        function b(b, c) {
            a.call(this, b, c),
            this.options = c,
            this.articleData = c.articleData,
            this.allowInteraction = d.observable(c.allowInteraction),
            this.isPlayerReady = d.observable(!1),
            this.buttonsAnimatedBack = !1
        }
        return __extends(b, a),
        b.prototype.init = function() {
            var b = this;
            a.prototype.init.call(this);
            var c = $(window).height();
            this._$currentContainer = $(".view-article .current-content"),
            this._$content = $(this.element).find(".center-content"),
            this.viewModel.title(this.articleData.title),
            this.viewModel.categoryText(this.articleData.category.pageTitle),
            this.viewModel.headerImage(this.articleData.headerImage),
            this.viewModel.iconUrl(this.articleData.icon),
            this.viewModel.introCopy(this.articleData.introCopy),
            "video" == this.articleData.type && this.articleData.hasOwnProperty("videoID") ? this.viewModel.isVideo(!0) : this.articleData.photo && this.viewModel.isPhoto(!0),
            this._$introContainer = $(this.element).find(".intro"),
            this._$playerContainer = $(this.element).find(".player-container"),
            this._$scrollDown = $(this.element).find(".scroll-down"),
            this._$nextArticleButton = $(this.element).find(".button-next"),
            this._$prevArticleButton = $(this.element).find(".button-prev"),
            this._$footer = $("#page-footer"),
            this._$textWrap = $(this.element).find(".text-wrap"),
            this._$headerCloseButton = $(".view-article .close-btn"),
            this._$headerLogo = $("#page-header .logo"),
            this._$headerSocialButton = $(".social-share"),
            this._$playButton = $(this.element).find(".play-btn"),
            this._$heading = $(this.element).find("h1"),
            this._$categoryIcon = $(this.element).find(".category-icon"),
            this._$categoryText = $(this.element).find(".text-wrap .category"),
            this._$summary = $(this.element).find(".text-wrap .summary"),
            this.allowInteraction() && this.options.controller.transitionInAnimation && (this.options.controller._$categoryIcon = this._$categoryIcon,
            this.options.controller._$articleTitle = this._$heading,
            this.options.controller._$categoryText = this._$categoryText,
            this.options.controller._$summary = this._$summary,
            this.options.controller._$scrollDown = this._$scrollDown,
            this.options.controller._$playBtn = this._$playButton,
            TweenLite.set(this._$heading, {
                y: c + "px"
            }),
            TweenLite.set(this._$categoryIcon, {
                y: c + "px"
            }),
            TweenLite.set(this._$categoryText, {
                y: c + "px"
            }),
            TweenLite.set(this._$summary, {
                y: c + "px"
            }),
            TweenLite.set(this._$scrollDown, {
                y: c + "px"
            }),
            TweenLite.set(this._$playButton, {
                scale: 0
            })),
            $(window).on("resize" + this.eventNamespace, $.debounce(100, function() {
                b.onResize()
            }
            )),
            this.onResize()
        }
        ,
        b.prototype.initYoutubePlayer = function() {
            var a = this;
			
			
            e.getInstance().youTubeIframeAPIReady.then(function() {
                a.youtubePlayer || (a.youtubePlayer = new YT.Player("youtube-player-" + a.eventNamespace.replace(".", ""),{
                    height: 390,
                    width: 640,
                    videoId: a.articleData.videoID,
                    events: {
                        onReady: a.onPlayerReady.bind(a),
                        onStateChange: a.onPlayerStateChange.bind(a)
                    },
                    playerVars: {
                        wmode: "transparent"
                    }
                }))
            }
            )
        }
        ,
        b.prototype.startVideo = function() {
            var a = this;
            $(this.element).addClass("animating"),
            e.getInstance().transitioning = !0;
            var b = new TimelineLite({
                onComplete: function() {
                    a._$playerContainer = $(a.element).find(".player-container"),
				    (a._$playerContainer.find("embed").length==0) && (a._$playerContainer.append('<embed src="http://player.youku.com/player.php/sid/XMTUwNjM0NTY3Ng==/v.swf" allowFullScreen="true" quality="high" width="100%" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>')), 
                    a._$playerContainer.css({
                        display: "block"
                    }),
                    e.getInstance().isMobile() || a._$content.css({
                        display: "none"
                    }),
                    a.options.controller.buttonsAnimated = !0,
                    e.getInstance().isMobile() && a._$currentContainer.on("scroll.intro", function() {
                        a.onScroll()
                    }
                    ),
                    a.playVideo()
                },
                onReverseComplete: function() {
                    $(a.element).removeClass("animating"),
                    $("#page-header").removeClass("animating"),
                    a.scrollDown(),
                    a.options.controller.buttonsAnimated = !1
                }
            });
            if (e.getInstance().isMobile()) {
                var c = $(this.element).height()
                  , d = {
                    y: "-" + c + "px",
                    ease: Power3.easeInOut
                };
                b.to(this._$playButton, .8, d),
                b.to(this._$headerLogo, .8, d, "-=0.5"),
                b.to(this._$headerSocialButton, .8, d, "-=0.5"),
                b.to(this._$headerCloseButton, .8, d, "-=0.5"),
                b.to($(this.element).find(".category-icon"), .5, d, "-=0.5")
            } else {
                var f = $(this.element).height()
                  , d = {
                    y: "-" + f + "px",
                    ease: Power1.easeInOut
                }
                  , g = $("#page-header");
                g.addClass("animating"),
                b.to($(this.element).find(".category-icon"), 1.5, d),
                b.to($(this.element).find("h1"), 1.5, d, "-=1.4"),
                b.to($(this.element).find(".category"), 1.5, d, "-=1.4"),
                b.to($(this.element).find(".summary"), 1.5, d, "-=1.4"),
                b.to(this._$playButton, 1.5, d, "-=1.4"),
                b.to(this._$scrollDown, 1.5, d, "-=1.4"),
                b.to(this._$nextArticleButton, 1.5, d, "-=1.4"),
                b.to(this._$prevArticleButton, 1.5, d, "-=1.4"),
                b.to(this._$headerCloseButton, .8, d, "-=1.5"),
                b.to(g, .8, d, "-=1.5"),
                b.to($("#component-indicator"), 1.5, d, "-=1.4"),
                b.to($(this.element).find(".close-video-btn"), .5, {
                    y: "0px"
                }),
                $(".buttons").css({
                    display: "none"
                })
            }
            this.tlPlayerStart = b
        }
        ,
        b.prototype.hideVideo = function() {
           
            this._$content.css({
                display: "block"
            }),
            this._$playerContainer.css({
                display: "none"
            }),
            $(".buttons").css({
                display: "block"
            }),
            this.tlPlayerStart.reverse(),
            e.getInstance().transitioning = !1
        }
        ,
        b.prototype.playVideo = function() {
            var a = this;
            this.youtubePlayer || this.initYoutubePlayer(),
            window.mobileDevice ? this.isPlayerReady() && this.youtubePlayer && (this.youtubePlayer.d && this.youtubePlayer.destroy(),
            this.youtubePlayer = null ,
            this.initYoutubePlayer()) : this.isPlayerReady() ? this.youtubePlayer.playVideo() : this._subscriptions.push(this.isPlayerReady.subscribe(function(b) {
                b && a.youtubePlayer.playVideo()
            }
            ))
        }
        ,
        b.prototype.onResize = function() {
            this._$footer || (this._$footer = $("#page-footer"));
            var a, b = this._$footer.height(), c = $(window).height(), d = this._$textWrap.height() / c * 100, f = (c - b) / 100 * 80, g = this._$content.height() + this._$scrollDown.height();
            if (e.getInstance().isMobile()) {
                if (d > 35) {
                    var h = 2 * (d - 35);
                    a = c / 100 * h + c
                } else
                    a = c - b;
                for (; this._$heading[0].scrollWidth > this._$heading.innerWidth(); ) {
                    var i = parseInt(this._$heading.css("font-size").replace("px", ""));
                    console.log(i - 2),
                    this._$heading.css("font-size", i - 2 + "px")
                }
            } else
                a = g > f ? c + (c - f) / 2 : c - b;
            this._$introContainer.height(a)
        }
        ,
        b.prototype.onScroll = function() {
            this._$currentContainer.off("scroll.intro");
            var a = new TimelineLite;
            if (e.getInstance().isMobile())
                a.to(this._$headerLogo, .8, {
                    y: "0",
                    ease: Power1.easeInOut
                }, "-=0.5"),
                a.to(this._$headerSocialButton, .8, {
                    y: "0",
                    ease: Power1.easeInOut
                }, "-=0.5"),
                a.to(this._$headerCloseButton, .8, {
                    y: "0",
                    ease: Power1.easeInOut
                }, "-=0.5");
            else {
                var b = $("#page-header");
                b.addClass("animating"),
                a.to(this._$headerCloseButton, .5, {
                    y: "0",
                    ease: Power1.easeInOut
                }),
                a.to(b, .5, {
                    y: "0",
                    ease: Power1.easeInOut
                }, "-=0.6"),
                a.to($("#component-indicator"), 1, {
                    y: "0",
                    ease: Power1.easeInOut
                }, "-=0.6")
            }
            this.buttonsAnimatedBack = !0
        }
        ,
        b.prototype.scrollDown = function() {
            var a = $(this.element).height();
            this.options.controller.animateScrollTo(a)
        }
        ,
        b.prototype.animateButtonsMobile = function() {
            var a = this
              , b = new TimelineLite({
                onComplete: function() {
                    e.getInstance().isMobile() && a._$currentContainer.on("scroll.intro", function() {
                        a.onScroll()
                    }
                    )
                }
            });
            if (e.getInstance().isMobile()) {
                var c = $(this.element).height()
                  , d = {
                    y: "-" + c + "px",
                    ease: Power3.easeInOut
                };
                b.to($("#page-header"), .8, d, "-=0.5"),
                b.to(this._$headerSocialButton, .8, d, "-=0.5"),
                b.to(this._$headerCloseButton, .8, d, "-=0.5"),
                this.buttonsAnimatedBack = !1
            } else {
                var f = $(this.element).height()
                  , d = {
                    y: "-" + f + "px",
                    ease: Power1.easeInOut
                }
                  , g = $("#page-header");
                g.addClass("animating"),
                b.to(this._$headerCloseButton, .8, d, "-=0.5"),
                b.to(g, .8, d, "-=0.5"),
                b.to($("#component-indicator"), 1.5, d, "-=1.4")
            }
        }
        ,
        b.prototype.onPlayerReady = function() {
            this.isPlayerReady(!0),
            this._$playerContainer = $(this.element).find(".player-container"),
            window.mobileDevice || this.youtubePlayer.playVideo()
        }
        ,
        b.prototype.onPlayerStateChange = function(a) {
            var b = a.target;
            switch (a.data) {
            case 5:
            case -1:
                b.open && (b.open = !1,
                console.log("- video_close"));
                break;
            case 1:
                b.open ? (this.animateButtonsMobile(),
                console.log("- video_play")) : (b.open = !0,
                this.animateButtonsMobile(),
                console.log("- video_start"));
                break;
            case 0:
                b.open = !1,
                console.log("- video_complete"),
                this.hideVideo();
                break;
            case 2:
                console.log("- video_stop")
            }
        }
        ,
        b.prototype.destruct = function() {
            $(window).off("resize" + this.eventNamespace),
            this._$currentContainer && this._$currentContainer.off("scroll.intro"),
            this.youtubePlayer && (this.youtubePlayer.d && this.youtubePlayer.destroy(),
            this.youtubePlayer = null ),
            this.allowInteraction = null ,
            this.isPlayerReady = null ,
            this.tlPlayerStart = null ,
            this.articleData = null ,
            this._$introContainer = null ,
            this._$footer = null ,
            this._$content = null ,
            this._$playerContainer = null ,
            this._$scrollDown = null ,
            this._$nextArticleButton = null ,
            this._$prevArticleButton = null ,
            this._$headerLogo = null ,
            this._$headerSocialButton = null ,
            this._$headerCloseButton = null ,
            this._$playButton = null ,
            this._$textWrap = null ,
            this._$categoryIcon = null ,
            this._$categoryText = null ,
            this._$summary = null ,
            this.buttonsAnimatedBack = null ,
            this._$currentContainer = null ,
            this._$heading = null ,
            a.prototype.destruct.call(this)
        }
        ,
        b
    }
    (c);
    return f
}
);
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
define("app/component/intro/IntroViewModel", ["require", "exports", "lib/temple/component/AbstractComponentViewModel", "knockout", "app/data/DataManager"], function(a, b, c, d, e) {
    var f = function(a) {
        function b() {
            a.call(this),
            this.title = d.observable(""),
            this.categoryText = d.observable(""),
            this.headerImage = d.observable(""),
            this.iconUrl = d.observable(""),
            this.introCopy = d.observable(""),
            this.isVideo = d.observable(!1),
            this.isPhoto = d.observable(!1)
        }
        return __extends(b, a),
        b.prototype.gotoNext = function() {
            e.getInstance().transitioning || this.controller.allowInteraction() && e.getInstance().showNextButton() && this.controller.options.controller.gotoNext()
        }
        ,
        b.prototype.gotoPrev = function() {
            e.getInstance().transitioning || this.controller.allowInteraction() && e.getInstance().showPrevButton() && this.controller.options.controller.gotoPrev()
        }
        ,
        b.prototype.scrollDown = function() {
            this.controller.scrollDown()
        }
        ,
        b.prototype.destruct = function() {
            this.title = null ,
            this.categoryText = null ,
            this.iconUrl = null ,
            this.introCopy = null ,
            this.headerImage = null ,
            this.isVideo = null ,
            this.isPhoto = null ,
            a.prototype.destruct.call(this)
        }
        ,
        b
    }
    (c);
    return f
}
),
define("text!app/component/intro/intro.html", [], function() {
    return '<div class="component-intro" data-bind="\r\n	swipeleft: gotoNext,\r\n	swiperight: gotoPrev">\r\n	<section class="intro">\r\n		<div class="background-image" data-bind="style: { backgroundImage: \'url(\' + headerImage() + \')\' }"></div>\r\n		<div class="center-content">\r\n			<!--<div class="category-icon">-->\r\n				<!--<div class="wrap-icon">-->\r\n					<!--<div class="icon" data-bind="style: { backgroundImage: \'url(\' + iconUrl() + \')\' }"></div>-->\r\n				<!--</div>-->\r\n			<!--</div>-->\r\n			<div class="text-wrap">\r\n				<h1 data-bind="html: title"></h1>\r\n				<div class="category">\r\n					<p data-bind="html: categoryText"></p>\r\n				</div>\r\n				<div class="summary"><p data-bind="html: introCopy"></p></div>\r\n			</div>\r\n			\r\n			<!-- ko if: isVideo -->\r\n			<div class="play-btn" data-bind="tap: controller.startVideo.bind(controller)"></div>\r\n			<!-- /ko -->\r\n		</div>\r\n\r\n		<div class="scroll-down" data-bind="tap: function(){ scrollDown() }">\r\n			<span class="text" data-bind="localizedText: {id: \'defaults.article.scroll_down\', html: false}"></span>\r\n			<span class="arrow-down"><img src="inc/image/icons/arrow-down.png" alt="arrow down" /></span>\r\n		</div>\r\n\r\n		<!-- ko if: controller.allowInteraction -->\r\n		<div class="button-prev" data-bind="tap: gotoPrev, css.visible: dataManager.showPrevButton"><span></span></div>\r\n		<div class="button-next" data-bind="tap: gotoNext, css.visible: dataManager.showNextButton"><span></span></div>\r\n		<!-- /ko -->\r\n\r\n		<!-- ko if: isVideo -->\r\n		<div class="player-container" data-bind="attr : {id : \'youtube-player-\'+controller.eventNamespace.replace(\'.\',\'\')}"></div>\r\n		<!-- /ko -->\r\n\r\n		<div class="close-video-btn" data-bind="tap: controller.hideVideo.bind(controller)">\r\n			<span class="icon-cross"></span>\r\n		</div>\r\n	</section>\r\n</div>'
}
),
define("app/component/intro/IntroBundle", ["require", "exports", "app/component/intro/IntroController", "app/component/intro/IntroViewModel", "text!app/component/intro/intro.html"], function(a, b, c, d, e) {
    b.controller = c,
    b.viewmodel = d,
    b.template = e
}
);
//# sourceMappingURL=../../../../sourcemap/app/component/intro/IntroBundle.js.map
