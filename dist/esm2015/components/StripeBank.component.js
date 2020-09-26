import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeComponent } from "./StripeComponent";
import { StripeScriptTag } from "../StripeScriptTag";
export class StripeBank extends StripeComponent {
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
}
StripeBank.decorators = [
    { type: Component, args: [{
                selector: "stripe-bank",
                template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                exportAs: "StripeBank"
            },] }
];
StripeBank.ctorParameters = () => [
    { type: StripeScriptTag }
];
StripeBank.propDecorators = {
    options: [{ type: Input }],
    token: [{ type: Input }],
    tokenChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQmFuay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Fja2VyYXBwbGUvUHJvamVjdHMvd2ViL2FuZ3VsYXIvc3RyaXBlLWFuZ3VsYXIvbWFzdGVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDdkMsTUFBTSxlQUFlLENBQUE7QUFFdEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBRW5ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQW1CakQsTUFBTSxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBTWhELFlBQ1MsZUFBK0I7UUFFdEMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBRmYsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBSDlCLGdCQUFXLEdBQTZCLElBQUksWUFBWSxFQUFFLENBQUE7SUFNcEUsQ0FBQztJQUVELFdBQVcsQ0FBRSxJQUFTO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDO2FBQ25ELElBQUksQ0FBQyxDQUFDLE1BQVUsRUFBQyxFQUFFO1lBQ2xCLElBQUcsTUFBTSxDQUFDLEtBQUssRUFBQztnQkFDZCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLGtCQUFrQixFQUFFO29CQUN6QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBQTtpQkFDckQ7cUJBQUk7b0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUMvQixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUE7aUJBQ25CO2FBQ0Y7aUJBQUk7Z0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzlDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQTthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7O1lBdENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsUUFBUSxFQUFDLFlBQVk7YUFDdEI7OztZQW5CUSxlQUFlOzs7c0JBb0JyQixLQUFLO29CQUVMLEtBQUs7MEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50XG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7IFN0cmlwZUNhcmRPcHRpb25zIH0gZnJvbSBcIi4uL1N0cmlwZVR5cGVzXCJcbmltcG9ydCB7IFN0cmlwZUNvbXBvbmVudCB9IGZyb20gXCIuL1N0cmlwZUNvbXBvbmVudFwiXG5pbXBvcnQgeyBTdHJpcGVUb2tlbiB9IGZyb20gXCIuLi9TdHJpcGVUeXBlc1wiXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi4vU3RyaXBlU2NyaXB0VGFnXCJcblxuZXhwb3J0IGludGVyZmFjZSBiYW5rX2FjY291bnR7XG4gIGNvdW50cnkgICAgICAgICAgICAgOiBzdHJpbmdcbiAgY3VycmVuY3kgICAgICAgICAgICA6IHN0cmluZ1xuICByb3V0aW5nX251bWJlciAgICAgIDogc3RyaW5nXG4gIGFjY291bnRfbnVtYmVyICAgICAgOiBzdHJpbmdcbiAgYWNjb3VudF9ob2xkZXJfbmFtZSA6IHN0cmluZ1xuICBhY2NvdW50X2hvbGRlcl90eXBlIDogc3RyaW5nXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzdHJpcGUtYmFua1wiLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTdHJpcGVTY3JpcHRUYWcuU3RyaXBlSW5zdGFuY2VcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiY29sb3I6cmVkO1wiPlN0cmlwZSBQdWJsaXNoYWJsZUtleSBOT1QgU0VULiBVc2UgbWV0aG9kIFN0cmlwZVNjcmlwdFRhZy5zZXRQdWJsaXNoYWJsZUtleSgpPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZXhwb3J0QXM6XCJTdHJpcGVCYW5rXCJcbn0pIGV4cG9ydCBjbGFzcyBTdHJpcGVCYW5rIGV4dGVuZHMgU3RyaXBlQ29tcG9uZW50e1xuICBASW5wdXQoKSBvcHRpb25zITpTdHJpcGVDYXJkT3B0aW9ucy8vdmVyeSBzaW1pbGFyIHR5cGUgdG8gY2FyZCBvcHRpb25zXG5cbiAgQElucHV0KCkgdG9rZW4hOlN0cmlwZVRva2VuXG4gIEBPdXRwdXQoKSB0b2tlbkNoYW5nZTpFdmVudEVtaXR0ZXI8U3RyaXBlVG9rZW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIFN0cmlwZVNjcmlwdFRhZzpTdHJpcGVTY3JpcHRUYWdcbiAgKXtcbiAgICBzdXBlcihTdHJpcGVTY3JpcHRUYWcpXG4gIH1cblxuICBjcmVhdGVUb2tlbiggZGF0YT86YW55ICk6UHJvbWlzZTxTdHJpcGVUb2tlbj57XG4gICAgZGVsZXRlIHRoaXMuaW52YWxpZFxuICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KHRoaXMuaW52YWxpZClcblxuICAgIHJldHVybiB0aGlzLnN0cmlwZS5jcmVhdGVUb2tlbignYmFua19hY2NvdW50JywgZGF0YSlcbiAgICAudGhlbigocmVzdWx0OmFueSk9PntcbiAgICAgIGlmKHJlc3VsdC5lcnJvcil7XG4gICAgICAgIGlmKCByZXN1bHQuZXJyb3IudHlwZT09XCJ2YWxpZGF0aW9uX2Vycm9yXCIgKXtcbiAgICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJlc3VsdC5lcnJvcilcbiAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3JcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMudG9rZW5DaGFuZ2UuZW1pdCh0aGlzLnRva2VuPXJlc3VsdC50b2tlbilcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50b2tlblxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==