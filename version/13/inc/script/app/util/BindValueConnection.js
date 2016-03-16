define(["require", "exports", "app/util/BindValue"], function(a, b, c) {
    var d = function() {
        function a(a, b, d, e) {
            this._sourceValue = a || new c,
            this._targetValue = b || new c,
            this._sourceBounds = d,
            this._targetBounds = e,
            this._signalConnection = this._sourceValue.changed.connect(this.onSourceValueChanged.bind(this))
        }
        return a.prototype.onSourceValueChanged = function(a, b) {
            var c = void 0 != this._sourceBounds
              , d = void 0 != this._targetBounds;
            c && d ? this._targetValue.setValue(this._sourceBounds.translate(a, this._targetBounds)) : c && !d ? this._targetValue.setValue(this._sourceBounds.constrain(a)) : !c && d ? this._targetValue.setValue(this._targetBounds.constrain(a)) : this._targetValue.setValue(a)
        }
        ,
        Object.defineProperty(a.prototype, "sourceValue", {
            get: function() {
                return this._sourceValue
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(a.prototype, "targetValue", {
            get: function() {
                return this._targetValue
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(a.prototype, "sourceBounds", {
            get: function() {
                return this._sourceBounds
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(a.prototype, "targetBounds", {
            get: function() {
                return this._targetBounds
            },
            enumerable: !0,
            configurable: !0
        }),
        a.prototype.dispose = function() {
            void 0 != this._signalConnection && (this._signalConnection.dispose(),
            this._signalConnection = null ),
            this._sourceValue = null ,
            this._targetValue = null ,
            this._sourceBounds = null ,
            this._targetBounds = null 
        }
        ,
        a
    }
    ();
    return d
}
);
