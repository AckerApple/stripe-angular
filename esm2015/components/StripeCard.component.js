import { __decorate } from "tslib";
import { ElementRef, Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeSource } from "./StripeSource.component";
let StripeCard = class StripeCard extends StripeSource {
    constructor(ElementRef, StripeScriptTag) {
        super(StripeScriptTag);
        this.ElementRef = ElementRef;
        this.StripeScriptTag = StripeScriptTag;
        this.tokenChange = new EventEmitter();
    }
    ngOnInit() {
        super.init()
            .then(() => {
            this.elements = this.stripe.elements().create('card', this.options);
            this.elements.mount(this.ElementRef.nativeElement);
            this.elements.addEventListener('change', (result) => {
                if (result.error) {
                    this.invalidChange.emit(this.invalid = result.error);
                }
            });
        });
    }
    createToken(extraData) {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createToken(this.elements, extraData)
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
};
StripeCard.ctorParameters = () => [
    { type: ElementRef },
    { type: StripeScriptTag }
];
__decorate([
    Input()
], StripeCard.prototype, "options", void 0);
__decorate([
    Input()
], StripeCard.prototype, "token", void 0);
__decorate([
    Output()
], StripeCard.prototype, "tokenChange", void 0);
StripeCard = __decorate([
    Component({
        selector: "stripe-card",
        template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
        exportAs: "StripeCard"
    })
], StripeCard);
export { StripeCard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdHJpcGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3RyaXBlQ2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRzNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFVcEQsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLFlBQVk7SUFNN0MsWUFDUyxVQUFxQixFQUNyQixlQUErQjtRQUV0QyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7UUFIZixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUo5QixnQkFBVyxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFBO0lBT3BFLENBQUM7SUFFRCxRQUFRO1FBQ04sS0FBSyxDQUFDLElBQUksRUFBRTthQUNYLElBQUksQ0FBQyxHQUFFLEVBQUU7WUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDbkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUVsRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQVUsRUFBQyxFQUFFO2dCQUNyRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7b0JBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFBO2lCQUNyRDtZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsV0FBVyxDQUNULFNBQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7YUFDdkQsSUFBSSxDQUFDLENBQUMsTUFBVSxFQUFDLEVBQUU7WUFDbEIsSUFBRyxNQUFNLENBQUMsS0FBSyxFQUFDO2dCQUNkLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUUsa0JBQWtCLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFBO2lCQUNyRDtxQkFBSTtvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQy9CLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQTtpQkFDbkI7YUFDRjtpQkFBSTtnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDOUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFBO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQTs7WUF6Q3FCLFVBQVU7WUFDTCxlQUFlOztBQVAvQjtJQUFSLEtBQUssRUFBRTsyQ0FBMkI7QUFFMUI7SUFBUixLQUFLLEVBQUU7eUNBQW1CO0FBQ2pCO0lBQVQsTUFBTSxFQUFFOytDQUEyRDtBQUp0RCxVQUFVO0lBUnpCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFFBQVEsRUFBRTs7OztHQUlUO1FBQ0QsUUFBUSxFQUFDLFlBQVk7S0FDdEIsQ0FBQztHQUFjLFVBQVUsQ0FnRHpCO1NBaERlLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7XG4gIFN0cmlwZVRva2VuLCBTdHJpcGVDYXJkT3B0aW9ucyB9IGZyb20gXCIuLi9TdHJpcGVUeXBlc1wiXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi4vU3RyaXBlU2NyaXB0VGFnXCJcbmltcG9ydCB7IFN0cmlwZVNvdXJjZSB9IGZyb20gXCIuL1N0cmlwZVNvdXJjZS5jb21wb25lbnRcIlxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwic3RyaXBlLWNhcmRcIixcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhU3RyaXBlU2NyaXB0VGFnLlN0cmlwZUluc3RhbmNlXCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImNvbG9yOnJlZDtcIj5TdHJpcGUgUHVibGlzaGFibGVLZXkgTk9UIFNFVC4gVXNlIG1ldGhvZCBTdHJpcGVTY3JpcHRUYWcuc2V0UHVibGlzaGFibGVLZXkoKTwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGV4cG9ydEFzOlwiU3RyaXBlQ2FyZFwiXG59KSBleHBvcnQgY2xhc3MgU3RyaXBlQ2FyZCBleHRlbmRzIFN0cmlwZVNvdXJjZXtcbiAgQElucHV0KCkgb3B0aW9ucyE6U3RyaXBlQ2FyZE9wdGlvbnNcblxuICBASW5wdXQoKSB0b2tlbiE6U3RyaXBlVG9rZW5cbiAgQE91dHB1dCgpIHRva2VuQ2hhbmdlOkV2ZW50RW1pdHRlcjxTdHJpcGVUb2tlbj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgRWxlbWVudFJlZjpFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBTdHJpcGVTY3JpcHRUYWc6U3RyaXBlU2NyaXB0VGFnXG4gICl7XG4gICAgc3VwZXIoU3RyaXBlU2NyaXB0VGFnKVxuICB9XG5cbiAgbmdPbkluaXQoKXtcbiAgICBzdXBlci5pbml0KClcbiAgICAudGhlbigoKT0+e1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKCkuY3JlYXRlKCdjYXJkJywgdGhpcy5vcHRpb25zKVxuICAgICAgdGhpcy5lbGVtZW50cy5tb3VudCh0aGlzLkVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcblxuICAgICAgdGhpcy5lbGVtZW50cy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAocmVzdWx0OmFueSk9PntcbiAgICAgICAgaWYoIHJlc3VsdC5lcnJvciApe1xuICAgICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQ9cmVzdWx0LmVycm9yIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlVG9rZW4oXG4gICAgZXh0cmFEYXRhPzphbnlcbiAgKTpQcm9taXNlPFN0cmlwZVRva2VuPntcbiAgICBkZWxldGUgdGhpcy5pbnZhbGlkXG4gICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQodGhpcy5pbnZhbGlkKVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXBlLmNyZWF0ZVRva2VuKHRoaXMuZWxlbWVudHMsIGV4dHJhRGF0YSlcbiAgICAudGhlbigocmVzdWx0OmFueSk9PntcbiAgICAgIGlmKHJlc3VsdC5lcnJvcil7XG4gICAgICAgIGlmKCByZXN1bHQuZXJyb3IudHlwZT09XCJ2YWxpZGF0aW9uX2Vycm9yXCIgKXtcbiAgICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJlc3VsdC5lcnJvcilcbiAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3JcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMudG9rZW5DaGFuZ2UuZW1pdCh0aGlzLnRva2VuPXJlc3VsdC50b2tlbilcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50b2tlblxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==