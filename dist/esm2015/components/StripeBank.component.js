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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQmFuay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TdHJpcGVCYW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUN2QyxNQUFNLGVBQWUsQ0FBQTtBQUV0QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFFbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBbUJqRCxNQUFNLE9BQU8sVUFBVyxTQUFRLGVBQWU7SUFNaEQsWUFDUyxlQUErQjtRQUV0QyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7UUFGZixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFIOUIsZ0JBQVcsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQU05RCxDQUFDO0lBRUQsV0FBVyxDQUFFLElBQTZCO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDO2FBQ25ELElBQUksQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO1lBQ3BCLElBQUcsTUFBTSxDQUFDLEtBQUssRUFBQztnQkFDZCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLGtCQUFrQixFQUFFO29CQUN6QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBQTtpQkFDckQ7cUJBQUk7b0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUMvQixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUE7aUJBQ25CO2FBQ0Y7aUJBQUk7Z0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzlDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQTthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBdENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsUUFBUSxFQUFDLFlBQVk7YUFDdEI7OztZQW5CUSxlQUFlOzs7c0JBb0JyQixLQUFLO29CQUVMLEtBQUs7MEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50XG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7IFNvdXJjZU9wdGlvbnMsIEVsZW1lbnRzT3B0aW9ucyB9IGZyb20gXCIuLi9TdHJpcGVUeXBlc1wiXG5pbXBvcnQgeyBTdHJpcGVDb21wb25lbnQgfSBmcm9tIFwiLi9TdHJpcGVDb21wb25lbnRcIlxuaW1wb3J0IHsgQmFua0FjY291bnRUb2tlbk9wdGlvbnMsIFRva2VuIH0gZnJvbSBcIi4uL1N0cmlwZVR5cGVzXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuXG5leHBvcnQgaW50ZXJmYWNlIGJhbmtfYWNjb3VudHtcbiAgY291bnRyeSAgICAgICAgICAgICA6IHN0cmluZ1xuICBjdXJyZW5jeSAgICAgICAgICAgIDogc3RyaW5nXG4gIHJvdXRpbmdfbnVtYmVyICAgICAgOiBzdHJpbmdcbiAgYWNjb3VudF9udW1iZXIgICAgICA6IHN0cmluZ1xuICBhY2NvdW50X2hvbGRlcl9uYW1lIDogc3RyaW5nXG4gIGFjY291bnRfaG9sZGVyX3R5cGUgOiBzdHJpbmdcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInN0cmlwZS1iYW5rXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVN0cmlwZVNjcmlwdFRhZy5TdHJpcGVJbnN0YW5jZVwiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJjb2xvcjpyZWQ7XCI+U3RyaXBlIFB1Ymxpc2hhYmxlS2V5IE5PVCBTRVQuIFVzZSBtZXRob2QgU3RyaXBlU2NyaXB0VGFnLnNldFB1Ymxpc2hhYmxlS2V5KCk8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBleHBvcnRBczpcIlN0cmlwZUJhbmtcIlxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZUJhbmsgZXh0ZW5kcyBTdHJpcGVDb21wb25lbnR7XG4gIEBJbnB1dCgpIG9wdGlvbnMhOiBFbGVtZW50c09wdGlvbnMgLy8gdmVyeSBzaW1pbGFyIHR5cGUgdG8gY2FyZCBvcHRpb25zXG5cbiAgQElucHV0KCkgdG9rZW4hOiBUb2tlblxuICBAT3V0cHV0KCkgdG9rZW5DaGFuZ2U6RXZlbnRFbWl0dGVyPFRva2VuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBTdHJpcGVTY3JpcHRUYWc6U3RyaXBlU2NyaXB0VGFnXG4gICl7XG4gICAgc3VwZXIoU3RyaXBlU2NyaXB0VGFnKVxuICB9XG5cbiAgY3JlYXRlVG9rZW4oIGRhdGE6IEJhbmtBY2NvdW50VG9rZW5PcHRpb25zICk6UHJvbWlzZTxUb2tlbj57XG4gICAgZGVsZXRlIHRoaXMuaW52YWxpZFxuICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KHRoaXMuaW52YWxpZClcblxuICAgIHJldHVybiB0aGlzLnN0cmlwZS5jcmVhdGVUb2tlbignYmFua19hY2NvdW50JywgZGF0YSlcbiAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHsgLy8gVG9rZW5SZXNwb25zZVxuICAgICAgaWYocmVzdWx0LmVycm9yKXtcbiAgICAgICAgaWYoIHJlc3VsdC5lcnJvci50eXBlPT1cInZhbGlkYXRpb25fZXJyb3JcIiApe1xuICAgICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQ9cmVzdWx0LmVycm9yIClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5jYXRjaGVyLmVtaXQocmVzdWx0LmVycm9yKVxuICAgICAgICAgIHRocm93IHJlc3VsdC5lcnJvclxuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy50b2tlbkNoYW5nZS5lbWl0KHRoaXMudG9rZW49cmVzdWx0LnRva2VuKVxuICAgICAgICByZXR1cm4gcmVzdWx0LnRva2VuXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==