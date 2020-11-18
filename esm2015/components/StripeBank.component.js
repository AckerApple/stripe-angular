import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeComponent } from "./StripeComponent";
import { StripeScriptTag } from "../StripeScriptTag";
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
StripeBank.decorators = [
    { type: Component, args: [{
                selector: "stripe-bank",
                template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                exportAs: "StripeBank"
            },] }
];
StripeBank.ctorParameters = () => [
    { type: StripeScriptTag }
];
StripeBank.propDecorators = {
    options: [{ type: Input }],
    token: [{ type: Input }],
    tokenChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQmFuay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TdHJpcGVCYW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUN2QyxNQUFNLGVBQWUsQ0FBQTtBQUV0QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFFbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBbUJqRCxNQUFNLE9BQU8sVUFBVyxTQUFRLGVBQWU7SUFNaEQsWUFDUyxlQUErQjtRQUV0QyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7UUFGZixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFIOUIsZ0JBQVcsR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQU1wRSxDQUFDO0lBRUQsV0FBVyxDQUFFLElBQVM7UUFDcEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUVyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUM7YUFDbkQsSUFBSSxDQUFDLENBQUMsTUFBVSxFQUFDLEVBQUU7WUFDbEIsSUFBRyxNQUFNLENBQUMsS0FBSyxFQUFDO2dCQUNkLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUUsa0JBQWtCLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFBO2lCQUNyRDtxQkFBSTtvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQy9CLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQTtpQkFDbkI7YUFDRjtpQkFBSTtnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDOUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFBO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDOzs7WUF0Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxRQUFRLEVBQUMsWUFBWTthQUN0Qjs7O1lBbkJRLGVBQWU7OztzQkFvQnJCLEtBQUs7b0JBRUwsS0FBSzswQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb21wb25lbnRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHsgU3RyaXBlQ2FyZE9wdGlvbnMgfSBmcm9tIFwiLi4vU3RyaXBlVHlwZXNcIlxuaW1wb3J0IHsgU3RyaXBlQ29tcG9uZW50IH0gZnJvbSBcIi4vU3RyaXBlQ29tcG9uZW50XCJcbmltcG9ydCB7IFN0cmlwZVRva2VuIH0gZnJvbSBcIi4uL1N0cmlwZVR5cGVzXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuXG5leHBvcnQgaW50ZXJmYWNlIGJhbmtfYWNjb3VudHtcbiAgY291bnRyeSAgICAgICAgICAgICA6IHN0cmluZ1xuICBjdXJyZW5jeSAgICAgICAgICAgIDogc3RyaW5nXG4gIHJvdXRpbmdfbnVtYmVyICAgICAgOiBzdHJpbmdcbiAgYWNjb3VudF9udW1iZXIgICAgICA6IHN0cmluZ1xuICBhY2NvdW50X2hvbGRlcl9uYW1lIDogc3RyaW5nXG4gIGFjY291bnRfaG9sZGVyX3R5cGUgOiBzdHJpbmdcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInN0cmlwZS1iYW5rXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVN0cmlwZVNjcmlwdFRhZy5TdHJpcGVJbnN0YW5jZVwiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJjb2xvcjpyZWQ7XCI+U3RyaXBlIFB1Ymxpc2hhYmxlS2V5IE5PVCBTRVQuIFVzZSBtZXRob2QgU3RyaXBlU2NyaXB0VGFnLnNldFB1Ymxpc2hhYmxlS2V5KCk8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBleHBvcnRBczpcIlN0cmlwZUJhbmtcIlxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZUJhbmsgZXh0ZW5kcyBTdHJpcGVDb21wb25lbnR7XG4gIEBJbnB1dCgpIG9wdGlvbnMhOlN0cmlwZUNhcmRPcHRpb25zLy92ZXJ5IHNpbWlsYXIgdHlwZSB0byBjYXJkIG9wdGlvbnNcblxuICBASW5wdXQoKSB0b2tlbiE6U3RyaXBlVG9rZW5cbiAgQE91dHB1dCgpIHRva2VuQ2hhbmdlOkV2ZW50RW1pdHRlcjxTdHJpcGVUb2tlbj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe1xuICAgIHN1cGVyKFN0cmlwZVNjcmlwdFRhZylcbiAgfVxuXG4gIGNyZWF0ZVRva2VuKCBkYXRhPzphbnkgKTpQcm9taXNlPFN0cmlwZVRva2VuPntcbiAgICBkZWxldGUgdGhpcy5pbnZhbGlkXG4gICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQodGhpcy5pbnZhbGlkKVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXBlLmNyZWF0ZVRva2VuKCdiYW5rX2FjY291bnQnLCBkYXRhKVxuICAgIC50aGVuKChyZXN1bHQ6YW55KT0+e1xuICAgICAgaWYocmVzdWx0LmVycm9yKXtcbiAgICAgICAgaWYoIHJlc3VsdC5lcnJvci50eXBlPT1cInZhbGlkYXRpb25fZXJyb3JcIiApe1xuICAgICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQ9cmVzdWx0LmVycm9yIClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5jYXRjaGVyLmVtaXQocmVzdWx0LmVycm9yKVxuICAgICAgICAgIHRocm93IHJlc3VsdC5lcnJvclxuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy50b2tlbkNoYW5nZS5lbWl0KHRoaXMudG9rZW49cmVzdWx0LnRva2VuKVxuICAgICAgICByZXR1cm4gcmVzdWx0LnRva2VuXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19