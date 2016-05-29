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
define(["require", "exports", "app/page/CustomAbstractController", "../data/DataManager", "lib/gaia/api/Gaia", "../data/model/ArticleModel", "../data/enum/Page"], function(a, b, c, d, e, f, g) {
    var h = function(a) {
        function b(b) {
            var c = this;
            a.call(this),
            this.handleArticlesReset = function() {
                c.loadCurrentCategory()
            }
            ,
            this._homePageType = b
        }
        return __extends(b, a),
        b.prototype.init = function() {
            a.prototype.init.call(this),
            $(this.element).removeClass("view-home").addClass("view-home-" + this._homePageType),
            d.getInstance().articleModel.addEventListener(f.EVENT_ARTICLES_RESET, this.handleArticlesReset)
        }
        ,
        b.prototype.onDeeplink = function(a) {
            "index/home/article" != a.routeResult[0].branch && "index/home/popup/contact" != a.routeResult[0].branch && "index/home/popup/privacy-policy" != a.routeResult[0].branch && "index/home/popup/terms-of-use" != a.routeResult[0].branch && "index/home/popup/copyright-notification" != a.routeResult[0].branch && "index/not-found" != a.routeResult[0].branch && "index/home/article" != e.api.getCurrentBranch() && "index/home/popup/contact" != e.api.getCurrentBranch() && "index/home/popup/privacy-policy" != e.api.getCurrentBranch() && "index/home/popup/terms-of-use" != e.api.getCurrentBranch() && "index/home/popup/copyright-notification" != e.api.getCurrentBranch() && "index/home/article/lightBox" != e.api.getCurrentBranch() && this.loadCurrentCategory()
        }
        ,
        b.prototype.loadCurrentCategory = function() {
            var a = this
              , b = this.getCurrentCategory()
              , c = null  != b ? b.id : null ;

            d.getInstance().articleModel.loadArticles(c, f.DEFAULT_ARTICLE_LIMIT, 0, function(c) {
                a.getCurrentCategory() == b && a.onCategoryChanged(b)
            }
            )
        }
        ,
        b.prototype.getCurrentCategory = function() {
            var a, b = e.api.getParam("slug");
            return b ? (a = d.getInstance().articleModel.getCategoryByLink(b),
            null  === a && e.api["goto"](g.NOT_FOUND)) : a = null ,
            a
        }
        ,
        b.prototype.onCategoryChanged = function(a) {}
        ,
        b.prototype.destruct = function() {
            d.getInstance().articleModel.removeEventListener(f.EVENT_ARTICLES_RESET, this.handleArticlesReset),
            a.prototype.destruct.call(this)
        }
        ,
        b
    }
    (c);
    return h
}
);
//# sourceMappingURL=../../../sourcemap/app/page/AbstractHomeController.js.map
