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
        this.elements.on('change', (result) => {
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
    completeChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBVXBELE1BQU0sT0FBTyxVQUFXLFNBQVEsWUFBWTtJQWE3QyxZQUNTLFVBQXFCLEVBQ3JCLGVBQStCO1FBRXRDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUhmLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBWDlCLGdCQUFXLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFM0QsZ0JBQVcsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUVuRCxhQUFRLEdBQVksS0FBSyxDQUFBO1FBQ3hCLG1CQUFjLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFbkUsVUFBSyxHQUFHLEtBQUssQ0FBQTtJQU9iLENBQUM7SUFFRCxRQUFRO1FBQ04sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFFLEVBQUUsQ0FBQSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBRUQsV0FBVyxDQUFFLE9BQVc7UUFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBRWxELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFXLEVBQUMsRUFBRTtZQUN4QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMxRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMzRDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFVLEVBQUMsRUFBRTtZQUNyRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFBO2FBQ3JEO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQsV0FBVyxDQUNULFNBQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7YUFDdkQsSUFBSSxDQUFDLENBQUMsTUFBVSxFQUFDLEVBQUU7WUFDbEIsSUFBRyxNQUFNLENBQUMsS0FBSyxFQUFDO2dCQUNkLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUUsa0JBQWtCLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFBO2lCQUNyRDtxQkFBSTtvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQy9CLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQTtpQkFDbkI7YUFDRjtpQkFBSTtnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDOUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFBO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDOzs7WUEvRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxRQUFRLEVBQUMsWUFBWTthQUN0Qjs7O1lBWkMsVUFBVTtZQUNILGVBQWU7OztzQkFZckIsS0FBSztvQkFFTCxLQUFLOzBCQUNMLE1BQU07MEJBRU4sTUFBTTt1QkFFTixLQUFLOzZCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuaW1wb3J0IHsgU3RyaXBlU291cmNlIH0gZnJvbSBcIi4vU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzdHJpcGUtY2FyZFwiLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTdHJpcGVTY3JpcHRUYWcuU3RyaXBlSW5zdGFuY2VcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiY29sb3I6cmVkO1wiPlN0cmlwZSBQdWJsaXNoYWJsZUtleSBOT1QgU0VULiBVc2UgbWV0aG9kIFN0cmlwZVNjcmlwdFRhZy5zZXRQdWJsaXNoYWJsZUtleSgpPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZXhwb3J0QXM6XCJTdHJpcGVDYXJkXCJcbn0pIGV4cG9ydCBjbGFzcyBTdHJpcGVDYXJkIGV4dGVuZHMgU3RyaXBlU291cmNle1xuICBASW5wdXQoKSBvcHRpb25zITpzdHJpcGUuZWxlbWVudHMuRWxlbWVudHNPcHRpb25zXG5cbiAgQElucHV0KCkgdG9rZW4hOiBzdHJpcGUuVG9rZW5cbiAgQE91dHB1dCgpIHRva2VuQ2hhbmdlOkV2ZW50RW1pdHRlcjxzdHJpcGUuVG9rZW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgQE91dHB1dCgpIGNhcmRNb3VudGVkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgQElucHV0KCkgY29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZVxuICBAT3V0cHV0KCkgY29tcGxldGVDaGFuZ2U6RXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgZHJhd24gPSBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBFbGVtZW50UmVmOkVsZW1lbnRSZWYsXG4gICAgcHVibGljIFN0cmlwZVNjcmlwdFRhZzpTdHJpcGVTY3JpcHRUYWdcbiAgKXtcbiAgICBzdXBlcihTdHJpcGVTY3JpcHRUYWcpXG4gIH1cblxuICBuZ09uSW5pdCgpe1xuICAgIHN1cGVyLmluaXQoKS50aGVuKCgpPT50aGlzLnJlZHJhdygpKVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoIGNoYW5nZXM6YW55ICl7XG4gICAgaWYgKHRoaXMuZHJhd24gJiYgY2hhbmdlcy5vcHRpb25zKSB7XG4gICAgICB0aGlzLnJlZHJhdygpO1xuICAgIH1cbiAgfVxuXG4gIHJlZHJhdygpIHtcbiAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoKS5jcmVhdGUoJ2NhcmQnLCB0aGlzLm9wdGlvbnMpXG4gICAgdGhpcy5lbGVtZW50cy5tb3VudCh0aGlzLkVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcblxuICAgIHRoaXMuY2FyZE1vdW50ZWQuZW1pdCh0aGlzLmVsZW1lbnRzKTtcblxuICAgIHRoaXMuZWxlbWVudHMub24oJ2NoYW5nZScsIChyZXN1bHQ6IGFueSk9PntcbiAgICAgIGlmIChyZXN1bHQuY29tcGxldGUgfHwgKHRoaXMuY29tcGxldGUgJiYgIXJlc3VsdC5jb21wbGV0ZSkpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZUNoYW5nZS5lbWl0KHRoaXMuY29tcGxldGUgPSByZXN1bHQuY29tcGxldGUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50cy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAocmVzdWx0OmFueSk9PntcbiAgICAgIGlmKCByZXN1bHQuZXJyb3IgKXtcbiAgICAgICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQoIHRoaXMuaW52YWxpZD1yZXN1bHQuZXJyb3IgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLmRyYXduID0gdHJ1ZTtcbiAgfVxuXG4gIGNyZWF0ZVRva2VuKFxuICAgIGV4dHJhRGF0YT86YW55XG4gICk6UHJvbWlzZTxzdHJpcGUuVG9rZW4+e1xuICAgIGRlbGV0ZSB0aGlzLmludmFsaWRcbiAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWQpXG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcGUuY3JlYXRlVG9rZW4odGhpcy5lbGVtZW50cywgZXh0cmFEYXRhKVxuICAgIC50aGVuKChyZXN1bHQ6YW55KT0+e1xuICAgICAgaWYocmVzdWx0LmVycm9yKXtcbiAgICAgICAgaWYoIHJlc3VsdC5lcnJvci50eXBlPT1cInZhbGlkYXRpb25fZXJyb3JcIiApe1xuICAgICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQ9cmVzdWx0LmVycm9yIClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5jYXRjaGVyLmVtaXQocmVzdWx0LmVycm9yKVxuICAgICAgICAgIHRocm93IHJlc3VsdC5lcnJvclxuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy50b2tlbkNoYW5nZS5lbWl0KHRoaXMudG9rZW49cmVzdWx0LnRva2VuKVxuICAgICAgICByZXR1cm4gcmVzdWx0LnRva2VuXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19