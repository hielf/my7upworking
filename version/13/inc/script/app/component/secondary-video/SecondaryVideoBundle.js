var __extends = this.__extends ||
function(a, b) {
    function c() {
        this.constructor = a
    }
    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
    c.prototype = b.prototype,
    a.prototype = new c
};
define("app/component/secondary-video/SecondaryVideoController", ["require", "exports", "lib/temple/component/AbstractComponentController", "app/data/DataManager", "lib/gaia/api/Gaia", "app/data/enum/Page"],
function(a, b, c, d, e, f) {
    var g = function(a) {
        function b(b, c) {
            a.call(this, b, c),
            this.articleData = c.articleData
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
            this.viewModel.title(this.articleData.title),
            this.viewModel.copy(this.articleData.copy),
            this.viewModel.videoID(this.articleData.videoID),
            this.isPlayerReady = ko.observable(!1),
            this._$poster = $(this.element).find(".poster"),
            this._$playerContainer = $(this.element).find(".video-container"),
            this._$footer = $("#page-footer"),
            $(window).on("resize" + this.eventNamespace, $.debounce(100,
            function() {
                a.onResize()
            })),
            this.onResize()
        },
        b.prototype.startVideo = function() {
            var a = this;
            this._$playerContainer.css({
                display: "block"
            }),
            this.youtubePlayer || this.initYoutubePlayer(),
            TweenLite.to(this._$poster, .5, {
                opacity: 0,
                onComplete: function() {
                    a._$poster.css({
                        display: "none"
                    }),
                    window.mobileDevice ? a.isPlayerReady() && a.youtubePlayer && (a.youtubePlayer.d && a.youtubePlayer.destroy(), a.youtubePlayer = null, a.initYoutubePlayer()) : a.isPlayerReady() ? a.youtubePlayer.playVideo() : a._subscriptions.push(a.isPlayerReady.subscribe(function(b) {
                        b && a.youtubePlayer.playVideo()
                    }))
                }
            })
        },
        b.prototype.hideVideo = function() {
            var a = this;
            this._$poster.css({
                display: "block"
            }),
            TweenLite.to(this._$poster, .5, {
                opacity: 1,
                onComplete: function() {
                    a._$playerContainer.css({
                        display: "none"
                    })
                }
            })
        },
        b.prototype.initYoutubePlayer = function() {
            var a = this;
            d.getInstance().youTubeIframeAPIReady.then(function() {
                a.youtubePlayer || (a.youtubePlayer = new YT.Player("youtube-player-" + a.eventNamespace.replace(".", ""), {
                    height: 335,
                    width: 550,
                    videoId: a.articleData.videoID,
                    events: {
                        onReady: a.onPlayerReady.bind(a),
                        onStateChange: a.onPlayerStateChange.bind(a)
                    },
                    playerVars: {
                        wmode: "transparent"
                    }
                }))
            })
        },
        b.prototype.onResize = function() {
            if (d.getInstance().isTablet()) {
                var a = $(this.element).find(".info").height() + $(this.element).find(".left").height(),
                b = a + 100;
                $(this.element).height(b)
            } else $(this.element).css("height", "")
        },
        b.prototype.onPlayerReady = function() {
            this.isPlayerReady(!0),
            window.mobileDevice || this.youtubePlayer.playVideo()
        },
        b.prototype.onPlayerStateChange = function(a) {
            var b = a.target;
            switch (a.data) {
            case 5:
            case - 1 : b.open && (b.open = !1, console.log("- video_close"));
                break;
            case 1:
                b.open ? console.log("- video_play") : (b.open = !0, console.log("- video_start"));
                break;
            case 0:
                b.open = !1,
                console.log("- video_complete"),
                this.hideVideo();
                break;
            case 2:
                console.log("- video_stop")
            }
        },
        b.prototype.openVideoPlayer = function() {
            var a = e.api.getParam("category"),
            b = e.api.getParam("title"),
            c = this.articleData.videoID;
            e.api.gotoPopup(f.POPUP_LIGHTBOX, {
                category: a,
                title: b,
                type: "video",
                media: c
            })
        },
        b.prototype.destruct = function() {
            this.youtubePlayer && (this.youtubePlayer.d && this.youtubePlayer.destroy(), this.youtubePlayer = null),
            $(window).off("resize" + this.eventNamespace),
            this.articleData = null,
            this.isPlayerReady = null,
            this._$poster = null,
            this._$playerContainer = null,
            this._$footer = null,
            a.prototype.destruct.call(this)
        },
        b
    } (c);
    return g
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
define("app/component/secondary-video/SecondaryVideoViewModel", ["require", "exports", "lib/temple/component/AbstractComponentViewModel", "knockout"],
function(a, b, c, d) {
    var e = function(a) {
        function b() {
            a.call(this),
            this.title = d.observable(""),
            this.copy = d.observable(""),
            this.videoID = d.observable("")
        }
        return __extends(b, a),
        b.prototype.destruct = function() {
            this.title = null,
            this.copy = null,
            this.videoID = null,
            a.prototype.destruct.call(this)
        },
        b
    } (c);
    return e
}),
define("text!app/component/secondary-video/secondary-video.html", [],
function() {
    return '<div class="component-secondary-video">\r\n	<div class="content">\r\n		<div class="info">\r\n			<h2 data-bind="html: title"></h2>\r\n			<div><p data-bind="html: copy"></p></div>\r\n		</div>\r\n		<div class="left">\r\n			<div class="video-wrap">\r\n				<div class="video">\r\n					<div class="poster" data-bind="style: { backgroundImage: \'url(http://img.youtube.com/vi/\' + videoID() + \'/mqdefault.jpg)\' }">\r\n						<!--<div class="play-btn" data-bind="tap: controller.startVideo.bind(controller)"></div>-->\r\n						<div class="play-btn" data-bind="tap: controller.openVideoPlayer.bind(controller)"></div>\r\n					</div>\r\n					<div class="video-container">\r\n						<div class="video-player" data-bind="attr : {id : \'youtube-player-\'+controller.eventNamespace.replace(\'.\',\'\')}"></div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>'
}),
define("app/component/secondary-video/SecondaryVideoBundle", ["require", "exports", "app/component/secondary-video/SecondaryVideoController", "app/component/secondary-video/SecondaryVideoViewModel", "text!app/component/secondary-video/secondary-video.html"],
function(a, b, c, d, e) {
    b.controller = c,
    b.viewmodel = d,
    b.template = e
});
//# sourceMappingURL=../../../../sourcemap/app/component/secondary-video/SecondaryVideoBundle.js.map
