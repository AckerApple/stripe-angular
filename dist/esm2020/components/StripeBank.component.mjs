import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeComponent } from "./StripeComponent";
import * as i0 from "@angular/core";
import * as i1 from "../StripeScriptTag";
import * as i2 from "@angular/common";
export class StripeBank extends StripeComponent {
    constructor(StripeScriptTag) {
        super(StripeScriptTag);
        this.StripeScriptTag = StripeScriptTag;
        this.tokenChange = new EventEmitter();
    }
    createToken(data) {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createToken('bank_account', data)
            .then((result) => {
            if (result.error) {
                if (result.error.type == "validation_error") {
                    this.invalidChange.emit(this.invalid = result.error);
                }
                else {
                    this.catcher.emit(result.error);
                    throw result.error;
                }
            }
            else {
                this.tokenChange.emit(this.token = result.token);
                return result.token;
            }
        });
    }
}
StripeBank.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeBank, deps: [{ token: i1.StripeScriptTag }], target: i0.ɵɵFactoryTarget.Component });
StripeBank.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: StripeBank, selector: "stripe-bank", inputs: { options: "options", token: "token" }, outputs: { tokenChange: "tokenChange" }, exportAs: ["StripeBank"], usesInheritance: true, ngImport: i0, template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeBank, decorators: [{
            type: Component,
            args: [{
                    selector: "stripe-bank",
                    template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                    exportAs: "StripeBank"
                }]
        }], ctorParameters: function () { return [{ type: i1.StripeScriptTag }]; }, propDecorators: { options: [{
                type: Input
            }], token: [{
                type: Input
            }], tokenChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQmFuay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9TdHJpcGVCYW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUN2QyxNQUFNLGVBQWUsQ0FBQTtBQUN0QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7Ozs7QUFXaEQsTUFBTSxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBTWhELFlBQ1MsZUFBK0I7UUFFdEMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBRmYsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBSDlCLGdCQUFXLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUE7SUFNckUsQ0FBQztJQUVELFdBQVcsQ0FBRSxJQUFvQztRQUMvQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQzthQUNuRCxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtZQUNwQixJQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUM7Z0JBQ2QsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksSUFBRSxrQkFBa0IsRUFBRTtvQkFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLE9BQU8sR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLENBQUE7aUJBQ3JEO3FCQUFJO29CQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDL0IsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFBO2lCQUNuQjthQUNGO2lCQUFJO2dCQUNILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUM5QyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUE7YUFDcEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O3dHQTlCYSxVQUFVOzRGQUFWLFVBQVUsNkxBTmQ7Ozs7R0FJVDs0RkFFYSxVQUFVO2tCQVJ6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxRQUFRLEVBQUMsWUFBWTtpQkFDdEI7c0dBQ1UsT0FBTztzQkFBZixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFDSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb21wb25lbnRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHsgU3RyaXBlQ29tcG9uZW50IH0gZnJvbSBcIi4vU3RyaXBlQ29tcG9uZW50XCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwic3RyaXBlLWJhbmtcIixcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhU3RyaXBlU2NyaXB0VGFnLlN0cmlwZUluc3RhbmNlXCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImNvbG9yOnJlZDtcIj5TdHJpcGUgUHVibGlzaGFibGVLZXkgTk9UIFNFVC4gVXNlIG1ldGhvZCBTdHJpcGVTY3JpcHRUYWcuc2V0UHVibGlzaGFibGVLZXkoKTwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGV4cG9ydEFzOlwiU3RyaXBlQmFua1wiXG59KSBleHBvcnQgY2xhc3MgU3RyaXBlQmFuayBleHRlbmRzIFN0cmlwZUNvbXBvbmVudHtcbiAgQElucHV0KCkgb3B0aW9ucyE6IHN0cmlwZS5lbGVtZW50cy5FbGVtZW50T3B0aW9ucyAvLyB2ZXJ5IHNpbWlsYXIgdHlwZSB0byBjYXJkIG9wdGlvbnNcblxuICBASW5wdXQoKSB0b2tlbiE6IHN0cmlwZS5Ub2tlblxuICBAT3V0cHV0KCkgdG9rZW5DaGFuZ2U6RXZlbnRFbWl0dGVyPHN0cmlwZS5Ub2tlbj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe1xuICAgIHN1cGVyKFN0cmlwZVNjcmlwdFRhZylcbiAgfVxuXG4gIGNyZWF0ZVRva2VuKCBkYXRhOiBzdHJpcGUuQmFua0FjY291bnRUb2tlbk9wdGlvbnMpOlByb21pc2U8c3RyaXBlLlRva2VuPntcbiAgICBkZWxldGUgdGhpcy5pbnZhbGlkXG4gICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQodGhpcy5pbnZhbGlkKVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXBlLmNyZWF0ZVRva2VuKCdiYW5rX2FjY291bnQnLCBkYXRhKVxuICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4geyAvLyBUb2tlblJlc3BvbnNlXG4gICAgICBpZihyZXN1bHQuZXJyb3Ipe1xuICAgICAgICBpZiggcmVzdWx0LmVycm9yLnR5cGU9PVwidmFsaWRhdGlvbl9lcnJvclwiICl7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQoIHRoaXMuaW52YWxpZD1yZXN1bHQuZXJyb3IgKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmNhdGNoZXIuZW1pdChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yXG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnRva2VuQ2hhbmdlLmVtaXQodGhpcy50b2tlbj1yZXN1bHQudG9rZW4pXG4gICAgICAgIHJldHVybiByZXN1bHQudG9rZW5cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qIGNyZWF0ZVNvdXJjZSAqL1xufVxuIl19