import { __decorate } from "tslib";
import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeComponent } from "./StripeComponent";
import { StripeScriptTag } from "../StripeScriptTag";
let StripeBank = class StripeBank extends StripeComponent {
    constructor(StripeScriptTag) {
        super(StripeScriptTag);
        this.StripeScriptTag = StripeScriptTag;
        this.tokenChange = new EventEmitter();
    }
    createToken(data) {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createToken('bank_account', data)
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
StripeBank.ctorParameters = () => [
    { type: StripeScriptTag }
];
__decorate([
    Input()
], StripeBank.prototype, "options", void 0);
__decorate([
    Input()
], StripeBank.prototype, "token", void 0);
__decorate([
    Output()
], StripeBank.prototype, "tokenChange", void 0);
StripeBank = __decorate([
    Component({
        selector: "stripe-bank",
        template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
        exportAs: "StripeBank"
    })
], StripeBank);
export { StripeBank };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQmFuay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdHJpcGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQ3ZDLE1BQU0sZUFBZSxDQUFBO0FBRXRCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUVuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFtQmpELElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxlQUFlO0lBTWhELFlBQ1MsZUFBK0I7UUFFdEMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBRmYsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBSDlCLGdCQUFXLEdBQTZCLElBQUksWUFBWSxFQUFFLENBQUE7SUFNcEUsQ0FBQztJQUVELFdBQVcsQ0FBRSxJQUFTO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDO2FBQ25ELElBQUksQ0FBQyxDQUFDLE1BQVUsRUFBQyxFQUFFO1lBQ2xCLElBQUcsTUFBTSxDQUFDLEtBQUssRUFBQztnQkFDZCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLGtCQUFrQixFQUFFO29CQUN6QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBQTtpQkFDckQ7cUJBQUk7b0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUMvQixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUE7aUJBQ25CO2FBQ0Y7aUJBQUk7Z0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzlDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQTthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUE7O1lBeEIwQixlQUFlOztBQU4vQjtJQUFSLEtBQUssRUFBRTsyQ0FBMkI7QUFFMUI7SUFBUixLQUFLLEVBQUU7eUNBQW1CO0FBQ2pCO0lBQVQsTUFBTSxFQUFFOytDQUEyRDtBQUp0RCxVQUFVO0lBUnpCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFFBQVEsRUFBRTs7OztHQUlUO1FBQ0QsUUFBUSxFQUFDLFlBQVk7S0FDdEIsQ0FBQztHQUFjLFVBQVUsQ0ErQnpCO1NBL0JlLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXG5pbXBvcnQgeyBTdHJpcGVDYXJkT3B0aW9ucyB9IGZyb20gXCIuLi9TdHJpcGVUeXBlc1wiXG5pbXBvcnQgeyBTdHJpcGVDb21wb25lbnQgfSBmcm9tIFwiLi9TdHJpcGVDb21wb25lbnRcIlxuaW1wb3J0IHsgU3RyaXBlVG9rZW4gfSBmcm9tIFwiLi4vU3RyaXBlVHlwZXNcIlxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4uL1N0cmlwZVNjcmlwdFRhZ1wiXG5cbmV4cG9ydCBpbnRlcmZhY2UgYmFua19hY2NvdW50e1xuICBjb3VudHJ5ICAgICAgICAgICAgIDogc3RyaW5nXG4gIGN1cnJlbmN5ICAgICAgICAgICAgOiBzdHJpbmdcbiAgcm91dGluZ19udW1iZXIgICAgICA6IHN0cmluZ1xuICBhY2NvdW50X251bWJlciAgICAgIDogc3RyaW5nXG4gIGFjY291bnRfaG9sZGVyX25hbWUgOiBzdHJpbmdcbiAgYWNjb3VudF9ob2xkZXJfdHlwZSA6IHN0cmluZ1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwic3RyaXBlLWJhbmtcIixcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhU3RyaXBlU2NyaXB0VGFnLlN0cmlwZUluc3RhbmNlXCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImNvbG9yOnJlZDtcIj5TdHJpcGUgUHVibGlzaGFibGVLZXkgTk9UIFNFVC4gVXNlIG1ldGhvZCBTdHJpcGVTY3JpcHRUYWcuc2V0UHVibGlzaGFibGVLZXkoKTwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGV4cG9ydEFzOlwiU3RyaXBlQmFua1wiXG59KSBleHBvcnQgY2xhc3MgU3RyaXBlQmFuayBleHRlbmRzIFN0cmlwZUNvbXBvbmVudHtcbiAgQElucHV0KCkgb3B0aW9ucyE6U3RyaXBlQ2FyZE9wdGlvbnMvL3Zlcnkgc2ltaWxhciB0eXBlIHRvIGNhcmQgb3B0aW9uc1xuXG4gIEBJbnB1dCgpIHRva2VuITpTdHJpcGVUb2tlblxuICBAT3V0cHV0KCkgdG9rZW5DaGFuZ2U6RXZlbnRFbWl0dGVyPFN0cmlwZVRva2VuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBTdHJpcGVTY3JpcHRUYWc6U3RyaXBlU2NyaXB0VGFnXG4gICl7XG4gICAgc3VwZXIoU3RyaXBlU2NyaXB0VGFnKVxuICB9XG5cbiAgY3JlYXRlVG9rZW4oIGRhdGE/OmFueSApOlByb21pc2U8U3RyaXBlVG9rZW4+e1xuICAgIGRlbGV0ZSB0aGlzLmludmFsaWRcbiAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWQpXG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcGUuY3JlYXRlVG9rZW4oJ2JhbmtfYWNjb3VudCcsIGRhdGEpXG4gICAgLnRoZW4oKHJlc3VsdDphbnkpPT57XG4gICAgICBpZihyZXN1bHQuZXJyb3Ipe1xuICAgICAgICBpZiggcmVzdWx0LmVycm9yLnR5cGU9PVwidmFsaWRhdGlvbl9lcnJvclwiICl7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQoIHRoaXMuaW52YWxpZD1yZXN1bHQuZXJyb3IgKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmNhdGNoZXIuZW1pdChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yXG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnRva2VuQ2hhbmdlLmVtaXQodGhpcy50b2tlbj1yZXN1bHQudG9rZW4pXG4gICAgICAgIHJldHVybiByZXN1bHQudG9rZW5cbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=