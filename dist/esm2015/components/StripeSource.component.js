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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlU291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL1N0cmlwZVNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDdkMsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQVVoRCxNQUFNLE9BQU8sWUFBYSxTQUFRLGVBQWU7SUFNbEQsWUFDUyxlQUErQjtRQUV0QyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7UUFGZixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFMOUIsaUJBQVksR0FBK0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQVF2RSxDQUFDO0lBRUQsWUFBWSxDQUNWLFNBQXFEO1FBRXJELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FDN0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQ3pCO2FBQ0EsSUFBSSxDQUFDLENBQUMsTUFBVSxFQUFDLEVBQUUsQ0FBQSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsTUFBNkI7UUFDL0MsSUFBRyxNQUFNLENBQUMsS0FBSyxFQUFDO1lBQ2QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtZQUMzQixJQUFLLE1BQWMsQ0FBQyxJQUFJLEtBQUssa0JBQWtCLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFFLENBQUE7YUFDakQ7aUJBQUk7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sTUFBTSxDQUFDO2FBQ2Q7U0FDRjtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFN0IsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUFqREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxRQUFRLEVBQUMsY0FBYzthQUN4Qjs7O1lBWFEsZUFBZTs7O3FCQVlyQixLQUFLOzJCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi4vU3RyaXBlU2NyaXB0VGFnXCJcbmltcG9ydCB7IFN0cmlwZUNvbXBvbmVudCB9IGZyb20gXCIuL1N0cmlwZUNvbXBvbmVudFwiXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzdHJpcGUtc291cmNlXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVN0cmlwZVNjcmlwdFRhZy5TdHJpcGVJbnN0YW5jZVwiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJjb2xvcjpyZWQ7XCI+U3RyaXBlIFB1Ymxpc2hhYmxlS2V5IE5PVCBTRVQuIFVzZSBtZXRob2QgU3RyaXBlU2NyaXB0VGFnLnNldFB1Ymxpc2hhYmxlS2V5KCk8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBleHBvcnRBczpcIlN0cmlwZVNvdXJjZVwiXG59KSBleHBvcnQgY2xhc3MgU3RyaXBlU291cmNlIGV4dGVuZHMgU3RyaXBlQ29tcG9uZW50e1xuICBASW5wdXQoKSBzb3VyY2U/OiBzdHJpcGUuU291cmNlXG4gIEBPdXRwdXQoKSBzb3VyY2VDaGFuZ2U6RXZlbnRFbWl0dGVyPHN0cmlwZS5Tb3VyY2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgZWxlbWVudHM6YW55IC8vIEZvciBjYXJkLCBpdHMgdGhlIFVJIGVsZW1lbnRcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe1xuICAgIHN1cGVyKFN0cmlwZVNjcmlwdFRhZylcbiAgfVxuXG4gIGNyZWF0ZVNvdXJjZShcbiAgICBleHRyYURhdGE6eyBvd25lcj86IHN0cmlwZS5Pd25lckluZm8sIG1ldGFkYXRhPzogYW55fVxuICApOlByb21pc2U8c3RyaXBlLlNvdXJjZSB8IHZvaWQ+e1xuICAgIGRlbGV0ZSB0aGlzLmludmFsaWQ7XG4gICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQodGhpcy5pbnZhbGlkKVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXBlLmNyZWF0ZVNvdXJjZShcbiAgICAgIHRoaXMuZWxlbWVudHMsIGV4dHJhRGF0YVxuICAgIClcbiAgICAudGhlbigocmVzdWx0OmFueSk9PnRoaXMucHJvY2Vzc1NvdXJjZVJlc3VsdChyZXN1bHQpKVxuICB9XG5cbiAgcHJvY2Vzc1NvdXJjZVJlc3VsdChyZXN1bHQ6IHN0cmlwZS5Tb3VyY2VSZXNwb25zZSk6IHN0cmlwZS5Tb3VyY2UgfCB2b2lkIHtcbiAgICBpZihyZXN1bHQuZXJyb3Ipe1xuICAgICAgY29uc3QgckVycm9yID0gcmVzdWx0LmVycm9yXG4gICAgICBpZiggKHJFcnJvciBhcyBhbnkpLnR5cGUgPT09IFwidmFsaWRhdGlvbl9lcnJvclwiICl7XG4gICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQgPSByRXJyb3IgKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJFcnJvcik7XG4gICAgICAgIHRocm93IHJFcnJvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2UgPSByZXN1bHQuc291cmNlO1xuXG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2VDaGFuZ2UuZW1pdCh0aGlzLnNvdXJjZT1zb3VyY2UpO1xuICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==