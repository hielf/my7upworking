var __extends = this.__extends ||
    function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        c.prototype = b.prototype,
            a.prototype = new c
    };
define("app/component/gallery/GalleryController", ["require", "exports", "lib/temple/component/AbstractComponentController", "app/data/DataManager", "lib/gaia/api/Gaia", "app/data/enum/Page"],
    function(a, b, c, d, e, f) {
        var g = function(a) {
            function b(b, c) {
                a.call(this, b, c),
                    this.options = c,
                    this.articleData = c.articleData
            }
            return __extends(b, a),
                b.prototype.init = function() {
                    var b = this;
                    a.prototype.init.call(this),
                        this._$footer = $("#page-footer"),
                        this._$galleryContainer = $(this.element).find(".gallery"),
                        this.viewModel.dragInfoVisible(!1),
                        this.viewModel.showLoader(!0),
                        this.sizeFrame(),
                        d.getInstance().transitionInDone() ? this.addData() : this._subscriptions.push(d.getInstance().transitionInDone.subscribe(function(a) {
                            a && b.addData()
                        }))
                },
                b.prototype.addData = function() {
                    for (var a = this,
                             b = e.api.getParam("category"), c = e.api.getParam("title"), f = 0, g = _baseurl + "share/?url=" + b + "/article/" + c + "&img=", h = 0; h < this.articleData.images.length; h++) {
                        this.articleData.images[h] = {
                            url: this.articleData.images[h],
                            shareUrl: "http://hielf1984.ddns.net:17865/"//g + this.articleData.images[h]
                        };
                        var i = new Image;
                        i.onload = function() {++f,
                        f >= a.articleData.images.length && (a.viewModel.showLoader(!1), a.viewModel.dragInfoVisible(!0))
                        },
                            i.src = this.articleData.images[h].url
                    }
                    this.viewModel.dragTitle(this.articleData.title),
                        $(this.element).addClass("intro-" + this.eventNamespace.replace(".", "")),
                        d.getInstance().isMobile() ? this.viewModel.dataUrl(this.articleData.dataUrl + "small/") : this.viewModel.dataUrl(this.articleData.dataUrl),
                        this.viewModel.galleryImages(this.articleData.images),
                        this.galleryContainerPosition = 0,
                        this._$imagesContainer = $(this.element).find(".images"),
                        $(window).on("resize" + this.eventNamespace, $.debounce(100,
                            function() {
                                a.onResize()
                            })),
                        this.onResize(),
                        this.iScroller = new IScroll(".intro-" + this.eventNamespace.replace(".", "") + " .image-scroller", {
                            eventPassthrough: !0,
                            scrollX: !0,
                            scrollY: !1,
                            mouseWheel: !1,
                            tap: !0,
                            click: !0
                        }),
                        this.iScroller.on("scrollStart",
                            function() {
                                a.scrollStart()
                            }),
                        this.iScroller.on("scrollEnd",
                            function() {
                                a.scrollEnd()
                            })
                },
                b.prototype.scrollStart = function() {
                    clearTimeout(this.timeoutDragInfo),
                        this.viewModel.dragInfoVisible(!1)
                },
                b.prototype.scrollEnd = function() {
                    var a = this;
                    this.timeoutDragInfo = setTimeout(function() {
                            a.viewModel.dragInfoVisible(!0)
                        },
                        5e3)
                },
                b.prototype.onResize = function() {
                    var a = this.sizeFrame();
                    this._$images = this._$galleryContainer.find(".images .item");
                    var b = this.viewModel.galleryImages().length / 2;
                    b % 2 != 0 && (b = Math.ceil(b)),
                        this.imagesContainerWidth = Math.ceil(b * (a / 2)),
                        this._$imagesContainer.width(this.imagesContainerWidth),
                        this._$images.width(a / 2),
                        this._$images.height(a / 2)
                },
                b.prototype.sizeFrame = function() {
                    var a = this._$footer.height(),
                        b = $(window).height() - a + 6;
                    return this._$galleryContainer.height(b),
                        b
                },
                b.prototype.clickElemenet = function(a, b) {
                    var c = $(b).closest(".icon");
                    if (c.length > 0) {
                        var d = c.attr("data-share-type"),
                            e = c.attr("data-photo");
                        console.log(d + " - " + e)
                    } else this.toggleActive(a, b)
                },
                b.prototype.toggleActive = function(a, b) {
                    window.mobileDevice ? $(b).closest(".item").toggleClass("active") : this.showLightbox(a)
                },
                b.prototype.showLightbox = function(a) {
                    var b = e.api.getParam("category"),
                        c = e.api.getParam("title"),
                        d = a.url.replace(/^(\/)/, "");
                    e.api.gotoPopup(f.POPUP_LIGHTBOX, {
                        category: b,
                        title: c,
                        type: "image",
                        media: d
                    })
                },
                b.prototype.destruct = function() {
                    this.iScroller && (this.iScroller.off("scrollStart"), this.iScroller.off("scrollEnd"), this.iScroller.destroy(), this.iScroller = null),
                        $(window).off("resize" + this.eventNamespace),
                        this.articleData = null,
                        this._$galleryContainer = null,
                        this._$imagesContainer = null,
                        this._$images = null,
                        this.galleryContainerPosition = null,
                        this.imagesContainerWidth = null,
                        clearTimeout(this.timeoutDragInfo),
                        this.timeoutDragInfo = null,
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
define("app/component/gallery/GalleryViewModel", ["require", "exports", "lib/temple/component/AbstractComponentViewModel", "knockout"],
    function(a, b, c, d) {
        var e = function(a) {
            function b() {
                a.call(this),
                    this.dataUrl = d.observable(""),
                    this.galleryImages = d.observableArray([]),
                    this.dragInfoVisible = d.observable(!0),
                    this.dragTitle = d.observable(""),
                    this.showLoader = d.observable(!1)
            }
            return __extends(b, a),
                b.prototype.togglePhotoOverlay = function(a, b) {
                    this.controller.clickElemenet(a, b.target)
                },
                b.prototype.openLightBox = function(a) {
                    this.controller.showLightbox(a)
                },
                b.prototype.destruct = function() {
                    this.galleryImages = null,
                        this.dragInfoVisible = null,
                        this.dataUrl = null,
                        this.showLoader = null,
                        a.prototype.destruct.call(this)
                },
                b
        } (c);
        return e
    }),
    define("text!app/component/gallery/gallery.html", [],
        function() {
            return '<div class="component-gallery">\r\n	<section class="gallery">\r\n		<div class="loader" data-bind="css.show: showLoader">\r\n			<img src="inc/image/canvas-loader.gif" alt="loading" />\r\n		</div>\r\n\r\n		<div class="image-scroller">\r\n			<div class="images" data-bind="foreach: galleryImages">\r\n				<div class="item" data-bind="\r\n					style: { backgroundImage: \'url(\'+ url +\')\' },\r\n					tap: function(obj, e){ $root.togglePhotoOverlay(obj, e) }">\r\n					<div class="overlay">\r\n						<div class="share">\r\n							<p data-bind="localizedText: {id: \'defaults.article.share_this_picture\', html: false}"></p>\r\n							<ul>\r\n								<li><div class="icon" data-share data-share-type="twitter" data-bind="attr: { \'data-share-url\': shareUrl, \'data-share-text\': $data.shareText }">\r\n									<span class="icon-twitter"></span>\r\n								</div></li>\r\n								<li><div class="icon" data-share data-share-type="facebook" data-bind="attr: { \'data-share-url\': shareUrl }">\r\n									<span class="icon-facebook"></span>\r\n								</div></li>\r\n								' +
                '<li><div class="icon" data-share data-share-type="plus" data-bind="attr: { \'data-share-url\': shareUrl }">\r\n									<span class="icon-googleplus"></span>\r\n								</div></li>\r\n	' +
                '							<!--<li><div class="icon" data-share data-share-type="pinterest" data-bind="-->\r\n										<!--attr: {-->\r\n											<!--\'data-share-media\': \'http://devmonks.nl/c/clm_bbdo/7up/feels_good_to_be_you/v0.1/inc/data/image/loux/header.JPG\',-->\r\n											<!--\'data-share-text\': $data.shareText-->\r\n									<!--}">-->\r\n									<!--<span class="icon-pinterest"></span>-->\r\n								<!--</div></li>-->\r\n								' +
                //'<li><div class="icon" data-bind="tap: function(obj, e){ $root.openLightBox(obj) }">\r\n									<span class="icon-plus"></span>\r\n								</div></li>\r\n	' +
                '						</ul>\r\n						</div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n\r\n			<div class="drag-info" data-bind="css: { \'visible\': dragInfoVisible }">\r\n				<h3 data-bind="html: dragTitle"></h3>\r\n				<div>\r\n					<img src="inc/image/icons/drag-info.png" alt="Drag to explore" />\r\n				</div>\r\n				<div>\r\n					<span class="text" data-bind="localizedText: {id: \'defaults.drag_to_explore\', html: true}"></span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</section>\r\n</div>'
        }),
    define("app/component/gallery/GalleryBundle", ["require", "exports", "app/component/gallery/GalleryController", "app/component/gallery/GalleryViewModel", "text!app/component/gallery/gallery.html"],
        function(a, b, c, d, e) {
            b.controller = c,
                b.viewmodel = d,
                b.template = e
        });
//# sourceMappingURL=../../../../sourcemap/app/component/gallery/GalleryBundle.js.map
