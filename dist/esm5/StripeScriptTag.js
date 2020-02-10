import { __decorate, __param } from "tslib";
import { Injectable, Inject } from "@angular/core";
import { STRIPE_PUBLISHABLE_KEY, STRIPE_OPTIONS
//, StripeCard, StripeToken
 } from "./StripeTypes";
import * as i0 from "@angular/core";
import * as i1 from "./StripeTypes";
var StripeScriptTag = /** @class */ (function () {
    function StripeScriptTag(key, options) {
        this.src = "https://js.stripe.com/v3/";
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
        return this.load.then(function () {
            return _this.StripeInstance = _this.Stripe(key, options);
        });
    };
    StripeScriptTag.prototype.injectIntoHead = function () {
        var _this = this;
        if (window["Stripe"]) {
            return Promise.resolve(this.Stripe = window["Stripe"]);
        }
        return new Promise(function (res, rej) {
            var head = _this.getTargetTagDropElement();
            var script = document.createElement("script");
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
        var elm = document.getElementsByTagName("head");
        if (elm.length)
            return elm[0];
        return document.getElementsByTagName("body")[0];
    };
    StripeScriptTag.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [STRIPE_PUBLISHABLE_KEY,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [STRIPE_OPTIONS,] }] }
    ]; };
    StripeScriptTag.ɵprov = i0.ɵɵdefineInjectable({ factory: function StripeScriptTag_Factory() { return new StripeScriptTag(i0.ɵɵinject(i1.STRIPE_PUBLISHABLE_KEY), i0.ɵɵinject(i1.STRIPE_OPTIONS)); }, token: StripeScriptTag, providedIn: "root" });
    StripeScriptTag = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Inject(STRIPE_PUBLISHABLE_KEY)),
        __param(1, Inject(STRIPE_OPTIONS))
    ], StripeScriptTag);
    return StripeScriptTag;
}());
export { StripeScriptTag };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlU2NyaXB0VGFnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc3RyaXBlLWFuZ3VsYXIvIiwic291cmNlcyI6WyJTdHJpcGVTY3JpcHRUYWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRWxELE9BQU8sRUFDMEMsc0JBQXNCLEVBQUUsY0FBYztBQUNyRiwyQkFBMkI7RUFDNUIsTUFBTSxlQUFlLENBQUE7OztBQUVZO0lBTWhDLHlCQUNrQyxHQUFZLEVBQ3BCLE9BQStCO1FBUHpELFFBQUcsR0FBVSwyQkFBMkIsQ0FBQTtRQVN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUNqQyxJQUFJLEdBQUc7WUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFFRCx1Q0FBYSxHQUFiO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFFRCx5Q0FBZSxHQUFmO1FBQUEsaUJBWUM7UUFYQyxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUU7YUFDMUIsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLElBQUksQ0FBQyxLQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN4QixJQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrRUFBK0UsQ0FBQyxDQUFBO2dCQUN0RyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsaUJBQWlCLENBQUE7Z0JBQy9CLE1BQU0sR0FBRyxDQUFBO2dCQUNULDhCQUE4QjthQUMvQjtZQUVELE9BQU8sS0FBSSxDQUFDLGNBQWMsQ0FBQTtRQUM1QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCwyQ0FBaUIsR0FBakIsVUFDRSxHQUFVLEVBQ1YsT0FBOEI7UUFGaEMsaUJBT0M7UUFIQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO1lBQ3JCLE9BQUEsS0FBSSxDQUFDLGNBQWMsR0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7UUFBN0MsQ0FBNkMsQ0FDOUMsQ0FBQTtJQUNILENBQUM7SUFFRCx3Q0FBYyxHQUFkO1FBQUEsaUJBa0JDO1FBakJDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBRSxDQUFBO1NBQ3ZEO1FBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBQyxHQUFHO1lBQ3pCLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFBO1lBQzNDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDL0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUE7WUFFOUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBQztnQkFDN0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7Z0JBQy9CLEdBQUcsQ0FBRSxLQUFJLENBQUMsTUFBTSxDQUFFLENBQUE7WUFDcEIsQ0FBQyxDQUFDLENBQUE7WUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzFCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDRSxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6QixDQUFDO0lBRUQsaURBQXVCLEdBQXZCO1FBQ0UsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRS9DLElBQUcsR0FBRyxDQUFDLE1BQU07WUFBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUUzQixPQUFPLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqRCxDQUFDOzs2Q0FoRUUsTUFBTSxTQUFDLHNCQUFzQjtnREFDN0IsTUFBTSxTQUFDLGNBQWM7OztJQVJxQixlQUFlO1FBQTdELFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQztRQU81QixXQUFBLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQzlCLFdBQUEsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBO09BUm9CLGVBQWUsQ0F3RTdEOzBCQS9FRDtDQStFQyxBQXhFaUMsSUF3RWpDO1NBeEU4QyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuXG5pbXBvcnQge1xuICBTdHJpcGUsIFN0cmlwZUluc3RhbmNlLCBTdHJpcGVJbnN0YW5jZU9wdGlvbnMsIFNUUklQRV9QVUJMSVNIQUJMRV9LRVksIFNUUklQRV9PUFRJT05TXG4gIC8vLCBTdHJpcGVDYXJkLCBTdHJpcGVUb2tlblxufSBmcm9tIFwiLi9TdHJpcGVUeXBlc1wiXG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KSBleHBvcnQgY2xhc3MgU3RyaXBlU2NyaXB0VGFne1xuICBzcmM6c3RyaW5nID0gXCJodHRwczovL2pzLnN0cmlwZS5jb20vdjMvXCJcbiAgU3RyaXBlITpTdHJpcGUvL3NldCBhdCBydW50aW1lXG4gIFN0cmlwZUluc3RhbmNlITpTdHJpcGVJbnN0YW5jZVxuICBsb2FkOlByb21pc2U8YW55PlxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSkga2V5Pzogc3RyaW5nLFxuICAgIEBJbmplY3QoU1RSSVBFX09QVElPTlMpIG9wdGlvbnM/OiBTdHJpcGVJbnN0YW5jZU9wdGlvbnNcbiAgKXtcbiAgICB0aGlzLmxvYWQgPSB0aGlzLmluamVjdEludG9IZWFkKClcbiAgICBpZiAoa2V5KSB0aGlzLnNldFB1Ymxpc2hhYmxlS2V5KGtleSwgb3B0aW9ucylcbiAgfVxuXG4gIHByb21pc2VTdHJpcGUoKTpQcm9taXNlPFN0cmlwZT57XG4gICAgcmV0dXJuIHRoaXMubG9hZFxuICB9XG5cbiAgcHJvbWlzZUluc3RhbmNlKCk6UHJvbWlzZTxTdHJpcGVJbnN0YW5jZT57XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVN0cmlwZSgpXG4gICAgLnRoZW4oc3RyaXBlPT57XG4gICAgICBpZiggIXRoaXMuU3RyaXBlSW5zdGFuY2UgKXtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKFwiU3RyaXBlIFB1Ymxpc2hhYmxlS2V5IE5PVCBTRVQuIFVzZSBtZXRob2QgU3RyaXBlU2NyaXB0VGFnLnNldFB1Ymxpc2hhYmxlS2V5KClcIilcbiAgICAgICAgZXJyW1wiY29kZVwiXSA9IFwiU1RSSVBFS0VZTk9UU0VUXCJcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICAgIC8vcmV0dXJuIFByb21pc2UucmVqZWN0KCBlcnIgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5TdHJpcGVJbnN0YW5jZVxuICAgIH0pXG4gIH1cblxuICBzZXRQdWJsaXNoYWJsZUtleShcbiAgICBrZXk6c3RyaW5nLFxuICAgIG9wdGlvbnM/OlN0cmlwZUluc3RhbmNlT3B0aW9uc1xuICApOlByb21pc2U8U3RyaXBlSW5zdGFuY2U+e1xuICAgIHJldHVybiB0aGlzLmxvYWQudGhlbiggKCk9PlxuICAgICAgdGhpcy5TdHJpcGVJbnN0YW5jZT10aGlzLlN0cmlwZShrZXksIG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgaW5qZWN0SW50b0hlYWQoKTpQcm9taXNlPFN0cmlwZT57XG4gICAgaWYoIHdpbmRvd1tcIlN0cmlwZVwiXSApe1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdGhpcy5TdHJpcGU9d2luZG93W1wiU3RyaXBlXCJdIClcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICBjb25zdCBoZWFkID0gdGhpcy5nZXRUYXJnZXRUYWdEcm9wRWxlbWVudCgpXG4gICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHRoaXMuc3JjKVxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2phdmFzY3JpcHRcIilcblxuICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsKCk9PntcbiAgICAgICAgdGhpcy5TdHJpcGUgPSB0aGlzLmdyYWJTdHJpcGUoKVxuICAgICAgICByZXMoIHRoaXMuU3RyaXBlIClcbiAgICAgIH0pXG5cbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuICAgIH0pXG4gIH1cblxuICBncmFiU3RyaXBlKCl7XG4gICAgcmV0dXJuIHdpbmRvd1tcIlN0cmlwZVwiXVxuICB9XG5cbiAgZ2V0VGFyZ2V0VGFnRHJvcEVsZW1lbnQoKXtcbiAgICBsZXQgZWxtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpXG5cbiAgICBpZihlbG0ubGVuZ3RoKXJldHVybiBlbG1bMF1cblxuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF1cbiAgfVxufVxuIl19