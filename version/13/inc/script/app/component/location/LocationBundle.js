//var __extends = this.__extends ||
//    function(a, b) {
//        function c() {
//            this.constructor = a
//        }
//        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
//        c.prototype = b.prototype,
//            a.prototype = new c
//    };
//define("app/component/location/LocationController", ["require", "exports", "lib/temple/component/AbstractComponentController", "app/data/DataManager"],
//    function(a, b, c, d) {
//        var e = function(a) {
//            function b(b, c) {
//                a.call(this, b, c),
//                    this.articleData = c.articleData
//            }
//            return __extends(b, a),
//                b.prototype.init = function() {
//                    var b = this;
//                    a.prototype.init.call(this),
//                        d.getInstance().loadMap() ? this.initMap() : this._subscriptions.push(d.getInstance().loadMap.subscribe(function(a) {
//                            a && b.initMap()
//                        }))
//                },
//                b.prototype.initMap = function() {
//                    var a = new google.maps.LatLng(this.articleData.lat, this.articleData["long"]),
//                        b = {
//                            zoom: 15,
//                            center: a,
//                            scrollwheel: !1
//                        };
//                    this.gMap = new google.maps.Map($(this.element).find(".map")[0], b),
//                        this.marker = new google.maps.Marker({
//                            position: a,
//                            map: this.gMap
//                        })
//                },
//                b.prototype.destruct = function() {
//                    this.articleData = null,
//                        this.marker = null,
//                    this.gMap && delete this.gMap,
//                        this.gMap = null,
//                        a.prototype.destruct.call(this)
//                },
//                b
//        } (c);
//        return e
//    });
//var __extends = this.__extends ||
//    function(a, b) {
//        function c() {
//            this.constructor = a
//        }
//        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
//        c.prototype = b.prototype,
//            a.prototype = new c
//    };
//define("app/component/location/LocationViewModel", ["require", "exports", "lib/temple/component/AbstractComponentViewModel"],
//    function(a, b, c) {
//        var d = function(a) {
//            function b() {
//                a.call(this)
//            }
//            return __extends(b, a),
//                b.prototype.destruct = function() {
//                    a.prototype.destruct.call(this)
//                },
//                b
//        } (c);
//        return d
//    }),
//    define("text!app/component/location/location.html", [],
//        function() {
//            return '<div class="component-location">\r\n	<div class="top">\r\n		<div class="pointer-icon"></div>\r\n	</div>\r\n	<div class="map"></div>\r\n</div>'
//        }),
//    define("app/component/location/LocationBundle", ["require", "exports", "app/component/location/LocationController", "app/component/location/LocationViewModel", "text!app/component/location/location.html"],
//        function(a, b, c, d, e) {
//            b.controller = c,
//                b.viewmodel = d,
//                b.template = e
//        });
////# sourceMappingURL=../../../../sourcemap/app/component/location/LocationBundle.js.map
