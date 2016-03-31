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
define(["require", "exports", "app/page/CustomAbstractController", "lib/gaia/api/Gaia", "app/data/DataManager"], function(a, b, c, d, e) {
    var f = function(a) {
        function b() {
            a.call(this),
            e.getInstance().lightBoxActive = !0,
            "image" == d.api.getParam("type") ? this.imageID = this.getFullsizeImage(d.api.getParam("media").replace(/^\//, "")) : "video" == d.api.getParam("type") && (this.videoID = this.getFullsizeImage(d.api.getParam("media").replace(/^\//, "")))
        }
        return __extends(b, a),
        b.prototype.init = function() {
            var b = this;
            var vpath;
            switch (b.videoID){
                case 'uidAfImDjZg':
                    vpath= '<embed src="http://player.youku.com/player.php/sid/XMTUxNTQzNDU4NA==/v.swf" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
                    break;
                case 'Maji3tnA0Pw':
                    vpath= '<embed src="http://player.youku.com/player.php/sid/XMTUxNTQzNTY0MA==/v.swf" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
                    break
            }
            a.prototype.init.call(this),
            this.screenWidth = $(window).innerWidth(),
            this.screenHeight = $(window).innerHeight(),
            this.imageContainer = $(this.element).find(".lightbox-image"),
            this.ghost = $(this.element).find(".lightbox-ghost img"),
            "image" == d.api.getParam("type") ? (this.viewModel.imageVisible(!0),
            this.viewModel.videoVisible(!1),
            this.viewModel.imageSRC(this.imageID),
            $(window).on("resize" + this.eventNamespace, function() {
                b.calcWidth()
            }
            ),
            $(window).on("orientationchange" + this.eventNamespace, function() {
                b.calcWidth()
            }
            )) : "video" == d.api.getParam("type") && (this.viewModel.imageVisible(!1),
            this.viewModel.videoVisible(!0),
			this._$playerContainer = $(this.element).find(".video-player"),
		    (this._$playerContainer.find("embed").length==0) && (this._$playerContainer.append(vpath)),


            e.getInstance().youTubeIframeAPIReady.then(function() {
                b.youtubePlayer = new YT.Player("youtube-player-" + b.eventNamespace.replace(".", ""),{
                    height: 335,
                    width: 550,
                    videoId: b.videoID,
                    events: {
                        onReady: b.onPlayerReady.bind(b),
                        onStateChange: b.onPlayerStateChange.bind(b)
                    },
                    playerVars: {
                        controls: 1,
                        wmode: "transparent"
                    }
                })
            }
            ))
        }
        ,
        b.prototype.calcWidth = function() {
            this.screenWidth = $(window).innerWidth(),
            this.screenHeight = $(window).innerHeight(),
            this.getDimensions()
        }
        ,
        b.prototype.getDimensions = function() {
            var a = $(this.element).find(".lightbox-image-container");
            this.imageDimensions = this.calculateAspectRatioFit(this.ghost.width(), this.ghost.height(), this.screenWidth - 25, this.screenHeight - 25),
            TweenLite.to(a, .75, {
                width: this.imageDimensions.width,
                height: this.imageDimensions.height,
                marginTop: this.imageDimensions.height / 2 * -1,
                marginLeft: this.imageDimensions.width / 2 * -1,
                ease: Power4.easeInOut
            })
        }
        ,
        b.prototype.calculateAspectRatioFit = function(a, b, c, d) {
            var e = Math.min(c / a, d / b);
            return {
                width: c > a && d > b ? a : a * e,
                height: d > b && c > a ? b : b * e
            }
        }
        ,
        b.prototype.getFullsizeImage = function(a) {
            return a.replace(/\/mobile_|\/desktop_/, "")
        }
        ,
        b.prototype.closeLightBox = function() {
            d.api.back()
        }
        ,
        b.prototype.onPlayerReady = function() {}
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
                b.open ? console.log("- video_play") : (b.open = !0,
                console.log("- video_start"));
                break;
            case 0:
                b.open = !1,
                console.log("- video_complete");
                break;
            case 2:
                console.log("- video_stop")
            }
        }
        ,
        b.prototype.destruct = function() {
            $(window).off("resize" + this.eventNamespace),
            $(window).off("orientationchange" + this.eventNamespace),
            this.youtubePlayer && (this.youtubePlayer.d && this.youtubePlayer.destroy(),
            this.youtubePlayer = null ),
            this.imageID = null ,
            this.videoID = null ,
            this.imageContainer = null ,
            this.ghost = null ,
            this.imageDimensions = null ,
            this.screenWidth = null ,
            this.screenHeight = null ,
            a.prototype.destruct.call(this)
        }
        ,
        b
    }
    (c);
    return f
}
);
//# sourceMappingURL=../../../../sourcemap/app/page/lightBox/LightBoxController.js.map
