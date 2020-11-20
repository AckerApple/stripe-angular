import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeComponent } from "./StripeComponent";
export class StripeSource extends StripeComponent {
    constructor(StripeScriptTag) {
        super(StripeScriptTag);
        this.StripeScriptTag = StripeScriptTag;
        this.sourceChange = new EventEmitter();
    }
    createSource(extraData) {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createSource(this.elements, extraData)
            .then((result) => this.processSourceResult(result));
    }
    processSourceResult(result) {
        if (result.error) {
            const rError = result.error;
            if (rError.type === "validation_error") {
                this.invalidChange.emit(this.invalid = rError);
            }
            else {
                this.catcher.emit(rError);
                throw rError;
            }
        }
        const source = result.source;
        if (source) {
            this.sourceChange.emit(this.source = source);
            return source;
        }
    }
}
StripeSource.decorators = [
    { type: Component, args: [{
                selector: "stripe-source",
                template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                exportAs: "StripeSource"
            },] }
];
StripeSource.ctorParameters = () => [
    { type: StripeScriptTag }
];
StripeSource.propDecorators = {
    source: [{ type: Input }],
    sourceChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlU291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL1N0cmlwZVNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDdkMsTUFBTSxlQUFlLENBQUE7QUFJdEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQVVoRCxNQUFNLE9BQU8sWUFBYSxTQUFRLGVBQWU7SUFNbEQsWUFDUyxlQUErQjtRQUV0QyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7UUFGZixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFMOUIsaUJBQVksR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQVFoRSxDQUFDO0lBRUQsWUFBWSxDQUNWLFNBQThDO1FBRTlDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FDN0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQ3pCO2FBQ0EsSUFBSSxDQUFDLENBQUMsTUFBVSxFQUFDLEVBQUUsQ0FBQSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsTUFBc0I7UUFDeEMsSUFBRyxNQUFNLENBQUMsS0FBSyxFQUFDO1lBQ2QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtZQUMzQixJQUFLLE1BQWMsQ0FBQyxJQUFJLEtBQUssa0JBQWtCLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFFLENBQUE7YUFDakQ7aUJBQUk7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sTUFBTSxDQUFDO2FBQ2Q7U0FDRjtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFN0IsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUFqREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxRQUFRLEVBQUMsY0FBYzthQUN4Qjs7O1lBWFEsZUFBZTs7O3FCQVlyQixLQUFLOzJCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXG5pbXBvcnQge1xuICBTb3VyY2VSZXNwb25zZSwgU291cmNlLCBPd25lckluZm9cbn0gZnJvbSBcIi4uL1N0cmlwZVR5cGVzXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuaW1wb3J0IHsgU3RyaXBlQ29tcG9uZW50IH0gZnJvbSBcIi4vU3RyaXBlQ29tcG9uZW50XCJcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInN0cmlwZS1zb3VyY2VcIixcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhU3RyaXBlU2NyaXB0VGFnLlN0cmlwZUluc3RhbmNlXCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImNvbG9yOnJlZDtcIj5TdHJpcGUgUHVibGlzaGFibGVLZXkgTk9UIFNFVC4gVXNlIG1ldGhvZCBTdHJpcGVTY3JpcHRUYWcuc2V0UHVibGlzaGFibGVLZXkoKTwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGV4cG9ydEFzOlwiU3RyaXBlU291cmNlXCJcbn0pIGV4cG9ydCBjbGFzcyBTdHJpcGVTb3VyY2UgZXh0ZW5kcyBTdHJpcGVDb21wb25lbnR7XG4gIEBJbnB1dCgpIHNvdXJjZT86IFNvdXJjZVxuICBAT3V0cHV0KCkgc291cmNlQ2hhbmdlOkV2ZW50RW1pdHRlcjxTb3VyY2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgZWxlbWVudHM6YW55IC8vIEZvciBjYXJkLCBpdHMgdGhlIFVJIGVsZW1lbnRcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe1xuICAgIHN1cGVyKFN0cmlwZVNjcmlwdFRhZylcbiAgfVxuXG4gIGNyZWF0ZVNvdXJjZShcbiAgICBleHRyYURhdGE6eyBvd25lcj86IE93bmVySW5mbywgbWV0YWRhdGE/OiBhbnl9XG4gICk6UHJvbWlzZTxTb3VyY2UgfCB2b2lkPntcbiAgICBkZWxldGUgdGhpcy5pbnZhbGlkO1xuICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KHRoaXMuaW52YWxpZClcblxuICAgIHJldHVybiB0aGlzLnN0cmlwZS5jcmVhdGVTb3VyY2UoXG4gICAgICB0aGlzLmVsZW1lbnRzLCBleHRyYURhdGFcbiAgICApXG4gICAgLnRoZW4oKHJlc3VsdDphbnkpPT50aGlzLnByb2Nlc3NTb3VyY2VSZXN1bHQocmVzdWx0KSlcbiAgfVxuXG4gIHByb2Nlc3NTb3VyY2VSZXN1bHQocmVzdWx0OiBTb3VyY2VSZXNwb25zZSk6IFNvdXJjZSB8IHZvaWQge1xuICAgIGlmKHJlc3VsdC5lcnJvcil7XG4gICAgICBjb25zdCByRXJyb3IgPSByZXN1bHQuZXJyb3JcbiAgICAgIGlmKCAockVycm9yIGFzIGFueSkudHlwZSA9PT0gXCJ2YWxpZGF0aW9uX2Vycm9yXCIgKXtcbiAgICAgICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQoIHRoaXMuaW52YWxpZCA9IHJFcnJvciApXG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5jYXRjaGVyLmVtaXQockVycm9yKTtcbiAgICAgICAgdGhyb3cgckVycm9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZSA9IHJlc3VsdC5zb3VyY2U7XG5cbiAgICBpZiAoc291cmNlKSB7XG4gICAgICB0aGlzLnNvdXJjZUNoYW5nZS5lbWl0KHRoaXMuc291cmNlPXNvdXJjZSk7XG4gICAgICByZXR1cm4gc291cmNlO1xuICAgIH1cbiAgfVxufVxuIl19