var __extends = this.__extends ||
function(a, b) {
    function c() {
        this.constructor = a
    }
    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
    c.prototype = b.prototype,
    a.prototype = new c
};
define(["require", "exports", "lib/temple/control/sequence/tasks/AbstractTask", "app/util/PlatformProfiler", "../util/PlatformProfileType", "../config/CanvasSettings"],
function(a, b, c, d, e, f) {
    var g = function(a) {
        function b() {
            a.call(this)
        }
        return __extends(b, a),
        b.prototype.executeTaskHook = function() {
            var a = d.getInstance(),
            b = a.getProfile();
            2 > b && (f.useBubbleOpacity = !1),
            a.isMobile && (f.useIntroEmitters = !1, f.useBubbleOpacity = !1, f.backgroundEmitterChance = .02, f.foregroundEmitterChance = .03, f.smallBubbleEmitterChance = .6, f.useRandomAnchorOffset = !1, f.useTitleBubbleTransitions = !1, f.useScrollCenterOffset = !0, f.useScrollSnapping = !0, f.nodeSize = 170, f.categoryTitleSize = 30, f.circularTextSize = 9, f.circularTextOffset = 10, f.articleTextSize = 16, f.articleTextOffset = 12, f.featuredTextSize = 14, f.featuredTextOffset = 7, f.nodeDriftXAmount = .1, f.nodeDriftYAmount = .1),
            this.done()
        },
        b
    } (c);
    return g
});
//# sourceMappingURL=../../../sourcemap/app/control/ConfigureCanvasSettingsTask.js.map
