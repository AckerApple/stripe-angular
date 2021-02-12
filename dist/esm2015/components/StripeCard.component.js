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
        if (this.drawn && (changes.options || changes.createOptions)) {
            this.redraw();
        }
    }
    redraw() {
        if (this.drawn) {
            this.elements.unmount();
            this.elements.destroy();
        }
        this.elements = this.stripe.elements(this.createOptions).create('card', this.options);
        this.elements.mount(this.ElementRef.nativeElement);
        this.cardMounted.emit(this.elements);
        this.elements.on('change', (result) => {
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
    createOptions: [{ type: Input }],
    options: [{ type: Input }],
    token: [{ type: Input }],
    tokenChange: [{ type: Output }],
    cardMounted: [{ type: Output }],
    complete: [{ type: Input }],
    completeChange: [{ type: Output }],
    changed: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBVXBELE1BQU0sT0FBTyxVQUFXLFNBQVEsWUFBWTtJQWdCN0MsWUFDUyxVQUFxQixFQUNyQixlQUErQjtRQUV0QyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7UUFIZixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQWI5QixnQkFBVyxHQUE4QixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRTNELGdCQUFXLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFbkQsYUFBUSxHQUFZLEtBQUssQ0FBQTtRQUN4QixtQkFBYyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRXpELFlBQU8sR0FBa0MsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUVyRSxVQUFLLEdBQUcsS0FBSyxDQUFBO0lBT2IsQ0FBQztJQUVELFFBQVE7UUFDTixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUUsRUFBRSxDQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFFRCxXQUFXLENBQUUsT0FBVztRQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM1RCxJQUFJLENBQUMsTUFBTSxFQUFF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TixLQUFLOzZCQUNMLE1BQU07c0JBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4uL1N0cmlwZVNjcmlwdFRhZ1wiXG5pbXBvcnQgeyBTdHJpcGVTb3VyY2UgfSBmcm9tIFwiLi9TdHJpcGVTb3VyY2UuY29tcG9uZW50XCJcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInN0cmlwZS1jYXJkXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVN0cmlwZVNjcmlwdFRhZy5TdHJpcGVJbnN0YW5jZVwiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJjb2xvcjpyZWQ7XCI+U3RyaXBlIFB1Ymxpc2hhYmxlS2V5IE5PVCBTRVQuIFVzZSBtZXRob2QgU3RyaXBlU2NyaXB0VGFnLnNldFB1Ymxpc2hhYmxlS2V5KCk8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBleHBvcnRBczpcIlN0cmlwZUNhcmRcIlxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZUNhcmQgZXh0ZW5kcyBTdHJpcGVTb3VyY2Uge1xuICBASW5wdXQoKSBjcmVhdGVPcHRpb25zITpzdHJpcGUuZWxlbWVudHMuRWxlbWVudHNDcmVhdGVPcHRpb25zXG4gIEBJbnB1dCgpIG9wdGlvbnMhOnN0cmlwZS5lbGVtZW50cy5FbGVtZW50c09wdGlvbnNcblxuICBASW5wdXQoKSB0b2tlbiE6IHN0cmlwZS5Ub2tlblxuICBAT3V0cHV0KCkgdG9rZW5DaGFuZ2U6RXZlbnRFbWl0dGVyPHN0cmlwZS5Ub2tlbj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBAT3V0cHV0KCkgY2FyZE1vdW50ZWQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBASW5wdXQoKSBjb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlXG4gIEBPdXRwdXQoKSBjb21wbGV0ZUNoYW5nZTpFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBAT3V0cHV0KCkgY2hhbmdlZDpFdmVudEVtaXR0ZXI8SUNhcmRDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBkcmF3biA9IGZhbHNlXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIEVsZW1lbnRSZWY6RWxlbWVudFJlZixcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe1xuICAgIHN1cGVyKFN0cmlwZVNjcmlwdFRhZylcbiAgfVxuXG4gIG5nT25Jbml0KCl7XG4gICAgc3VwZXIuaW5pdCgpLnRoZW4oKCk9PnRoaXMucmVkcmF3KCkpXG4gIH1cblxuICBuZ09uQ2hhbmdlcyggY2hhbmdlczphbnkgKXtcbiAgICBpZiAodGhpcy5kcmF3biAmJiAoY2hhbmdlcy5vcHRpb25zIHx8IGNoYW5nZXMuY3JlYXRlT3B0aW9ucykpIHtcbiAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgfVxuICB9XG5cbiAgcmVkcmF3KCkge1xuICAgIGlmICh0aGlzLmRyYXduKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLnVubW91bnQoKTtcbiAgICAgIHRoaXMuZWxlbWVudHMuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHModGhpcy5jcmVhdGVPcHRpb25zKS5jcmVhdGUoJ2NhcmQnLCB0aGlzLm9wdGlvbnMpXG4gICAgdGhpcy5lbGVtZW50cy5tb3VudCh0aGlzLkVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcblxuICAgIHRoaXMuY2FyZE1vdW50ZWQuZW1pdCh0aGlzLmVsZW1lbnRzKTtcbiAgICB0aGlzLmVsZW1lbnRzLm9uKCdjaGFuZ2UnLCAocmVzdWx0OiBhbnkpPT57XG4gICAgICB0aGlzLmNoYW5nZWQuZW1pdChyZXN1bHQpXG4gICAgICBpZiAocmVzdWx0LmNvbXBsZXRlIHx8ICh0aGlzLmNvbXBsZXRlICYmICFyZXN1bHQuY29tcGxldGUpKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVDaGFuZ2UuZW1pdCh0aGlzLmNvbXBsZXRlID0gcmVzdWx0LmNvbXBsZXRlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKHJlc3VsdDphbnkpPT57XG4gICAgICBpZiggcmVzdWx0LmVycm9yICl7XG4gICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQ9cmVzdWx0LmVycm9yIClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5kcmF3biA9IHRydWU7XG4gIH1cblxuICBjcmVhdGVUb2tlbihcbiAgICBleHRyYURhdGE/OmFueVxuICApOlByb21pc2U8c3RyaXBlLlRva2VuPntcbiAgICBkZWxldGUgdGhpcy5pbnZhbGlkXG4gICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQodGhpcy5pbnZhbGlkKVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXBlLmNyZWF0ZVRva2VuKHRoaXMuZWxlbWVudHMsIGV4dHJhRGF0YSlcbiAgICAudGhlbigocmVzdWx0OmFueSk9PntcbiAgICAgIGlmKHJlc3VsdC5lcnJvcil7XG4gICAgICAgIGlmKCByZXN1bHQuZXJyb3IudHlwZT09XCJ2YWxpZGF0aW9uX2Vycm9yXCIgKXtcbiAgICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJlc3VsdC5lcnJvcilcbiAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3JcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMudG9rZW5DaGFuZ2UuZW1pdCh0aGlzLnRva2VuPXJlc3VsdC50b2tlbilcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50b2tlblxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuaW50ZXJmYWNlIElDYXJkQ2hhbmdlRXZlbnQge1xuICBcImVsZW1lbnRUeXBlXCI6IHN0cmluZ1xuICBlcnJvcj86IHtcbiAgICBcImNvZGVcIjogc3RyaW5nXG4gICAgXCJ0eXBlXCI6IHN0cmluZ1xuICAgIFwibWVzc2FnZVwiOiBzdHJpbmdcbiAgfSxcbiAgXCJ2YWx1ZVwiOiB7XG4gICAgXCJwb3N0YWxDb2RlXCI6IHN0cmluZ1xuICB9LFxuICBcImVtcHR5XCI6IGJvb2xlYW4sXG4gIFwiY29tcGxldGVcIjogYm9vbGVhbixcbiAgXCJicmFuZFwiOiBzdHJpbmdcbn1cbiJdfQ==