import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from "@angular/core";
import { STRIPE_PUBLISHABLE_KEY, STRIPE_OPTIONS
//, StripeCard, StripeToken
 } from "./StripeTypes";
import * as i0 from "@angular/core";
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
StripeScriptTag.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeScriptTag, deps: [{ token: DOCUMENT }, { token: STRIPE_PUBLISHABLE_KEY }, { token: STRIPE_OPTIONS }], target: i0.ɵɵFactoryTarget.Injectable });
StripeScriptTag.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeScriptTag, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeScriptTag, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [STRIPE_PUBLISHABLE_KEY]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [STRIPE_OPTIONS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlU2NyaXB0VGFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1N0cmlwZVNjcmlwdFRhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFDMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFFbEQsT0FBTyxFQUNHLHNCQUFzQixFQUFFLGNBQWM7QUFDOUMsMkJBQTJCO0VBQzVCLE1BQU0sZUFBZSxDQUFBOztBQUVZLE1BQU0sT0FBTyxlQUFlO0lBTzVELFlBQzRCLFFBQWEsRUFDUCxHQUFZLEVBQ3BCLE9BQThCO1FBRjVCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFQekMsUUFBRyxHQUFVLDJCQUEyQixDQUFBO1FBV3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDakMsSUFBSSxHQUFHO1lBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtJQUNsQixDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRTthQUMxQixJQUFJLENBQUMsTUFBTSxDQUFBLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDeEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQTtnQkFDdEcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLGlCQUFpQixDQUFBO2dCQUMvQixNQUFNLEdBQUcsQ0FBQTtnQkFDVCw4QkFBOEI7YUFDL0I7WUFFRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUE7UUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsaUJBQWlCLENBQ2YsR0FBVSxFQUNWLE9BQTZCO1FBRTdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsR0FBRSxFQUFFLENBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQ2hELENBQUE7SUFDSCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFRLENBQUUsQ0FBQTtTQUNyRTtRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUE7WUFDM0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDcEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUE7WUFFOUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBQyxHQUFFLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO2dCQUMvQixHQUFHLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFBO1lBQ3BCLENBQUMsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFRLENBQUM7SUFDakMsQ0FBQztJQUVELHVCQUF1QjtRQUNyQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRXBELElBQUcsR0FBRyxDQUFDLE1BQU07WUFBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUUzQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEQsQ0FBQzs7NkdBMUU0QyxlQUFlLGtCQVFsRCxRQUFRLGFBQ1Isc0JBQXNCLGFBQ3RCLGNBQWM7aUhBVnFCLGVBQWUsY0FBckMsTUFBTTs0RkFBZ0IsZUFBZTtrQkFBN0QsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7OzBCQVEzQixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsc0JBQXNCOzswQkFDN0IsTUFBTTsyQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXG5cbmltcG9ydCB7XG4gIFN0cmlwZSwgU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSwgU1RSSVBFX09QVElPTlNcbiAgLy8sIFN0cmlwZUNhcmQsIFN0cmlwZVRva2VuXG59IGZyb20gXCIuL1N0cmlwZVR5cGVzXCJcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pIGV4cG9ydCBjbGFzcyBTdHJpcGVTY3JpcHRUYWcge1xuICBzcmM6c3RyaW5nID0gXCJodHRwczovL2pzLnN0cmlwZS5jb20vdjMvXCJcbiAgU3RyaXBlITpTdHJpcGUvL3NldCBhdCBydW50aW1lXG4gIFN0cmlwZUluc3RhbmNlITpzdHJpcGUuU3RyaXBlXG4gIGxvYWQ6UHJvbWlzZTxhbnk+XG4gIHdpbmRvdzogYW55XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIEBJbmplY3QoU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSkga2V5Pzogc3RyaW5nLFxuICAgIEBJbmplY3QoU1RSSVBFX09QVElPTlMpIG9wdGlvbnM/OiBzdHJpcGUuU3RyaXBlT3B0aW9ucyxcbiAgKXtcbiAgICB0aGlzLndpbmRvdyA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgdGhpcy5sb2FkID0gdGhpcy5pbmplY3RJbnRvSGVhZCgpXG4gICAgaWYgKGtleSkgdGhpcy5zZXRQdWJsaXNoYWJsZUtleShrZXksIG9wdGlvbnMpXG4gIH1cblxuICBwcm9taXNlU3RyaXBlKCk6UHJvbWlzZTxTdHJpcGU+e1xuICAgIHJldHVybiB0aGlzLmxvYWRcbiAgfVxuXG4gIHByb21pc2VJbnN0YW5jZSgpOlByb21pc2U8c3RyaXBlLlN0cmlwZT57XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVN0cmlwZSgpXG4gICAgLnRoZW4oc3RyaXBlPT57XG4gICAgICBpZiggIXRoaXMuU3RyaXBlSW5zdGFuY2UgKXtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKFwiU3RyaXBlIFB1Ymxpc2hhYmxlS2V5IE5PVCBTRVQuIFVzZSBtZXRob2QgU3RyaXBlU2NyaXB0VGFnLnNldFB1Ymxpc2hhYmxlS2V5KClcIilcbiAgICAgICAgZXJyW1wiY29kZVwiXSA9IFwiU1RSSVBFS0VZTk9UU0VUXCJcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICAgIC8vcmV0dXJuIFByb21pc2UucmVqZWN0KCBlcnIgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5TdHJpcGVJbnN0YW5jZVxuICAgIH0pXG4gIH1cblxuICBzZXRQdWJsaXNoYWJsZUtleShcbiAgICBrZXk6c3RyaW5nLFxuICAgIG9wdGlvbnM/OnN0cmlwZS5TdHJpcGVPcHRpb25zXG4gICk6UHJvbWlzZTxzdHJpcGUuU3RyaXBlPntcbiAgICByZXR1cm4gdGhpcy5sb2FkLnRoZW4oICgpPT5cbiAgICAgIHRoaXMuU3RyaXBlSW5zdGFuY2UgPSB0aGlzLlN0cmlwZShrZXksIG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgaW5qZWN0SW50b0hlYWQoKTpQcm9taXNlPFN0cmlwZT57XG4gICAgaWYoIHRoaXMud2luZG93ICYmIHRoaXMud2luZG93W1wiU3RyaXBlXCJdICl7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0aGlzLlN0cmlwZSA9IHRoaXMud2luZG93W1wiU3RyaXBlXCJdIGFzIGFueSApXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuICAgICAgY29uc3QgaGVhZCA9IHRoaXMuZ2V0VGFyZ2V0VGFnRHJvcEVsZW1lbnQoKVxuICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHRoaXMuc3JjKVxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2phdmFzY3JpcHRcIilcblxuICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsKCk9PntcbiAgICAgICAgdGhpcy5TdHJpcGUgPSB0aGlzLmdyYWJTdHJpcGUoKVxuICAgICAgICByZXMoIHRoaXMuU3RyaXBlIClcbiAgICAgIH0pXG5cbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuICAgIH0pXG4gIH1cblxuICBncmFiU3RyaXBlKCk6IFN0cmlwZSB7XG4gICAgcmV0dXJuIHdpbmRvd1tcIlN0cmlwZVwiXSBhcyBhbnk7XG4gIH1cblxuICBnZXRUYXJnZXRUYWdEcm9wRWxlbWVudCgpe1xuICAgIGxldCBlbG0gPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVxuXG4gICAgaWYoZWxtLmxlbmd0aClyZXR1cm4gZWxtWzBdXG5cbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF1cbiAgfVxufVxuIl19