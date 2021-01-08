import { ElementRef, Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeSource } from "./StripeSource.component";
export class StripeCard extends StripeSource {
    constructor(ElementRef, StripeScriptTag) {
        super(StripeScriptTag);
        this.ElementRef = ElementRef;
        this.StripeScriptTag = StripeScriptTag;
        this.tokenChange = new EventEmitter();
        this.cardMounted = new EventEmitter();
        this.complete = false;
        this.completeChange = new EventEmitter();
        this.changed = new EventEmitter();
        this.drawn = false;
    }
    ngOnInit() {
        super.init().then(() => this.redraw());
    }
    ngOnChanges(changes) {
        if (this.drawn && changes.options) {
            this.redraw();
        }
    }
    redraw() {
        this.elements = this.stripe.elements().create('card', this.options);
        this.elements.mount(this.ElementRef.nativeElement);
        this.cardMounted.emit(this.elements);
        console.log(0);
        this.elements.on('change', (result) => {
            console.log(1, result);
            this.changed.emit(result);
            if (result.complete || (this.complete && !result.complete)) {
                this.completeChange.emit(this.complete = result.complete);
            }
        });
        this.elements.addEventListener('change', (result) => {
            if (result.error) {
                this.invalidChange.emit(this.invalid = result.error);
            }
        });
        this.drawn = true;
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
}
StripeCard.decorators = [
    { type: Component, args: [{
                selector: "stripe-card",
                template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                exportAs: "StripeCard"
            },] }
];
StripeCard.ctorParameters = () => [
    { type: ElementRef },
    { type: StripeScriptTag }
];
StripeCard.propDecorators = {
    options: [{ type: Input }],
    token: [{ type: Input }],
    tokenChange: [{ type: Output }],
    cardMounted: [{ type: Output }],
    complete: [{ type: Input }],
    completeChange: [{ type: Output }],
    changed: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBVXBELE1BQU0sT0FBTyxVQUFXLFNBQVEsWUFBWTtJQWU3QyxZQUNTLFVBQXFCLEVBQ3JCLGVBQStCO1FBRXRDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUhmLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBYjlCLGdCQUFXLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFM0QsZ0JBQVcsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUVuRCxhQUFRLEdBQVksS0FBSyxDQUFBO1FBQ3hCLG1CQUFjLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFekQsWUFBTyxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRXhELFVBQUssR0FBRyxLQUFLLENBQUE7SUFPYixDQUFDO0lBRUQsUUFBUTtRQUNOLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFLENBQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUVELFdBQVcsQ0FBRSxPQUFXO1FBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVELE1BQU07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RXZlbnRFbWl0dGVyLCBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi4vU3RyaXBlU2NyaXB0VGFnXCJcbmltcG9ydCB7IFN0cmlwZVNvdXJjZSB9IGZyb20gXCIuL1N0cmlwZVNvdXJjZS5jb21wb25lbnRcIlxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwic3RyaXBlLWNhcmRcIixcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhU3RyaXBlU2NyaXB0VGFnLlN0cmlwZUluc3RhbmNlXCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImNvbG9yOnJlZDtcIj5TdHJpcGUgUHVibGlzaGFibGVLZXkgTk9UIFNFVC4gVXNlIG1ldGhvZCBTdHJpcGVTY3JpcHRUYWcuc2V0UHVibGlzaGFibGVLZXkoKTwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGV4cG9ydEFzOlwiU3RyaXBlQ2FyZFwiXG59KSBleHBvcnQgY2xhc3MgU3RyaXBlQ2FyZCBleHRlbmRzIFN0cmlwZVNvdXJjZXtcbiAgQElucHV0KCkgb3B0aW9ucyE6c3RyaXBlLmVsZW1lbnRzLkVsZW1lbnRzT3B0aW9uc1xuXG4gIEBJbnB1dCgpIHRva2VuITogc3RyaXBlLlRva2VuXG4gIEBPdXRwdXQoKSB0b2tlbkNoYW5nZTpFdmVudEVtaXR0ZXI8c3RyaXBlLlRva2VuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBPdXRwdXQoKSBjYXJkTW91bnRlZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBJbnB1dCgpIGNvbXBsZXRlOiBib29sZWFuID0gZmFsc2VcbiAgQE91dHB1dCgpIGNvbXBsZXRlQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBPdXRwdXQoKSBjaGFuZ2VkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgZHJhd24gPSBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBFbGVtZW50UmVmOkVsZW1lbnRSZWYsXG4gICAgcHVibGljIFN0cmlwZVNjcmlwdFRhZzpTdHJpcGVTY3JpcHRUYWdcbiAgKXtcbiAgICBzdXBlcihTdHJpcGVTY3JpcHRUYWcpXG4gIH1cblxuICBuZ09uSW5pdCgpe1xuICAgIHN1cGVyLmluaXQoKS50aGVuKCgpPT50aGlzLnJlZHJhdygpKVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoIGNoYW5nZXM6YW55ICl7XG4gICAgaWYgKHRoaXMuZHJhd24gJiYgY2hhbmdlcy5vcHRpb25zKSB7XG4gICAgICB0aGlzLnJlZHJhdygpO1xuICAgIH1cbiAgfVxuXG4gIHJlZHJhdygpIHtcbiAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoKS5jcmVhdGUoJ2NhcmQnLCB0aGlzLm9wdGlvbnMpXG4gICAgdGhpcy5lbGVtZW50cy5tb3VudCh0aGlzLkVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcblxuICAgIHRoaXMuY2FyZE1vdW50ZWQuZW1pdCh0aGlzLmVsZW1lbnRzKTtcbiAgICBjb25zb2xlLmxvZygwKVxuICAgIHRoaXMuZWxlbWVudHMub24oJ2NoYW5nZScsIChyZXN1bHQ6IGFueSk9PntcbiAgICAgIGNvbnNvbGUubG9nKDEscmVzdWx0KVxuICAgICAgdGhpcy5jaGFuZ2VkLmVtaXQocmVzdWx0KVxuICAgICAgaWYgKHJlc3VsdC5jb21wbGV0ZSB8fCAodGhpcy5jb21wbGV0ZSAmJiAhcmVzdWx0LmNvbXBsZXRlKSkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlQ2hhbmdlLmVtaXQodGhpcy5jb21wbGV0ZSA9IHJlc3VsdC5jb21wbGV0ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnRzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChyZXN1bHQ6YW55KT0+e1xuICAgICAgaWYoIHJlc3VsdC5lcnJvciApe1xuICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICB9XG4gICAgfSlcblxuICAgIHRoaXMuZHJhd24gPSB0cnVlO1xuICB9XG5cbiAgY3JlYXRlVG9rZW4oXG4gICAgZXh0cmFEYXRhPzphbnlcbiAgKTpQcm9taXNlPHN0cmlwZS5Ub2tlbj57XG4gICAgZGVsZXRlIHRoaXMuaW52YWxpZFxuICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KHRoaXMuaW52YWxpZClcblxuICAgIHJldHVybiB0aGlzLnN0cmlwZS5jcmVhdGVUb2tlbih0aGlzLmVsZW1lbnRzLCBleHRyYURhdGEpXG4gICAgLnRoZW4oKHJlc3VsdDphbnkpPT57XG4gICAgICBpZihyZXN1bHQuZXJyb3Ipe1xuICAgICAgICBpZiggcmVzdWx0LmVycm9yLnR5cGU9PVwidmFsaWRhdGlvbl9lcnJvclwiICl7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQoIHRoaXMuaW52YWxpZD1yZXN1bHQuZXJyb3IgKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmNhdGNoZXIuZW1pdChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yXG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnRva2VuQ2hhbmdlLmVtaXQodGhpcy50b2tlbj1yZXN1bHQudG9rZW4pXG4gICAgICAgIHJldHVybiByZXN1bHQudG9rZW5cbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=