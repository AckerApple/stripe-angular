import { Injectable, Inject } from "@angular/core";
import { STRIPE_PUBLISHABLE_KEY, STRIPE_OPTIONS
//, StripeCard, StripeToken
 } from "./StripeTypes";
import * as i0 from "@angular/core";
import * as i1 from "./StripeTypes";
export class StripeScriptTag {
    constructor(key, options) {
        this.src = "https://js.stripe.com/v3/";
        this.load = this.injectIntoHead();
        if (key)
            this.setPublishableKey(key, options);
    }
    promiseStripe() {
        return this.load;
    }
    promiseInstance() {
        return this.promiseStripe()
            .then(stripe => {
            if (!this.StripeInstance) {
                const err = new Error("Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()");
                err["code"] = "STRIPEKEYNOTSET";
                throw err;
                //return Promise.reject( err )
            }
            return this.StripeInstance;
        });
    }
    setPublishableKey(key, options) {
        return this.load.then(() => this.StripeInstance = this.Stripe(key, options));
    }
    injectIntoHead() {
        if (window["Stripe"]) {
            return Promise.resolve(this.Stripe = window["Stripe"]);
        }
        return new Promise((res, rej) => {
            const head = this.getTargetTagDropElement();
            const script = document.createElement("script");
            script.setAttribute("src", this.src);
            script.setAttribute("type", "text/javascript");
            script.addEventListener("load", () => {
                this.Stripe = this.grabStripe();
                res(this.Stripe);
            });
            head.appendChild(script);
        });
    }
    grabStripe() {
        return window["Stripe"];
    }
    getTargetTagDropElement() {
        let elm = document.getElementsByTagName("head");
        if (elm.length)
            return elm[0];
        return document.getElementsByTagName("body")[0];
    }
}
StripeScriptTag.ɵprov = i0.ɵɵdefineInjectable({ factory: function StripeScriptTag_Factory() { return new StripeScriptTag(i0.ɵɵinject(i1.STRIPE_PUBLISHABLE_KEY), i0.ɵɵinject(i1.STRIPE_OPTIONS)); }, token: StripeScriptTag, providedIn: "root" });
StripeScriptTag.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
StripeScriptTag.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [STRIPE_PUBLISHABLE_KEY,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [STRIPE_OPTIONS,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlU2NyaXB0VGFnLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hY2tlcmFwcGxlL1Byb2plY3RzL3dlYi9hbmd1bGFyL3N0cmlwZS1hbmd1bGFyL21hc3Rlci9zcmMvIiwic291cmNlcyI6WyJTdHJpcGVTY3JpcHRUYWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFFbEQsT0FBTyxFQUMwQyxzQkFBc0IsRUFBRSxjQUFjO0FBQ3JGLDJCQUEyQjtFQUM1QixNQUFNLGVBQWUsQ0FBQTs7O0FBRVksTUFBTSxPQUFPLGVBQWU7SUFNNUQsWUFDa0MsR0FBWSxFQUNwQixPQUErQjtRQVB6RCxRQUFHLEdBQVUsMkJBQTJCLENBQUE7UUFTdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDakMsSUFBSSxHQUFHO1lBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtJQUNsQixDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRTthQUMxQixJQUFJLENBQUMsTUFBTSxDQUFBLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDeEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQTtnQkFDdEcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLGlCQUFpQixDQUFBO2dCQUMvQixNQUFNLEdBQUcsQ0FBQTtnQkFDVCw4QkFBOEI7YUFDL0I7WUFFRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUE7UUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsaUJBQWlCLENBQ2YsR0FBVSxFQUNWLE9BQThCO1FBRTlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsR0FBRSxFQUFFLENBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQzlDLENBQUE7SUFDSCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBRSxDQUFBO1NBQ3ZEO1FBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQTtZQUMzQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQy9DLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNwQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1lBRTlDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUMsR0FBRSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtnQkFDL0IsR0FBRyxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQTtZQUNwQixDQUFDLENBQUMsQ0FBQTtZQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFFRCx1QkFBdUI7UUFDckIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRS9DLElBQUcsR0FBRyxDQUFDLE1BQU07WUFBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUUzQixPQUFPLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqRCxDQUFDOzs7O1lBdkVGLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozt5Q0FPM0IsTUFBTSxTQUFDLHNCQUFzQjs0Q0FDN0IsTUFBTSxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXG5cbmltcG9ydCB7XG4gIFN0cmlwZSwgU3RyaXBlSW5zdGFuY2UsIFN0cmlwZUluc3RhbmNlT3B0aW9ucywgU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSwgU1RSSVBFX09QVElPTlNcbiAgLy8sIFN0cmlwZUNhcmQsIFN0cmlwZVRva2VuXG59IGZyb20gXCIuL1N0cmlwZVR5cGVzXCJcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pIGV4cG9ydCBjbGFzcyBTdHJpcGVTY3JpcHRUYWd7XG4gIHNyYzpzdHJpbmcgPSBcImh0dHBzOi8vanMuc3RyaXBlLmNvbS92My9cIlxuICBTdHJpcGUhOlN0cmlwZS8vc2V0IGF0IHJ1bnRpbWVcbiAgU3RyaXBlSW5zdGFuY2UhOlN0cmlwZUluc3RhbmNlXG4gIGxvYWQ6UHJvbWlzZTxhbnk+XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChTVFJJUEVfUFVCTElTSEFCTEVfS0VZKSBrZXk/OiBzdHJpbmcsXG4gICAgQEluamVjdChTVFJJUEVfT1BUSU9OUykgb3B0aW9ucz86IFN0cmlwZUluc3RhbmNlT3B0aW9uc1xuICApe1xuICAgIHRoaXMubG9hZCA9IHRoaXMuaW5qZWN0SW50b0hlYWQoKVxuICAgIGlmIChrZXkpIHRoaXMuc2V0UHVibGlzaGFibGVLZXkoa2V5LCBvcHRpb25zKVxuICB9XG5cbiAgcHJvbWlzZVN0cmlwZSgpOlByb21pc2U8U3RyaXBlPntcbiAgICByZXR1cm4gdGhpcy5sb2FkXG4gIH1cblxuICBwcm9taXNlSW5zdGFuY2UoKTpQcm9taXNlPFN0cmlwZUluc3RhbmNlPntcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlU3RyaXBlKClcbiAgICAudGhlbihzdHJpcGU9PntcbiAgICAgIGlmKCAhdGhpcy5TdHJpcGVJbnN0YW5jZSApe1xuICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXCJTdHJpcGUgUHVibGlzaGFibGVLZXkgTk9UIFNFVC4gVXNlIG1ldGhvZCBTdHJpcGVTY3JpcHRUYWcuc2V0UHVibGlzaGFibGVLZXkoKVwiKVxuICAgICAgICBlcnJbXCJjb2RlXCJdID0gXCJTVFJJUEVLRVlOT1RTRVRcIlxuICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgLy9yZXR1cm4gUHJvbWlzZS5yZWplY3QoIGVyciApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLlN0cmlwZUluc3RhbmNlXG4gICAgfSlcbiAgfVxuXG4gIHNldFB1Ymxpc2hhYmxlS2V5KFxuICAgIGtleTpzdHJpbmcsXG4gICAgb3B0aW9ucz86U3RyaXBlSW5zdGFuY2VPcHRpb25zXG4gICk6UHJvbWlzZTxTdHJpcGVJbnN0YW5jZT57XG4gICAgcmV0dXJuIHRoaXMubG9hZC50aGVuKCAoKT0+XG4gICAgICB0aGlzLlN0cmlwZUluc3RhbmNlPXRoaXMuU3RyaXBlKGtleSwgb3B0aW9ucylcbiAgICApXG4gIH1cblxuICBpbmplY3RJbnRvSGVhZCgpOlByb21pc2U8U3RyaXBlPntcbiAgICBpZiggd2luZG93W1wiU3RyaXBlXCJdICl7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0aGlzLlN0cmlwZT13aW5kb3dbXCJTdHJpcGVcIl0gKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgIGNvbnN0IGhlYWQgPSB0aGlzLmdldFRhcmdldFRhZ0Ryb3BFbGVtZW50KClcbiAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdGhpcy5zcmMpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKVxuXG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwoKT0+e1xuICAgICAgICB0aGlzLlN0cmlwZSA9IHRoaXMuZ3JhYlN0cmlwZSgpXG4gICAgICAgIHJlcyggdGhpcy5TdHJpcGUgKVxuICAgICAgfSlcblxuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpXG4gICAgfSlcbiAgfVxuXG4gIGdyYWJTdHJpcGUoKXtcbiAgICByZXR1cm4gd2luZG93W1wiU3RyaXBlXCJdXG4gIH1cblxuICBnZXRUYXJnZXRUYWdEcm9wRWxlbWVudCgpe1xuICAgIGxldCBlbG0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilcblxuICAgIGlmKGVsbS5sZW5ndGgpcmV0dXJuIGVsbVswXVxuXG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXVxuICB9XG59XG4iXX0=