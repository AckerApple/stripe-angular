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
      <ng-container *ngIf="!StripeScriptTag.stripe">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBVXBELE1BQU0sT0FBTyxVQUFXLFNBQVEsWUFBWTtJQWE3QyxZQUNTLFVBQXFCLEVBQ3JCLGVBQStCO1FBRXRDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUhmLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBWDlCLGdCQUFXLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFM0QsZ0JBQVcsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUVuRCxhQUFRLEdBQVksS0FBSyxDQUFBO1FBQ3hCLG1CQUFjLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFbkUsVUFBSyxHQUFHLEtBQUssQ0FBQTtJQU9iLENBQUM7SUFFRCxRQUFRO1FBQ04sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFFLEVBQUUsQ0FBQSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBRUQsV0FBVyxDQUFFLE9BQVc7UUFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBRWxELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFXLEVBQUMsRUFBRTtZQUN4QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMxRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMzRDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFVLEVBQUMsRUFBRTtZQUNyRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFBO2FBQ3JEO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQsV0FBVyxDQUNULFNBQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7YUFDdkQsSUFBSSxDQUFDLENBQUMsTUFBVSxFQUFDLEVBQUU7WUFDbEIsSUFBRyxNQUFNLENBQUMsS0FBSyxFQUFDO2dCQUNkLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUUsa0JBQWtCLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFBO2lCQUNyRDtxQkFBSTtvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQy9CLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQTtpQkFDbkI7YUFDRjtpQkFBSTtnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDOUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFBO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDOzs7WUEvRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxRQUFRLEVBQUMsWUFBWTthQUN0Qjs7O1lBWkMsVUFBVTtZQUNILGVBQWU7OztzQkFZckIsS0FBSztvQkFFTCxLQUFLOzBCQUNMLE1BQU07MEJBRU4sTUFBTTt1QkFFTixLQUFLOzZCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuaW1wb3J0IHsgU3RyaXBlU291cmNlIH0gZnJvbSBcIi4vU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzdHJpcGUtY2FyZFwiLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTdHJpcGVTY3JpcHRUYWcuc3RyaXBlXCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImNvbG9yOnJlZDtcIj5TdHJpcGUgUHVibGlzaGFibGVLZXkgTk9UIFNFVC4gVXNlIG1ldGhvZCBTdHJpcGVTY3JpcHRUYWcuc2V0UHVibGlzaGFibGVLZXkoKTwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGV4cG9ydEFzOlwiU3RyaXBlQ2FyZFwiXG59KSBleHBvcnQgY2xhc3MgU3RyaXBlQ2FyZCBleHRlbmRzIFN0cmlwZVNvdXJjZXtcbiAgQElucHV0KCkgb3B0aW9ucyE6c3RyaXBlLmVsZW1lbnRzLkVsZW1lbnRzT3B0aW9uc1xuXG4gIEBJbnB1dCgpIHRva2VuITogc3RyaXBlLlRva2VuXG4gIEBPdXRwdXQoKSB0b2tlbkNoYW5nZTpFdmVudEVtaXR0ZXI8c3RyaXBlLlRva2VuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBPdXRwdXQoKSBjYXJkTW91bnRlZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBJbnB1dCgpIGNvbXBsZXRlOiBib29sZWFuID0gZmFsc2VcbiAgQE91dHB1dCgpIGNvbXBsZXRlQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGRyYXduID0gZmFsc2VcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgRWxlbWVudFJlZjpFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBTdHJpcGVTY3JpcHRUYWc6U3RyaXBlU2NyaXB0VGFnXG4gICl7XG4gICAgc3VwZXIoU3RyaXBlU2NyaXB0VGFnKVxuICB9XG5cbiAgbmdPbkluaXQoKXtcbiAgICBzdXBlci5pbml0KCkudGhlbigoKT0+dGhpcy5yZWRyYXcoKSlcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCBjaGFuZ2VzOmFueSApe1xuICAgIGlmICh0aGlzLmRyYXduICYmIGNoYW5nZXMub3B0aW9ucykge1xuICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG4gIH1cblxuICByZWRyYXcoKSB7XG4gICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKCkuY3JlYXRlKCdjYXJkJywgdGhpcy5vcHRpb25zKVxuICAgIHRoaXMuZWxlbWVudHMubW91bnQodGhpcy5FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpXG5cbiAgICB0aGlzLmNhcmRNb3VudGVkLmVtaXQodGhpcy5lbGVtZW50cyk7XG5cbiAgICB0aGlzLmVsZW1lbnRzLm9uKCdjaGFuZ2UnLCAocmVzdWx0OiBhbnkpPT57XG4gICAgICBpZiAocmVzdWx0LmNvbXBsZXRlIHx8ICh0aGlzLmNvbXBsZXRlICYmICFyZXN1bHQuY29tcGxldGUpKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVDaGFuZ2UuZW1pdCh0aGlzLmNvbXBsZXRlID0gcmVzdWx0LmNvbXBsZXRlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKHJlc3VsdDphbnkpPT57XG4gICAgICBpZiggcmVzdWx0LmVycm9yICl7XG4gICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQ9cmVzdWx0LmVycm9yIClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5kcmF3biA9IHRydWU7XG4gIH1cblxuICBjcmVhdGVUb2tlbihcbiAgICBleHRyYURhdGE/OmFueVxuICApOlByb21pc2U8c3RyaXBlLlRva2VuPntcbiAgICBkZWxldGUgdGhpcy5pbnZhbGlkXG4gICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQodGhpcy5pbnZhbGlkKVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXBlLmNyZWF0ZVRva2VuKHRoaXMuZWxlbWVudHMsIGV4dHJhRGF0YSlcbiAgICAudGhlbigocmVzdWx0OmFueSk9PntcbiAgICAgIGlmKHJlc3VsdC5lcnJvcil7XG4gICAgICAgIGlmKCByZXN1bHQuZXJyb3IudHlwZT09XCJ2YWxpZGF0aW9uX2Vycm9yXCIgKXtcbiAgICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJlc3VsdC5lcnJvcilcbiAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3JcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMudG9rZW5DaGFuZ2UuZW1pdCh0aGlzLnRva2VuPXJlc3VsdC50b2tlbilcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50b2tlblxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==