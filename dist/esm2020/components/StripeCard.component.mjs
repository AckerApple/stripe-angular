import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeSource } from "./StripeSource.component";
import * as i0 from "@angular/core";
import * as i1 from "../StripeScriptTag";
import * as i2 from "@angular/common";
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
StripeCard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeCard, deps: [{ token: i0.ElementRef }, { token: i1.StripeScriptTag }], target: i0.ɵɵFactoryTarget.Component });
StripeCard.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: StripeCard, selector: "stripe-card", inputs: { createOptions: "createOptions", options: "options", token: "token", complete: "complete" }, outputs: { tokenChange: "tokenChange", cardMounted: "cardMounted", completeChange: "completeChange", changed: "changed" }, exportAs: ["StripeCard"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeCard, decorators: [{
            type: Component,
            args: [{
                    selector: "stripe-card",
                    template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                    exportAs: "StripeCard"
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StripeScriptTag }]; }, propDecorators: { createOptions: [{
                type: Input
            }], options: [{
                type: Input
            }], token: [{
                type: Input
            }], tokenChange: [{
                type: Output
            }], cardMounted: [{
                type: Output
            }], complete: [{
                type: Input
            }], completeChange: [{
                type: Output
            }], changed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ08sS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRTNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTs7OztBQVVwRCxNQUFNLE9BQU8sVUFBVyxTQUFRLFlBQVk7SUFnQjdDLFlBQ1MsVUFBcUIsRUFDckIsZUFBK0I7UUFFdEMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBSGYsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFiOUIsZ0JBQVcsR0FBOEIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUUzRCxnQkFBVyxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRW5ELGFBQVEsR0FBWSxLQUFLLENBQUE7UUFDeEIsbUJBQWMsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUV6RCxZQUFPLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUE7UUFFckUsVUFBSyxHQUFHLEtBQUssQ0FBQTtJQU9iLENBQUM7SUFFRCxRQUFRO1FBQ04sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFFLEVBQUUsQ0FBQSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBRUQsV0FBVyxDQUFFLE9BQVc7UUFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDNUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxD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QXBCLE1BQU07Z0JBRUcsV0FBVztzQkFBcEIsTUFBTTtnQkFFRSxRQUFRO3NCQUFoQixLQUFLO2dCQUNJLGNBQWM7c0JBQXZCLE1BQU07Z0JBRUcsT0FBTztzQkFBaEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4uL1N0cmlwZVNjcmlwdFRhZ1wiXG5pbXBvcnQgeyBTdHJpcGVTb3VyY2UgfSBmcm9tIFwiLi9TdHJpcGVTb3VyY2UuY29tcG9uZW50XCJcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInN0cmlwZS1jYXJkXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVN0cmlwZVNjcmlwdFRhZy5TdHJpcGVJbnN0YW5jZVwiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJjb2xvcjpyZWQ7XCI+U3RyaXBlIFB1Ymxpc2hhYmxlS2V5IE5PVCBTRVQuIFVzZSBtZXRob2QgU3RyaXBlU2NyaXB0VGFnLnNldFB1Ymxpc2hhYmxlS2V5KCk8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBleHBvcnRBczpcIlN0cmlwZUNhcmRcIlxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZUNhcmQgZXh0ZW5kcyBTdHJpcGVTb3VyY2Uge1xuICBASW5wdXQoKSBjcmVhdGVPcHRpb25zITpzdHJpcGUuZWxlbWVudHMuRWxlbWVudHNDcmVhdGVPcHRpb25zXG4gIEBJbnB1dCgpIG9wdGlvbnMhOnN0cmlwZS5lbGVtZW50cy5FbGVtZW50c09wdGlvbnNcblxuICBASW5wdXQoKSB0b2tlbiE6IHN0cmlwZS5Ub2tlblxuICBAT3V0cHV0KCkgdG9rZW5DaGFuZ2U6RXZlbnRFbWl0dGVyPHN0cmlwZS5Ub2tlbj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBAT3V0cHV0KCkgY2FyZE1vdW50ZWQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBASW5wdXQoKSBjb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlXG4gIEBPdXRwdXQoKSBjb21wbGV0ZUNoYW5nZTpFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBAT3V0cHV0KCkgY2hhbmdlZDpFdmVudEVtaXR0ZXI8SUNhcmRDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBkcmF3biA9IGZhbHNlXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIEVsZW1lbnRSZWY6RWxlbWVudFJlZixcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe1xuICAgIHN1cGVyKFN0cmlwZVNjcmlwdFRhZylcbiAgfVxuXG4gIG5nT25Jbml0KCl7XG4gICAgc3VwZXIuaW5pdCgpLnRoZW4oKCk9PnRoaXMucmVkcmF3KCkpXG4gIH1cblxuICBuZ09uQ2hhbmdlcyggY2hhbmdlczphbnkgKXtcbiAgICBpZiAodGhpcy5kcmF3biAmJiAoY2hhbmdlcy5vcHRpb25zIHx8IGNoYW5nZXMuY3JlYXRlT3B0aW9ucykpIHtcbiAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgfVxuICB9XG5cbiAgcmVkcmF3KCkge1xuICAgIGlmICh0aGlzLmRyYXduKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLnVubW91bnQoKTtcbiAgICAgIHRoaXMuZWxlbWVudHMuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHModGhpcy5jcmVhdGVPcHRpb25zKS5jcmVhdGUoJ2NhcmQnLCB0aGlzLm9wdGlvbnMpXG4gICAgdGhpcy5lbGVtZW50cy5tb3VudCh0aGlzLkVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcblxuICAgIHRoaXMuY2FyZE1vdW50ZWQuZW1pdCh0aGlzLmVsZW1lbnRzKTtcbiAgICB0aGlzLmVsZW1lbnRzLm9uKCdjaGFuZ2UnLCAocmVzdWx0OiBhbnkpPT57XG4gICAgICB0aGlzLmNoYW5nZWQuZW1pdChyZXN1bHQpXG4gICAgICBpZiAocmVzdWx0LmNvbXBsZXRlIHx8ICh0aGlzLmNvbXBsZXRlICYmICFyZXN1bHQuY29tcGxldGUpKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVDaGFuZ2UuZW1pdCh0aGlzLmNvbXBsZXRlID0gcmVzdWx0LmNvbXBsZXRlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKHJlc3VsdDphbnkpPT57XG4gICAgICBpZiggcmVzdWx0LmVycm9yICl7XG4gICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQ9cmVzdWx0LmVycm9yIClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5kcmF3biA9IHRydWU7XG4gIH1cblxuICBjcmVhdGVUb2tlbihcbiAgICBleHRyYURhdGE/OmFueVxuICApOlByb21pc2U8c3RyaXBlLlRva2VuPntcbiAgICBkZWxldGUgdGhpcy5pbnZhbGlkXG4gICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQodGhpcy5pbnZhbGlkKVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXBlLmNyZWF0ZVRva2VuKHRoaXMuZWxlbWVudHMsIGV4dHJhRGF0YSlcbiAgICAudGhlbigocmVzdWx0OmFueSk9PntcbiAgICAgIGlmKHJlc3VsdC5lcnJvcil7XG4gICAgICAgIGlmKCByZXN1bHQuZXJyb3IudHlwZT09XCJ2YWxpZGF0aW9uX2Vycm9yXCIgKXtcbiAgICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJlc3VsdC5lcnJvcilcbiAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3JcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMudG9rZW5DaGFuZ2UuZW1pdCh0aGlzLnRva2VuPXJlc3VsdC50b2tlbilcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50b2tlblxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuaW50ZXJmYWNlIElDYXJkQ2hhbmdlRXZlbnQge1xuICBcImVsZW1lbnRUeXBlXCI6IHN0cmluZ1xuICBlcnJvcj86IHtcbiAgICBcImNvZGVcIjogc3RyaW5nXG4gICAgXCJ0eXBlXCI6IHN0cmluZ1xuICAgIFwibWVzc2FnZVwiOiBzdHJpbmdcbiAgfSxcbiAgXCJ2YWx1ZVwiOiB7XG4gICAgXCJwb3N0YWxDb2RlXCI6IHN0cmluZ1xuICB9LFxuICBcImVtcHR5XCI6IGJvb2xlYW4sXG4gIFwiY29tcGxldGVcIjogYm9vbGVhbixcbiAgXCJicmFuZFwiOiBzdHJpbmdcbn1cbiJdfQ==