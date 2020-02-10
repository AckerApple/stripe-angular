import { __decorate } from "tslib";
import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeComponent } from "./StripeComponent";
let StripeSource = class StripeSource extends StripeComponent {
    constructor(StripeScriptTag) {
        super(StripeScriptTag);
        this.StripeScriptTag = StripeScriptTag;
        this.sourceChange = new EventEmitter();
    }
    createSource() {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createSource(this.elements)
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
                this.sourceChange.emit(this.source = result.source);
                return result.source;
            }
        });
    }
};
StripeSource.ctorParameters = () => [
    { type: StripeScriptTag }
];
__decorate([
    Input()
], StripeSource.prototype, "source", void 0);
__decorate([
    Output()
], StripeSource.prototype, "sourceChange", void 0);
StripeSource = __decorate([
    Component({
        selector: "stripe-source",
        template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
        exportAs: "StripeSource"
    })
], StripeSource);
export { StripeSource };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlU291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0cmlwZS1hbmd1bGFyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TdHJpcGVTb3VyY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUN2QyxNQUFNLGVBQWUsQ0FBQTtBQUl0QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBVWhELElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxlQUFlO0lBT2xELFlBQ1MsZUFBK0I7UUFFdEMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBRmYsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBTDlCLGlCQUFZLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUE7SUFRMUUsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQzdCLElBQUksQ0FBQyxRQUFRLENBQ2Q7YUFDQSxJQUFJLENBQUMsQ0FBQyxNQUFVLEVBQUMsRUFBRTtZQUNsQixJQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUM7Z0JBQ2QsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksSUFBRSxrQkFBa0IsRUFBRTtvQkFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLE9BQU8sR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLENBQUE7aUJBQ3JEO3FCQUFJO29CQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDL0IsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFBO2lCQUNuQjthQUNGO2lCQUFJO2dCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNqRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUE7YUFDckI7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBOztZQTFCMEIsZUFBZTs7QUFOL0I7SUFBUixLQUFLLEVBQUU7NENBQXlCO0FBQ3ZCO0lBQVQsTUFBTSxFQUFFO2tEQUFpRTtBQUg1RCxZQUFZO0lBUjNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVEsRUFBRTs7OztHQUlUO1FBQ0QsUUFBUSxFQUFDLGNBQWM7S0FDeEIsQ0FBQztHQUFjLFlBQVksQ0FrQzNCO1NBbENlLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXG5pbXBvcnQge1xuICBTdHJpcGVUb2tlbiwgU3RyaXBlU291cmNlIGFzIFN0cmlwZVNvdXJjZVR5cGVcbn0gZnJvbSBcIi4uL1N0cmlwZVR5cGVzXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuaW1wb3J0IHsgU3RyaXBlQ29tcG9uZW50IH0gZnJvbSBcIi4vU3RyaXBlQ29tcG9uZW50XCJcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInN0cmlwZS1zb3VyY2VcIixcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhU3RyaXBlU2NyaXB0VGFnLlN0cmlwZUluc3RhbmNlXCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImNvbG9yOnJlZDtcIj5TdHJpcGUgUHVibGlzaGFibGVLZXkgTk9UIFNFVC4gVXNlIG1ldGhvZCBTdHJpcGVTY3JpcHRUYWcuc2V0UHVibGlzaGFibGVLZXkoKTwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGV4cG9ydEFzOlwiU3RyaXBlU291cmNlXCJcbn0pIGV4cG9ydCBjbGFzcyBTdHJpcGVTb3VyY2UgZXh0ZW5kcyBTdHJpcGVDb21wb25lbnR7XG5cbiAgQElucHV0KCkgc291cmNlITpTdHJpcGVTb3VyY2VUeXBlXG4gIEBPdXRwdXQoKSBzb3VyY2VDaGFuZ2U6RXZlbnRFbWl0dGVyPFN0cmlwZVNvdXJjZVR5cGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgZWxlbWVudHM6YW55XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIFN0cmlwZVNjcmlwdFRhZzpTdHJpcGVTY3JpcHRUYWdcbiAgKXtcbiAgICBzdXBlcihTdHJpcGVTY3JpcHRUYWcpXG4gIH1cblxuICBjcmVhdGVTb3VyY2UoKTpQcm9taXNlPFN0cmlwZVRva2VuPntcbiAgICBkZWxldGUgdGhpcy5pbnZhbGlkXG4gICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQodGhpcy5pbnZhbGlkKVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXBlLmNyZWF0ZVNvdXJjZShcbiAgICAgIHRoaXMuZWxlbWVudHNcbiAgICApXG4gICAgLnRoZW4oKHJlc3VsdDphbnkpPT57XG4gICAgICBpZihyZXN1bHQuZXJyb3Ipe1xuICAgICAgICBpZiggcmVzdWx0LmVycm9yLnR5cGU9PVwidmFsaWRhdGlvbl9lcnJvclwiICl7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQoIHRoaXMuaW52YWxpZD1yZXN1bHQuZXJyb3IgKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmNhdGNoZXIuZW1pdChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yXG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnNvdXJjZUNoYW5nZS5lbWl0KHRoaXMuc291cmNlPXJlc3VsdC5zb3VyY2UpXG4gICAgICAgIHJldHVybiByZXN1bHQuc291cmNlXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19