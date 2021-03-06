var __extends = this.__extends ||
function(a, b) {
    function c() {
        this.constructor = a
    }
    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
    c.prototype = b.prototype,
    a.prototype = new c
};
define("app/component/polaroid/PolaroidController", ["require", "exports", "lib/temple/component/AbstractComponentController", "app/data/DataManager"],
function(a, b, c, d) {
    var e = function(a) {
        function b(b, c) {
            a.call(this, b, c),
            this.articleData = c.articleData
        }
        return __extends(b, a),
        b.prototype.init = function() {
            var b = this;
            a.prototype.init.call(this),
            this.viewModel.showLoader(!0),
            d.getInstance().transitionInDone() ? this.addData() : this._subscriptions.push(d.getInstance().transitionInDone.subscribe(function(a) {
                a && b.addData()
            }))
        },
        b.prototype.addData = function() {
            for (var a = this,
            b = 0,
            c = 0; c < this.articleData.photos.length; c++) {
                var d = new Image;
                d.onload = function() {++b,
                    b >= a.articleData.photos.length && (a.viewModel.showLoader(!1), a.viewModel.photos(a.articleData.photos), a.viewModel.copy(a.articleData.copy), a.initPhotoStack())
                },
                d.src = this.articleData.photos[c]
            }
            $(window).on("resize" + this.eventNamespace, $.debounce(100,
            function() {
                a.onResize()
            })),
            this.onResize()
        },
        b.prototype.initPhotoStack = function() {
            this.photostack = new Photostack($(this.element).find("#photostack").get(0), {
                callback: function(a) {}
            }),
            this.onResize()
        },
        b.prototype.gotoNextPhoto = function() {
            this.photostack._gotoNextPhoto()
        },
        b.prototype.gotoPrevPhoto = function() {
            this.photostack._gotoPrevPhoto()
        },
        b.prototype.onResize = function() {
            var a = $(window).height(),
            b = $("#page-footer").height();
            $(this.element).height(a - b),
            this.photostack && this.photostack._resizeHandler()
        },
        b.prototype.destruct = function() {
            this.photostack && (this.photostack._destruct(), this.photostack = null),
            this.articleData = null,
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
define("app/component/polaroid/PolaroidViewModel", ["require", "exports", "lib/temple/component/AbstractComponentViewModel", "knockout"],
function(a, b, c, d) {
    var e = function(a) {
        function b() {
            a.call(this),
            this.photos = d.observableArray([]),
            this.showLoader = d.observable(!1),
            this.copy = d.observable("")
        }
        return __extends(b, a),
        b.prototype.destruct = function() {
            this.photos = null,
            this.showLoader = null,
            a.prototype.destruct.call(this)
        },
        b
    } (c);
    return e
}),
define("text!app/component/polaroid/polaroid.html", [],
function() {
    return '<div class="component-polaroid">\r\n\r\n	<section id="photostack" class="photostack" data-bind="\r\n		swipeleft: controller.gotoNextPhoto.bind(controller),\r\n		swiperight: controller.gotoPrevPhoto.bind(controller)">\r\n		<div data-bind="foreach: photos">\r\n			<figure>\r\n				<div class="photostack-img" data-bind="style: { backgroundImage: \'url(\' + $data + \')\' }"></div>\r\n			</figure>\r\n		</div>\r\n	</section>\r\n\r\n	<div class="content">\r\n		<h2 data-bind="localizedText: {id: \'defaults.article.check_out_my_photos\', html: true}"></h2>\r\n		<div data-bind="html: copy"></div>\r\n	</div>\r\n\r\n	<div class="loader" data-bind="css.show: showLoader">\r\n		<img src="inc/image/canvas-loader.gif" alt="loading" />\r\n	</div>\r\n\r\n</div>'
}),
define("app/component/polaroid/PolaroidBundle", ["require", "exports", "app/component/polaroid/PolaroidController", "app/component/polaroid/PolaroidViewModel", "text!app/component/polaroid/polaroid.html"],
function(a, b, c, d, e) {
    b.controller = c,
    b.viewmodel = d,
    b.template = e
});
//# sourceMappingURL=../../../../sourcemap/app/component/polaroid/PolaroidBundle.js.map
