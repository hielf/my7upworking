var __extends = this.__extends ||
function(a, b) {
    function c() {
        this.constructor = a
    }
    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
    c.prototype = b.prototype,
    a.prototype = new c
};
define("app/component/story/StoryController", ["require", "exports", "lib/temple/component/AbstractComponentController", "app/data/DataManager"],
function(a, b, c, d) {
    var e = function(a) {
        function b(b, c) {
            a.call(this, b, c),
            this.options = c,
            this.articleData = c.articleData,
            this.count = 0
        }
        return __extends(b, a),
        b.prototype.init = function() {
            var b = this;
            a.prototype.init.call(this),
            this.viewModel.showLoader(!0),
            d.getInstance().transitionInDone() ? this.setContent() : this._subscriptions.push(d.getInstance().transitionInDone.subscribe(function(a) {
                a && b.setContent()
            }))
        },
        b.prototype.setContent = function() {
            this.viewModel.header(this.articleData.header),
            this.viewModel.question1(this.articleData.question1),
            this.viewModel.question2(this.articleData.question2),
            this.viewModel.question3(this.articleData.question3),
            this.viewModel.question4(this.articleData.question4),
            this.viewModel.question5(this.articleData.question5),
            this.viewModel.quote(this.articleData.quote),
            this.viewModel.image1(this.articleData.image1 ? this.articleData.image1: "inc/image/missing-image.jpg"),
            this.viewModel.image2(this.articleData.image2 ? this.articleData.image2: "inc/image/missing-image.jpg"),
            this.viewModel.image3(this.articleData.image3 ? this.articleData.image3: "inc/image/missing-image.jpg"),
            this.viewModel.hyperlinkStory(this.articleData.hyperlinkStory),
            this.articleData.hyperlinkStory && (this.articleData.twitter && this.viewModel.twitter(this.articleData.twitter), this.articleData.facebook && this.viewModel.facebook(this.articleData.facebook), this.articleData.googlePlus && this.viewModel.googlePlus(this.articleData.googlePlus), this.articleData.pinterest && this.viewModel.pinterest(this.articleData.pinterest), this.articleData.tumbler && this.viewModel.tumbler(this.articleData.tumbler), this.articleData.instagram && this.viewModel.instagram(this.articleData.instagram)),
            this.loadImage(this.articleData.image1),
            this.loadImage(this.articleData.image2),
            this.loadImage(this.articleData.image3)
        },
        b.prototype.loadImage = function(a) {
            var b = this,
            c = new Image;
            c.onload = function() {++b.count,
                b.count >= 3 && b.viewModel.showLoader(!1)
            },
            c.src = a
        },
        b.prototype.destruct = function() {
            this.articleData = null,
            this.count = null,
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
define("app/component/story/StoryViewModel", ["require", "exports", "lib/temple/component/AbstractComponentViewModel", "knockout"],
function(a, b, c, d) {
    var e = function(a) {
        function b() {
            a.call(this),
            this.header = d.observable(""),
            this.question1 = d.observable(""),
            this.question2 = d.observable(""),
            this.question3 = d.observable(""),
            this.question4 = d.observable(""),
            this.question5 = d.observable(""),
            this.quote = d.observable(""),
            this.image1 = d.observable(""),
            this.image2 = d.observable(""),
            this.image3 = d.observable(""),
            this.hyperlinkStory = d.observable(!1),
            this.twitter = d.observable(""),
            this.facebook = d.observable(""),
            this.googlePlus = d.observable(""),
            this.pinterest = d.observable(""),
            this.tumbler = d.observable(""),
            this.instagram = d.observable(""),
            this.showLoader = d.observable(!1)
        }
        return __extends(b, a),
        b.prototype.destruct = function() {
            this.header = null,
            this.question1 = null,
            this.question2 = null,
            this.question3 = null,
            this.question4 = null,
            this.question5 = null,
            this.quote = null,
            this.image1 = null,
            this.image2 = null,
            this.image3 = null,
            this.showLoader = null,
            a.prototype.destruct.call(this)
        },
        b
    } (c);
    return e
}),
define("text!app/component/story/story.html", [],
function() {
    return '<div class="component-story">\r\n	<div class="loader-wrap" data-bind="css.show: showLoader">\r\n		<div class="loader">\r\n			<img src="inc/image/canvas-loader.gif" alt="loading" />\r\n		</div>\r\n	</div>\r\n\r\n	<div class="content">\r\n		<div class="row-1">\r\n			<div class="image-1">\r\n				<img src="" data-bind="attr: { src: image1 }" alt="iamge 1" />\r\n			</div>\r\n			<div class="question question-1">\r\n				<h2>\r\n					<span data-bind="localizedText: {id: \'defaults.article.check_out_my_story\', html: false}"></span>\r\n					<hr>\r\n					<span data-bind="html: header"></span>\r\n				</h2>\r\n				<div data-bind="html: question1"></div>\r\n			</div>\r\n		</div>\r\n\r\n		<!-- ko if: hyperlinkStory -->\r\n		<div class="socialButtons">\r\n			<div class="wrap-icon">\r\n				<!-- ko if: (twitter() !== \'\') ? true : false -->\r\n				<a href="" data-bind="attr: { href: twitter }" target="_blank">\r\n					<div class="social-icon"><span class="icon-twitter"></span></div>\r\n				</a>\r\n				<!-- /ko -->\r\n				<!-- ko if: (facebook() !== \'\') ? true : false -->\r\n				<a href="" data-bind="attr: { href: facebook }" target="_blank">\r\n					<div class="social-icon"><span class="icon-facebook"></span></div>\r\n				</a>\r\n				<!-- /ko -->\r\n				<!-- ko if: (googlePlus() !== \'\') ? true : false -->\r\n				<a href="" data-bind="attr: { href: googlePlus }" target="_blank">\r\n					<div class="social-icon"><span class="icon-googleplus"></span></div>\r\n				</a>\r\n				<!-- /ko -->\r\n				<!-- ko if: (pinterest() !== \'\') ? true : false -->\r\n				<a href="" data-bind="attr: { href: pinterest }" target="_blank">\r\n					<div class="social-icon"><span class="icon-pinterest"></span></div>\r\n				</a>\r\n				<!-- /ko -->\r\n				<!-- ko if: (tumbler() !== \'\') ? true : false -->\r\n				<a href="" data-bind="attr: { href: tumbler }" target="_blank">\r\n					<div class="social-icon"><span class="icon-tumblr"></span></div>\r\n				</a>\r\n				<!-- /ko -->\r\n				<!-- ko if: (instagram() !== \'\') ? true : false -->\r\n				<a href="" data-bind="attr: { href: instagram }" target="_blank">\r\n					<div class="social-icon"><span class="icon-instagram"></span></div>\r\n				</a>\r\n				<!-- /ko -->\r\n			</div>\r\n		</div>\r\n		<!-- /ko -->\r\n\r\n		<!-- ko if: (quote() !== \'\') ? true : false -->\r\n		<div class="quote" data-bind="html: quote"></div>\r\n		<!-- /ko -->\r\n\r\n		<div class="row-2">\r\n			<div class="question question-2">\r\n				<div data-bind="html: question2"></div>\r\n			</div>\r\n\r\n			<div class="question question-3">\r\n				<div data-bind="html: question3"></div>\r\n			</div>\r\n\r\n			<div class="image-2">\r\n				<img src="" data-bind="attr: { src: image2 }" alt="iamge 2" />\r\n			</div>\r\n		</div>\r\n\r\n		<div class="row-3">\r\n			<div class="image-3">\r\n				<img src="" data-bind="attr: { src: image3 }" alt="iamge 2" />\r\n			</div>\r\n\r\n			<div class="question-wrap">\r\n				<div class="question question-4">\r\n					<div data-bind="html: question4"></div>\r\n				</div>\r\n				<div class="question question-5">\r\n					<div data-bind="html: question5"></div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>'
}),
define("app/component/story/StoryBundle", ["require", "exports", "app/component/story/StoryController", "app/component/story/StoryViewModel", "text!app/component/story/story.html"],
function(a, b, c, d, e) {
    b.controller = c,
    b.viewmodel = d,
    b.template = e
});
//# sourceMappingURL=../../../../sourcemap/app/component/story/StoryBundle.js.map
