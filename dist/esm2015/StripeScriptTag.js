import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from "@angular/core";
import { STRIPE_PUBLISHABLE_KEY, STRIPE_OPTIONS
//, StripeCard, StripeToken
 } from "./StripeTypes";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./StripeTypes";
export class StripeScriptTag {
    constructor(document, key, options) {
        this.document = document;
        this.src = "https://js.stripe.com/v3/";
        this.window = this.document.defaultView;
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
        if (this.window && this.window["Stripe"]) {
            return Promise.resolve(this.Stripe = this.window["Stripe"]);
        }
        return new Promise((res, rej) => {
            const head = this.getTargetTagDropElement();
            const script = this.document.createElement("script");
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
        let elm = this.document.getElementsByTagName("head");
        if (elm.length)
            return elm[0];
        return this.document.getElementsByTagName("body")[0];
    }
}
StripeScriptTag.ɵprov = i0.ɵɵdefineInjectable({ factory: function StripeScriptTag_Factory() { return new StripeScriptTag(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i2.STRIPE_PUBLISHABLE_KEY), i0.ɵɵinject(i2.STRIPE_OPTIONS)); }, token: StripeScriptTag, providedIn: "root" });
StripeScriptTag.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
StripeScriptTag.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Inject, args: [STRIPE_PUBLISHABLE_KEY,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [STRIPE_OPTIONS,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlU2NyaXB0VGFnLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8iLCJzb3VyY2VzIjpbIlN0cmlwZVNjcmlwdFRhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFDMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFFbEQsT0FBTyxFQUNHLHNCQUFzQixFQUFFLGNBQWM7QUFDOUMsMkJBQTJCO0VBQzVCLE1BQU0sZUFBZSxDQUFBOzs7O0FBRVksTUFBTSxPQUFPLGVBQWU7SUFPNUQsWUFDNEIsUUFBYSxFQUNQLEdBQVksRUFDcEIsT0FBOEI7UUFGNUIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQVB6QyxRQUFHLEdBQVUsMkJBQTJCLENBQUE7UUFXdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUNqQyxJQUFJLEdBQUc7WUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFFRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFO2FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUEsRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrRUFBK0UsQ0FBQyxDQUFBO2dCQUN0RyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsaUJBQWlCLENBQUE7Z0JBQy9CLE1BQU0sR0FBRyxDQUFBO2dCQUNULDhCQUE4QjthQUMvQjtZQUVELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQTtRQUM1QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxpQkFBaUIsQ0FDZixHQUFVLEVBQ1YsT0FBNkI7UUFFN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxHQUFFLEVBQUUsQ0FDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FDaEQsQ0FBQTtJQUNILENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQVEsQ0FBRSxDQUFBO1NBQ3JFO1FBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQTtZQUMzQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNwRCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDcEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtZQUU5QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFDLEdBQUUsRUFBRTtnQkFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7Z0JBQy9CLEdBQUcsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUE7WUFDcEIsQ0FBQyxDQUFDLENBQUE7WUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzFCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQVEsQ0FBQztJQUNqQyxDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFcEQsSUFBRyxHQUFHLENBQUMsTUFBTTtZQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRTNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN0RCxDQUFDOzs7O1lBMUVGLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs0Q0FRM0IsTUFBTSxTQUFDLFFBQVE7eUNBQ2YsTUFBTSxTQUFDLHNCQUFzQjs0Q0FDN0IsTUFBTSxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcblxuaW1wb3J0IHtcbiAgU3RyaXBlLCBTVFJJUEVfUFVCTElTSEFCTEVfS0VZLCBTVFJJUEVfT1BUSU9OU1xuICAvLywgU3RyaXBlQ2FyZCwgU3RyaXBlVG9rZW5cbn0gZnJvbSBcIi4vU3RyaXBlVHlwZXNcIlxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSkgZXhwb3J0IGNsYXNzIFN0cmlwZVNjcmlwdFRhZyB7XG4gIHNyYzpzdHJpbmcgPSBcImh0dHBzOi8vanMuc3RyaXBlLmNvbS92My9cIlxuICBTdHJpcGUhOlN0cmlwZS8vc2V0IGF0IHJ1bnRpbWVcbiAgU3RyaXBlSW5zdGFuY2UhOnN0cmlwZS5TdHJpcGVcbiAgbG9hZDpQcm9taXNlPGFueT5cbiAgd2luZG93OiBhbnlcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgQEluamVjdChTVFJJUEVfUFVCTElTSEFCTEVfS0VZKSBrZXk/OiBzdHJpbmcsXG4gICAgQEluamVjdChTVFJJUEVfT1BUSU9OUykgb3B0aW9ucz86IHN0cmlwZS5TdHJpcGVPcHRpb25zLFxuICApe1xuICAgIHRoaXMud2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldztcbiAgICB0aGlzLmxvYWQgPSB0aGlzLmluamVjdEludG9IZWFkKClcbiAgICBpZiAoa2V5KSB0aGlzLnNldFB1Ymxpc2hhYmxlS2V5KGtleSwgb3B0aW9ucylcbiAgfVxuXG4gIHByb21pc2VTdHJpcGUoKTpQcm9taXNlPFN0cmlwZT57XG4gICAgcmV0dXJuIHRoaXMubG9hZFxuICB9XG5cbiAgcHJvbWlzZUluc3RhbmNlKCk6UHJvbWlzZTxzdHJpcGUuU3RyaXBlPntcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlU3RyaXBlKClcbiAgICAudGhlbihzdHJpcGU9PntcbiAgICAgIGlmKCAhdGhpcy5TdHJpcGVJbnN0YW5jZSApe1xuICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXCJTdHJpcGUgUHVibGlzaGFibGVLZXkgTk9UIFNFVC4gVXNlIG1ldGhvZCBTdHJpcGVTY3JpcHRUYWcuc2V0UHVibGlzaGFibGVLZXkoKVwiKVxuICAgICAgICBlcnJbXCJjb2RlXCJdID0gXCJTVFJJUEVLRVlOT1RTRVRcIlxuICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgLy9yZXR1cm4gUHJvbWlzZS5yZWplY3QoIGVyciApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLlN0cmlwZUluc3RhbmNlXG4gICAgfSlcbiAgfVxuXG4gIHNldFB1Ymxpc2hhYmxlS2V5KFxuICAgIGtleTpzdHJpbmcsXG4gICAgb3B0aW9ucz86c3RyaXBlLlN0cmlwZU9wdGlvbnNcbiAgKTpQcm9taXNlPHN0cmlwZS5TdHJpcGU+e1xuICAgIHJldHVybiB0aGlzLmxvYWQudGhlbiggKCk9PlxuICAgICAgdGhpcy5TdHJpcGVJbnN0YW5jZSA9IHRoaXMuU3RyaXBlKGtleSwgb3B0aW9ucylcbiAgICApXG4gIH1cblxuICBpbmplY3RJbnRvSGVhZCgpOlByb21pc2U8U3RyaXBlPntcbiAgICBpZiggdGhpcy53aW5kb3cgJiYgdGhpcy53aW5kb3dbXCJTdHJpcGVcIl0gKXtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHRoaXMuU3RyaXBlID0gdGhpcy53aW5kb3dbXCJTdHJpcGVcIl0gYXMgYW55IClcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICBjb25zdCBoZWFkID0gdGhpcy5nZXRUYXJnZXRUYWdEcm9wRWxlbWVudCgpXG4gICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdGhpcy5zcmMpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKVxuXG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwoKT0+e1xuICAgICAgICB0aGlzLlN0cmlwZSA9IHRoaXMuZ3JhYlN0cmlwZSgpXG4gICAgICAgIHJlcyggdGhpcy5TdHJpcGUgKVxuICAgICAgfSlcblxuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpXG4gICAgfSlcbiAgfVxuXG4gIGdyYWJTdHJpcGUoKTogU3RyaXBlIHtcbiAgICByZXR1cm4gd2luZG93W1wiU3RyaXBlXCJdIGFzIGFueTtcbiAgfVxuXG4gIGdldFRhcmdldFRhZ0Ryb3BFbGVtZW50KCl7XG4gICAgbGV0IGVsbSA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpXG5cbiAgICBpZihlbG0ubGVuZ3RoKXJldHVybiBlbG1bMF1cblxuICAgIHJldHVybiB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXVxuICB9XG59XG4iXX0=