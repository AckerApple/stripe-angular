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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQmFuay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TdHJpcGVCYW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUN2QyxNQUFNLGVBQWUsQ0FBQTtBQUN0QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBVWpELE1BQU0sT0FBTyxVQUFXLFNBQVEsZUFBZTtJQU1oRCxZQUNTLGVBQStCO1FBRXRDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUZmLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUg5QixnQkFBVyxHQUE4QixJQUFJLFlBQVksRUFBRSxDQUFBO0lBTXJFLENBQUM7SUFFRCxXQUFXLENBQUUsSUFBb0M7UUFDL0MsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUVyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUM7YUFDbkQsSUFBSSxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7WUFDcEIsSUFBRyxNQUFNLENBQUMsS0FBSyxFQUFDO2dCQUNkLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUUsa0JBQWtCLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFBO2lCQUNyRDtxQkFBSTtvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQy9CLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQTtpQkFDbkI7YUFDRjtpQkFBSTtnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDOUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFBO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF0Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxRQUFRLEVBQUMsWUFBWTthQUN0Qjs7O1lBVlEsZUFBZTs7O3NCQVdyQixLQUFLO29CQUVMLEtBQUs7MEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50XG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7IFN0cmlwZUNvbXBvbmVudCB9IGZyb20gXCIuL1N0cmlwZUNvbXBvbmVudFwiXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi4vU3RyaXBlU2NyaXB0VGFnXCJcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInN0cmlwZS1iYW5rXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVN0cmlwZVNjcmlwdFRhZy5TdHJpcGVJbnN0YW5jZVwiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJjb2xvcjpyZWQ7XCI+U3RyaXBlIFB1Ymxpc2hhYmxlS2V5IE5PVCBTRVQuIFVzZSBtZXRob2QgU3RyaXBlU2NyaXB0VGFnLnNldFB1Ymxpc2hhYmxlS2V5KCk8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBleHBvcnRBczpcIlN0cmlwZUJhbmtcIlxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZUJhbmsgZXh0ZW5kcyBTdHJpcGVDb21wb25lbnR7XG4gIEBJbnB1dCgpIG9wdGlvbnMhOiBzdHJpcGUuZWxlbWVudHMuRWxlbWVudE9wdGlvbnMgLy8gdmVyeSBzaW1pbGFyIHR5cGUgdG8gY2FyZCBvcHRpb25zXG5cbiAgQElucHV0KCkgdG9rZW4hOiBzdHJpcGUuVG9rZW5cbiAgQE91dHB1dCgpIHRva2VuQ2hhbmdlOkV2ZW50RW1pdHRlcjxzdHJpcGUuVG9rZW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIFN0cmlwZVNjcmlwdFRhZzpTdHJpcGVTY3JpcHRUYWdcbiAgKXtcbiAgICBzdXBlcihTdHJpcGVTY3JpcHRUYWcpXG4gIH1cblxuICBjcmVhdGVUb2tlbiggZGF0YTogc3RyaXBlLkJhbmtBY2NvdW50VG9rZW5PcHRpb25zKTpQcm9taXNlPHN0cmlwZS5Ub2tlbj57XG4gICAgZGVsZXRlIHRoaXMuaW52YWxpZFxuICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KHRoaXMuaW52YWxpZClcblxuICAgIHJldHVybiB0aGlzLnN0cmlwZS5jcmVhdGVUb2tlbignYmFua19hY2NvdW50JywgZGF0YSlcbiAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHsgLy8gVG9rZW5SZXNwb25zZVxuICAgICAgaWYocmVzdWx0LmVycm9yKXtcbiAgICAgICAgaWYoIHJlc3VsdC5lcnJvci50eXBlPT1cInZhbGlkYXRpb25fZXJyb3JcIiApe1xuICAgICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQ9cmVzdWx0LmVycm9yIClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5jYXRjaGVyLmVtaXQocmVzdWx0LmVycm9yKVxuICAgICAgICAgIHRocm93IHJlc3VsdC5lcnJvclxuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy50b2tlbkNoYW5nZS5lbWl0KHRoaXMudG9rZW49cmVzdWx0LnRva2VuKVxuICAgICAgICByZXR1cm4gcmVzdWx0LnRva2VuXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiBjcmVhdGVTb3VyY2UgKi9cbn1cbiJdfQ==