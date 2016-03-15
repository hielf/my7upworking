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
define(["require", "exports", "lib/createjs/easeljs/component/EventDispatcher", "lib/temple/config/ConfigManager", "app/config/AssetID"], function(a, b, c, d, e) {
    var f = function(a) {
        function b() {
            if (a.call(this),
            this._assets = {},
            b._instance)
                throw new Error("ResourceManager is a singleton. use getInstance();")
        }
        return __extends(b, a),
        b.getImageElement = function(a, b) {
            var c = document.createElement("img");
            return c.onload = b,
            c.src = a,
            c
        }
        ,
        b.getImageElementByID = function(a, c) {
            var d = document.createElement("img");
            return d.onload = c,
            d.src = b.cm.getVar(a),
            d
        }
        ,
        b.getManifest = function(a) {
            for (var b = d.getInstance(), c = [], f = 0; f < a.length; f++)
                c.push({
                    id: e[a[f]],
                    src: b.getUrl(e[a[f]])
                });
            return c
        }
        ,
        b.getInstance = function() {
            return b._instance || (b._instance = new b),
            b._instance
        }
        ,
        b.prototype.load = function(a) {
            var c, d = this;
            c = a[0].id && a[0].src ? a : b.getManifest(a);
            for (var e = 0; e < c.length; e++)
                this._assets[c[e].id] && c.splice(e, 1);
            var f = new createjs.LoadQueue(!1);
            f.addEventListener("error", function(a) {
                return d.handleLoadError(a)
            }
            ),
            f.addEventListener("progress", function(a) {
                return d.handleProgress(a)
            }
            ),
            f.addEventListener("fileload", function(a) {
                return d.handleFileLoad(a)
            }
            ),
            f.addEventListener("complete", function(a) {
                return d.handleComplete(a)
            }
            ),
            f.loadManifest(c)
        }
        ,
        b.prototype.loadImagesAsync = function(a, c, d) {
            void 0 === c && (c = null ),
            void 0 === d && (d = {});
            var e = b.getManifest(a)
              , f = 0;
            if (c)
                var g = 0
                  , h = function() {
                    g++,
                    c(g / f * 100)
                }
                ;
            for (var i = 0; i < e.length; i++) {
                if (!b.isImageRegExp.test(e[i].src))
                    throw "loadasynch only has support for images " + e[i].id + " does not contain a image resource.";
                this._assets[e[i].id] || (f++,
                this._assets[e[i].id] = b.getImageElement(e[i].src, h)),
                d[e[i].id] = this._assets[e[i].id]
            }
            return d
        }
        ,
        b.prototype.handleLoadError = function(a) {
            console.log("Error loading:"),
            console.log(a)
        }
        ,
        b.prototype.handleFileLoad = function(a) {
            this._assets[a.item.id] = a.result
        }
        ,
        b.prototype.handleComplete = function(a) {
            this.dispatchEvent("complete")
        }
        ,
        b.prototype.handleProgress = function(a) {
            this.dispatchEvent("progress", a)
        }
        ,
        b.prototype.clear = function() {
            this._assets = {}
        }
        ,
        b.prototype.getByID = function(a) {
            if ("undefined" == typeof this._assets[a]) {
                var c = d.getInstance()
                  , e = c.getUrl(a);
                b.isImageRegExp.test(e) && (this._assets[a] = b.getImageElement(e))
            }
            return this._assets[a]
        }
        ,
        b.cm = d.getInstance(),
        b.isImageRegExp = /[\w\/]+.jpg|[\w\/]+.png$/,
        b.isAudioRegExp = /\.mp3$|\.ogg$/,
        b
    }
    (c);
    return f
}
);
//# sourceMappingURL=../../../../sourcemap/lib/temple/net/ResourceManager.js.map
