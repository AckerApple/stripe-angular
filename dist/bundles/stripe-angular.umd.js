(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('stripe-angular', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["stripe-angular"] = {}, global.ng.core, global.ng.common));
})(this, (function (exports, i0, i1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) { if (f !== void 0 && typeof f !== "function")
            throw new TypeError("Function expected"); return f; }
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
            var context = {};
            for (var p in contextIn)
                context[p] = p === "access" ? {} : contextIn[p];
            for (var p in contextIn.access)
                context.access[p] = contextIn.access[p];
            context.addInitializer = function (f) { if (done)
                throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
            var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
            if (kind === "accessor") {
                if (result === void 0)
                    continue;
                if (result === null || typeof result !== "object")
                    throw new TypeError("Object expected");
                if (_ = accept(result.get))
                    descriptor.get = _;
                if (_ = accept(result.set))
                    descriptor.set = _;
                if (_ = accept(result.init))
                    initializers.push(_);
            }
            else if (_ = accept(result)) {
                if (kind === "field")
                    initializers.push(_);
                else
                    descriptor[key] = _;
            }
        }
        if (target)
            Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
    }
    ;
    function __runInitializers(thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
            value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
    }
    ;
    function __propKey(x) {
        return typeof x === "symbol" ? x : "".concat(x);
    }
    ;
    function __setFunctionName(f, name, prefix) {
        if (typeof name === "symbol")
            name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
    }
    ;
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }
    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }

    var STRIPE_PUBLISHABLE_KEY = new i0.InjectionToken('Stripe Publishable Key');
    var STRIPE_OPTIONS = new i0.InjectionToken('Stripe Options');

    var StripeScriptTag = /** @class */ (function () {
        function StripeScriptTag(document, key, options) {
            this.document = document;
            this.src = "https://js.stripe.com/v3/";
            this.window = this.document.defaultView;
            this.load = this.injectIntoHead();
            if (key)
                this.setPublishableKey(key, options);
        }
        StripeScriptTag.prototype.promiseStripe = function () {
            return this.load;
        };
        StripeScriptTag.prototype.promiseInstance = function () {
            var _this = this;
            return this.promiseStripe()
                .then(function (stripe) {
                if (!_this.StripeInstance) {
                    var err = new Error("Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()");
                    err["code"] = "STRIPEKEYNOTSET";
                    throw err;
                    //return Promise.reject( err )
                }
                return _this.StripeInstance;
            });
        };
        StripeScriptTag.prototype.setPublishableKey = function (key, options) {
            var _this = this;
            return this.load.then(function () { return _this.StripeInstance = _this.Stripe(key, options); });
        };
        StripeScriptTag.prototype.injectIntoHead = function () {
            var _this = this;
            if (this.window && this.window["Stripe"]) {
                return Promise.resolve(this.Stripe = this.window["Stripe"]);
            }
            return new Promise(function (res, rej) {
                var head = _this.getTargetTagDropElement();
                var script = _this.document.createElement("script");
                script.setAttribute("src", _this.src);
                script.setAttribute("type", "text/javascript");
                script.addEventListener("load", function () {
                    _this.Stripe = _this.grabStripe();
                    res(_this.Stripe);
                });
                head.appendChild(script);
            });
        };
        StripeScriptTag.prototype.grabStripe = function () {
            return window["Stripe"];
        };
        StripeScriptTag.prototype.getTargetTagDropElement = function () {
            var elm = this.document.getElementsByTagName("head");
            if (elm.length)
                return elm[0];
            return this.document.getElementsByTagName("body")[0];
        };
        return StripeScriptTag;
    }());
    StripeScriptTag.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function StripeScriptTag_Factory() { return new StripeScriptTag(i0__namespace.ɵɵinject(i1__namespace.DOCUMENT), i0__namespace.ɵɵinject(STRIPE_PUBLISHABLE_KEY), i0__namespace.ɵɵinject(STRIPE_OPTIONS)); }, token: StripeScriptTag, providedIn: "root" });
    StripeScriptTag.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    StripeScriptTag.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: String, decorators: [{ type: i0.Inject, args: [STRIPE_PUBLISHABLE_KEY,] }] },
        { type: undefined, decorators: [{ type: i0.Inject, args: [STRIPE_OPTIONS,] }] }
    ]; };

    var StripeComponent = /** @class */ (function () {
        function StripeComponent(StripeScriptTag) {
            this.StripeScriptTag = StripeScriptTag;
            this.catcher = new i0.EventEmitter();
            this.invalidChange = new i0.EventEmitter();
        }
        StripeComponent.prototype.ngOnInit = function () {
            this.init();
        };
        StripeComponent.prototype.init = function () {
            var _this = this;
            return this.StripeScriptTag.promiseInstance()
                .then(function (i) { return _this.stripe = i; });
        };
        return StripeComponent;
    }());
    StripeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: "stripe-component", template: ""
                },] }
    ];
    StripeComponent.ctorParameters = function () { return [
        { type: StripeScriptTag }
    ]; };
    StripeComponent.propDecorators = {
        catcher: [{ type: i0.Output, args: ["catch",] }],
        invalid: [{ type: i0.Input }],
        invalidChange: [{ type: i0.Output }]
    };

    var StripeSource = /** @class */ (function (_super) {
        __extends(StripeSource, _super);
        function StripeSource(StripeScriptTag) {
            var _this = _super.call(this, StripeScriptTag) || this;
            _this.StripeScriptTag = StripeScriptTag;
            _this.sourceChange = new i0.EventEmitter();
            _this.paymentMethodChange = new i0.EventEmitter();
            return _this;
        }
        StripeSource.prototype.createSource = function (extraData) {
            var _this = this;
            delete this.invalid;
            this.invalidChange.emit(this.invalid);
            return this.stripe.createSource(this.elements, extraData)
                .then(function (result) { return _this.processSourceResult(result); });
        };
        StripeSource.prototype.processSourceResult = function (result) {
            if (result.error) {
                var rError = result.error;
                if (rError.type === "validation_error") {
                    this.invalidChange.emit(this.invalid = rError);
                }
                else {
                    this.catcher.emit(rError);
                    throw rError;
                }
            }
            var source = result.source;
            if (source) {
                this.sourceChange.emit(this.source = source);
                return source;
            }
        };
        StripeSource.prototype.createPaymentMethod = function (extraData) {
            var _this = this;
            delete this.invalid;
            this.invalidChange.emit(this.invalid);
            return this.stripe.createPaymentMethod('card', this.elements, extraData)
                .then(function (result) { return _this.processPaymentMethodResult(result); });
        };
        StripeSource.prototype.processPaymentMethodResult = function (result) {
            if (result.error) {
                var rError = result.error;
                if (rError.type === "validation_error") {
                    this.invalidChange.emit(this.invalid = rError);
                }
                else {
                    this.catcher.emit(rError);
                    throw rError;
                }
            }
            var paymentMethod = result.paymentMethod;
            if (paymentMethod) {
                this.paymentMethodChange.emit(this.paymentMethod = paymentMethod);
                return paymentMethod;
            }
        };
        return StripeSource;
    }(StripeComponent));
    StripeSource.decorators = [
        { type: i0.Component, args: [{
                    selector: "stripe-source",
                    template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
                    exportAs: "StripeSource"
                },] }
    ];
    StripeSource.ctorParameters = function () { return [
        { type: StripeScriptTag }
    ]; };
    StripeSource.propDecorators = {
        source: [{ type: i0.Input }],
        sourceChange: [{ type: i0.Output }],
        paymentMethod: [{ type: i0.Input }],
        paymentMethodChange: [{ type: i0.Output }]
    };

    var StripeCard = /** @class */ (function (_super) {
        __extends(StripeCard, _super);
        function StripeCard(ElementRef, StripeScriptTag) {
            var _this = _super.call(this, StripeScriptTag) || this;
            _this.ElementRef = ElementRef;
            _this.StripeScriptTag = StripeScriptTag;
            _this.tokenChange = new i0.EventEmitter();
            _this.cardMounted = new i0.EventEmitter();
            _this.complete = false;
            _this.completeChange = new i0.EventEmitter();
            _this.changed = new i0.EventEmitter();
            _this.drawn = false;
            return _this;
        }
        StripeCard.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.init.call(this).then(function () { return _this.redraw(); });
        };
        StripeCard.prototype.ngOnChanges = function (changes) {
            if (this.drawn && (changes.options || changes.createOptions)) {
                this.redraw();
            }
        };
        StripeCard.prototype.redraw = function () {
            var _this = this;
            if (this.drawn) {
                this.elements.unmount();
                this.elements.destroy();
            }
            this.elements = this.stripe.elements(this.createOptions).create('card', this.options);
            this.elements.mount(this.ElementRef.nativeElement);
            this.cardMounted.emit(this.elements);
            this.elements.on('change', function (result) {
                _this.changed.emit(result);
                if (result.complete || (_this.complete && !result.complete)) {
                    _this.completeChange.emit(_this.complete = result.complete);
                }
            });
            this.elements.addEventListener('change', function (result) {
                if (result.error) {
                    _this.invalidChange.emit(_this.invalid = result.error);
                }
            });
            this.drawn = true;
        };
        StripeCard.prototype.createToken = function (extraData) {
            var _this = this;
            delete this.invalid;
            this.invalidChange.emit(this.invalid);
            return this.stripe.createToken(this.elements, extraData)
                .then(function (result) {
                if (result.error) {
                    if (result.error.type == "validation_error") {
                        _this.invalidChange.emit(_this.invalid = result.error);
                    }
                    else {
                        _this.catcher.emit(result.error);
                        throw result.error;
                    }
                }
                else {
                    _this.tokenChange.emit(_this.token = result.token);
                    return result.token;
                }
            });
        };
        return StripeCard;
    }(StripeSource));
    StripeCard.decorators = [
        { type: i0.Component, args: [{
                    selector: "stripe-card",
                    template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
                    exportAs: "StripeCard"
                },] }
    ];
    StripeCard.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: StripeScriptTag }
    ]; };
    StripeCard.propDecorators = {
        createOptions: [{ type: i0.Input }],
        options: [{ type: i0.Input }],
        token: [{ type: i0.Input }],
        tokenChange: [{ type: i0.Output }],
        cardMounted: [{ type: i0.Output }],
        complete: [{ type: i0.Input }],
        completeChange: [{ type: i0.Output }],
        changed: [{ type: i0.Output }]
    };

    var StripeBank = /** @class */ (function (_super) {
        __extends(StripeBank, _super);
        function StripeBank(StripeScriptTag) {
            var _this = _super.call(this, StripeScriptTag) || this;
            _this.StripeScriptTag = StripeScriptTag;
            _this.tokenChange = new i0.EventEmitter();
            return _this;
        }
        StripeBank.prototype.createToken = function (data) {
            var _this = this;
            delete this.invalid;
            this.invalidChange.emit(this.invalid);
            return this.stripe.createToken('bank_account', data)
                .then(function (result) {
                if (result.error) {
                    if (result.error.type == "validation_error") {
                        _this.invalidChange.emit(_this.invalid = result.error);
                    }
                    else {
                        _this.catcher.emit(result.error);
                        throw result.error;
                    }
                }
                else {
                    _this.tokenChange.emit(_this.token = result.token);
                    return result.token;
                }
            });
        };
        return StripeBank;
    }(StripeComponent));
    StripeBank.decorators = [
        { type: i0.Component, args: [{
                    selector: "stripe-bank",
                    template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
                    exportAs: "StripeBank"
                },] }
    ];
    StripeBank.ctorParameters = function () { return [
        { type: StripeScriptTag }
    ]; };
    StripeBank.propDecorators = {
        options: [{ type: i0.Input }],
        token: [{ type: i0.Input }],
        tokenChange: [{ type: i0.Output }]
    };

    var declarations = [
        StripeComponent,
        StripeSource,
        StripeCard,
        StripeBank
    ];
    var StripeModule = /** @class */ (function () {
        function StripeModule() {
        }
        StripeModule.forRoot = function (publishableKey, options) {
            return {
                ngModule: StripeModule,
                providers: [
                    StripeScriptTag,
                    {
                        provide: STRIPE_PUBLISHABLE_KEY,
                        useValue: publishableKey
                    },
                    {
                        provide: STRIPE_OPTIONS,
                        useValue: options
                    }
                ],
            };
        };
        return StripeModule;
    }());
    StripeModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        i1.CommonModule
                    ],
                    declarations: declarations,
                    // providers: [ StripeScriptTag ],
                    exports: __spreadArray([], __read(declarations))
                },] }
    ];
    /**
     * @deprecated Please import `StripeModule` directly
     */
    var Module = StripeModule;

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Module = Module;
    exports.STRIPE_OPTIONS = STRIPE_OPTIONS;
    exports.STRIPE_PUBLISHABLE_KEY = STRIPE_PUBLISHABLE_KEY;
    exports.StripeBank = StripeBank;
    exports.StripeCard = StripeCard;
    exports.StripeModule = StripeModule;
    exports.StripeScriptTag = StripeScriptTag;
    exports.StripeSource = StripeSource;
    exports["ɵa"] = StripeComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=stripe-angular.umd.js.map
