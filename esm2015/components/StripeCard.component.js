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
        this.cardMounted = new EventEmitter();
    }
    ngOnInit() {
        super.init()
            .then(() => {
            this.elements = this.stripe.elements().create('card', this.options);
            this.elements.mount(this.ElementRef.nativeElement);
            this.cardMounted.emit(this.elements);
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
__decorate([
    Output()
], StripeCard.prototype, "cardMounted", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdHJpcGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3RyaXBlQ2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRzNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFVcEQsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLFlBQVk7SUFRN0MsWUFDUyxVQUFxQixFQUNyQixlQUErQjtRQUV0QyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7UUFIZixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQU45QixnQkFBVyxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRTFELGdCQUFXLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUE7SUFPNUQsQ0FBQztJQUVELFFBQVE7UUFDTixLQUFLLENBQUMsSUFBSSxFQUFFO2FBQ1gsSUFBSSxDQUFDLEdBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBRWxELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVyQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQVUsRUFBQyxFQUFFO2dCQUNyRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7b0JBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFBO2lCQUNyRDtZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsV0FBVyxDQUNULFNBQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7YUFDdkQsSUFBSSxDQUFDLENBQUMsTUFBVSxFQUFDLEVBQUU7WUFDbEIsSUFBRyxNQUFNLENBQUMsS0FBSyxFQUFDO2dCQUNkLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUUsa0JBQWtCLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFBO2lCQUNyRDtxQkFBSTtvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQy9CLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQTtpQkFDbkI7YUFDRjtpQkFBSTtnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDOUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFBO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQTs7WUEzQ3FCLFVBQVU7WUFDTCxlQUFlOztBQVQvQjtJQUFSLEtBQUssRUFBRTsyQ0FBMkI7QUFFMUI7SUFBUixLQUFLLEVBQUU7eUNBQW1CO0FBQ2pCO0lBQVQsTUFBTSxFQUFFOytDQUEyRDtBQUUxRDtJQUFULE1BQU0sRUFBRTsrQ0FBbUQ7QUFOOUMsVUFBVTtJQVJ6QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUU7Ozs7R0FJVDtRQUNELFFBQVEsRUFBQyxZQUFZO0tBQ3RCLENBQUM7R0FBYyxVQUFVLENBb0R6QjtTQXBEZSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXG5pbXBvcnQge1xuICBTdHJpcGVUb2tlbiwgU3RyaXBlQ2FyZE9wdGlvbnMgfSBmcm9tIFwiLi4vU3RyaXBlVHlwZXNcIlxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4uL1N0cmlwZVNjcmlwdFRhZ1wiXG5pbXBvcnQgeyBTdHJpcGVTb3VyY2UgfSBmcm9tIFwiLi9TdHJpcGVTb3VyY2UuY29tcG9uZW50XCJcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInN0cmlwZS1jYXJkXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVN0cmlwZVNjcmlwdFRhZy5TdHJpcGVJbnN0YW5jZVwiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJjb2xvcjpyZWQ7XCI+U3RyaXBlIFB1Ymxpc2hhYmxlS2V5IE5PVCBTRVQuIFVzZSBtZXRob2QgU3RyaXBlU2NyaXB0VGFnLnNldFB1Ymxpc2hhYmxlS2V5KCk8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBleHBvcnRBczpcIlN0cmlwZUNhcmRcIlxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZUNhcmQgZXh0ZW5kcyBTdHJpcGVTb3VyY2V7XG4gIEBJbnB1dCgpIG9wdGlvbnMhOlN0cmlwZUNhcmRPcHRpb25zXG5cbiAgQElucHV0KCkgdG9rZW4hOlN0cmlwZVRva2VuXG4gIEBPdXRwdXQoKSB0b2tlbkNoYW5nZTpFdmVudEVtaXR0ZXI8U3RyaXBlVG9rZW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgQE91dHB1dCgpIGNhcmRNb3VudGVkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIEVsZW1lbnRSZWY6RWxlbWVudFJlZixcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe1xuICAgIHN1cGVyKFN0cmlwZVNjcmlwdFRhZylcbiAgfVxuXG4gIG5nT25Jbml0KCl7XG4gICAgc3VwZXIuaW5pdCgpXG4gICAgLnRoZW4oKCk9PntcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cygpLmNyZWF0ZSgnY2FyZCcsIHRoaXMub3B0aW9ucylcbiAgICAgIHRoaXMuZWxlbWVudHMubW91bnQodGhpcy5FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpXG4gICAgICBcbiAgICAgIHRoaXMuY2FyZE1vdW50ZWQuZW1pdCh0aGlzLmVsZW1lbnRzKTtcblxuICAgICAgdGhpcy5lbGVtZW50cy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAocmVzdWx0OmFueSk9PntcbiAgICAgICAgaWYoIHJlc3VsdC5lcnJvciApe1xuICAgICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQ9cmVzdWx0LmVycm9yIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlVG9rZW4oXG4gICAgZXh0cmFEYXRhPzphbnlcbiAgKTpQcm9taXNlPFN0cmlwZVRva2VuPntcbiAgICBkZWxldGUgdGhpcy5pbnZhbGlkXG4gICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQodGhpcy5pbnZhbGlkKVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXBlLmNyZWF0ZVRva2VuKHRoaXMuZWxlbWVudHMsIGV4dHJhRGF0YSlcbiAgICAudGhlbigocmVzdWx0OmFueSk9PntcbiAgICAgIGlmKHJlc3VsdC5lcnJvcil7XG4gICAgICAgIGlmKCByZXN1bHQuZXJyb3IudHlwZT09XCJ2YWxpZGF0aW9uX2Vycm9yXCIgKXtcbiAgICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJlc3VsdC5lcnJvcilcbiAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3JcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMudG9rZW5DaGFuZ2UuZW1pdCh0aGlzLnRva2VuPXJlc3VsdC50b2tlbilcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50b2tlblxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==