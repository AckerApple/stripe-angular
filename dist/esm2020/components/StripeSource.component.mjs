import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeComponent } from "./StripeComponent";
import * as i0 from "@angular/core";
import * as i1 from "../StripeScriptTag";
import * as i2 from "@angular/common";
export class StripeSource extends StripeComponent {
    constructor(StripeScriptTag) {
        super(StripeScriptTag);
        this.StripeScriptTag = StripeScriptTag;
        this.sourceChange = new EventEmitter();
        this.paymentMethodChange = new EventEmitter();
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
    createPaymentMethod(extraData) {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createPaymentMethod('card', this.elements, extraData)
            .then((result) => this.processPaymentMethodResult(result));
    }
    processPaymentMethodResult(result) {
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
        const paymentMethod = result.paymentMethod;
        if (paymentMethod) {
            this.paymentMethodChange.emit(this.paymentMethod = paymentMethod);
            return paymentMethod;
        }
    }
}
StripeSource.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeSource, deps: [{ token: i1.StripeScriptTag }], target: i0.ɵɵFactoryTarget.Component });
StripeSource.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: StripeSource, selector: "stripe-source", inputs: { source: "source", paymentMethod: "paymentMethod" }, outputs: { sourceChange: "sourceChange", paymentMethodChange: "paymentMethodChange" }, exportAs: ["StripeSource"], usesInheritance: true, ngImport: i0, template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeSource, decorators: [{
            type: Component,
            args: [{
                    selector: "stripe-source",
                    template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                    exportAs: "StripeSource"
                }]
        }], ctorParameters: function () { return [{ type: i1.StripeScriptTag }]; }, propDecorators: { source: [{
                type: Input
            }], sourceChange: [{
                type: Output
            }], paymentMethod: [{
                type: Input
            }], paymentMethodChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlU291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1N0cmlwZVNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDdkMsTUFBTSxlQUFlLENBQUE7QUFFdEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFBOzs7O0FBVWhELE1BQU0sT0FBTyxZQUFhLFNBQVEsZUFBZTtJQVNsRCxZQUNTLGVBQStCO1FBRXRDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUZmLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQVI5QixpQkFBWSxHQUErQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRzdELHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBRSxDQUFBO0lBUW5HLENBQUM7SUFFRCxZQUFZLENBQ1YsU0FBcUQ7UUFFckQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUVyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FDekI7YUFDQSxJQUFJLENBQUMsQ0FBQyxNQUFVLEVBQUMsRUFBRSxDQUFBLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3ZELENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsTUFBNkI7UUFFN0IsSUFBRyxNQUFNLENBQUMsS0FBSyxFQUFDO1lBQ2QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtZQUMzQixJQUFLLE1BQWMsQ0FBQyxJQUFJLEtBQUssa0JBQWtCLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFFLENBQUE7YUFDakQ7aUJBQUk7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sTUFBTSxDQUFDO2FBQ2Q7U0FDRjtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFN0IsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsbUJBQW1CLENBQ2pCLFNBQXFEO1FBRXJELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUNwQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQ2pDO2FBQ0EsSUFBSSxDQUFDLENBQUMsTUFBVSxFQUFDLEVBQUUsQ0FBQSxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBRUQsMEJBQTBCLENBQ3hCLE1BQW9DO1FBRXBDLElBQUcsTUFBTSxDQUFDLEtBQUssRUFBQztZQUNkLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7WUFDM0IsSUFBSyxNQUFjLENBQUMsSUFBSSxLQUFLLGtCQUFrQixFQUFFO2dCQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBRSxDQUFBO2FBQ2pEO2lCQUFJO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQixNQUFNLE1BQU0sQ0FBQzthQUNkO1NBQ0Y7UUFFRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBRTNDLElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBQyxhQUFhLENBQUMsQ0FBQztZQUNoRSxPQUFPLGFBQWEsQ0FBQztTQUN0QjtJQUNILENBQUM7OzBHQS9FYSxZQUFZOzhGQUFaLFlBQVksNlBBTmhCOzs7O0dBSVQ7NEZBRWEsWUFBWTtrQkFSM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFOzs7O0dBSVQ7b0JBQ0QsUUFBUSxFQUFDLGNBQWM7aUJBQ3hCO3NHQUNVLE1BQU07c0JBQWQsS0FBSztnQkFDSSxZQUFZO3NCQUFyQixNQUFNO2dCQUVFLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0ksbUJBQW1CO3NCQUE1QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb21wb25lbnRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4uL1N0cmlwZVNjcmlwdFRhZ1wiXG5pbXBvcnQgeyBTdHJpcGVDb21wb25lbnQgfSBmcm9tIFwiLi9TdHJpcGVDb21wb25lbnRcIlxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwic3RyaXBlLXNvdXJjZVwiLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTdHJpcGVTY3JpcHRUYWcuU3RyaXBlSW5zdGFuY2VcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiY29sb3I6cmVkO1wiPlN0cmlwZSBQdWJsaXNoYWJsZUtleSBOT1QgU0VULiBVc2UgbWV0aG9kIFN0cmlwZVNjcmlwdFRhZy5zZXRQdWJsaXNoYWJsZUtleSgpPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZXhwb3J0QXM6XCJTdHJpcGVTb3VyY2VcIlxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZVNvdXJjZSBleHRlbmRzIFN0cmlwZUNvbXBvbmVudHtcbiAgQElucHV0KCkgc291cmNlPzogc3RyaXBlLlNvdXJjZVxuICBAT3V0cHV0KCkgc291cmNlQ2hhbmdlOkV2ZW50RW1pdHRlcjxzdHJpcGUuU291cmNlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBJbnB1dCgpIHBheW1lbnRNZXRob2Q/OiBzdHJpcGUucGF5bWVudE1ldGhvZC5QYXltZW50TWV0aG9kXG4gIEBPdXRwdXQoKSBwYXltZW50TWV0aG9kQ2hhbmdlOkV2ZW50RW1pdHRlcjxzdHJpcGUucGF5bWVudE1ldGhvZC5QYXltZW50TWV0aG9kPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGVsZW1lbnRzOiBhbnkgLy8gRm9yIGNhcmQsIGl0cyB0aGUgVUkgZWxlbWVudFxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBTdHJpcGVTY3JpcHRUYWc6U3RyaXBlU2NyaXB0VGFnXG4gICl7XG4gICAgc3VwZXIoU3RyaXBlU2NyaXB0VGFnKVxuICB9XG5cbiAgY3JlYXRlU291cmNlKFxuICAgIGV4dHJhRGF0YTp7IG93bmVyPzogc3RyaXBlLk93bmVySW5mbywgbWV0YWRhdGE/OiBhbnl9XG4gICk6UHJvbWlzZTxzdHJpcGUuU291cmNlIHwgdm9pZD57XG4gICAgZGVsZXRlIHRoaXMuaW52YWxpZDtcbiAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWQpXG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcGUuY3JlYXRlU291cmNlKFxuICAgICAgdGhpcy5lbGVtZW50cywgZXh0cmFEYXRhXG4gICAgKVxuICAgIC50aGVuKChyZXN1bHQ6YW55KT0+dGhpcy5wcm9jZXNzU291cmNlUmVzdWx0KHJlc3VsdCkpXG4gIH1cblxuICBwcm9jZXNzU291cmNlUmVzdWx0KFxuICAgIHJlc3VsdDogc3RyaXBlLlNvdXJjZVJlc3BvbnNlXG4gICk6IHN0cmlwZS5Tb3VyY2UgfCB2b2lkIHtcbiAgICBpZihyZXN1bHQuZXJyb3Ipe1xuICAgICAgY29uc3QgckVycm9yID0gcmVzdWx0LmVycm9yXG4gICAgICBpZiggKHJFcnJvciBhcyBhbnkpLnR5cGUgPT09IFwidmFsaWRhdGlvbl9lcnJvclwiICl7XG4gICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQgPSByRXJyb3IgKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJFcnJvcik7XG4gICAgICAgIHRocm93IHJFcnJvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2UgPSByZXN1bHQuc291cmNlO1xuXG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2VDaGFuZ2UuZW1pdCh0aGlzLnNvdXJjZT1zb3VyY2UpO1xuICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVQYXltZW50TWV0aG9kKFxuICAgIGV4dHJhRGF0YTp7IG93bmVyPzogc3RyaXBlLk93bmVySW5mbywgbWV0YWRhdGE/OiBhbnl9XG4gICk6UHJvbWlzZTxzdHJpcGUucGF5bWVudE1ldGhvZC5QYXltZW50TWV0aG9kIHwgdm9pZD57XG4gICAgZGVsZXRlIHRoaXMuaW52YWxpZDtcbiAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWQpXG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcGUuY3JlYXRlUGF5bWVudE1ldGhvZChcbiAgICAgICdjYXJkJywgdGhpcy5lbGVtZW50cywgZXh0cmFEYXRhXG4gICAgKVxuICAgIC50aGVuKChyZXN1bHQ6YW55KT0+dGhpcy5wcm9jZXNzUGF5bWVudE1ldGhvZFJlc3VsdChyZXN1bHQpKVxuICB9XG5cbiAgcHJvY2Vzc1BheW1lbnRNZXRob2RSZXN1bHQoXG4gICAgcmVzdWx0OiBzdHJpcGUuUGF5bWVudE1ldGhvZFJlc3BvbnNlXG4gICk6IHN0cmlwZS5wYXltZW50TWV0aG9kLlBheW1lbnRNZXRob2QgfCB2b2lkIHtcbiAgICBpZihyZXN1bHQuZXJyb3Ipe1xuICAgICAgY29uc3QgckVycm9yID0gcmVzdWx0LmVycm9yXG4gICAgICBpZiggKHJFcnJvciBhcyBhbnkpLnR5cGUgPT09IFwidmFsaWRhdGlvbl9lcnJvclwiICl7XG4gICAgICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KCB0aGlzLmludmFsaWQgPSByRXJyb3IgKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJFcnJvcik7XG4gICAgICAgIHRocm93IHJFcnJvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwYXltZW50TWV0aG9kID0gcmVzdWx0LnBheW1lbnRNZXRob2Q7XG5cbiAgICBpZiAocGF5bWVudE1ldGhvZCkge1xuICAgICAgdGhpcy5wYXltZW50TWV0aG9kQ2hhbmdlLmVtaXQodGhpcy5wYXltZW50TWV0aG9kPXBheW1lbnRNZXRob2QpO1xuICAgICAgcmV0dXJuIHBheW1lbnRNZXRob2Q7XG4gICAgfVxuICB9XG59XG4iXX0=