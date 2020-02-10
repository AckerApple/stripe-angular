import { __decorate, __extends } from "tslib";
import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeComponent } from "./StripeComponent";
import { StripeScriptTag } from "../StripeScriptTag";
var StripeBank = /** @class */ (function (_super) {
    __extends(StripeBank, _super);
    function StripeBank(StripeScriptTag) {
        var _this = _super.call(this, StripeScriptTag) || this;
        _this.StripeScriptTag = StripeScriptTag;
        _this.tokenChange = new EventEmitter();
        return _this;
    }
    StripeBank.prototype.createToken = function (data) {
        var _this = this;
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createToken('bank_account', data)
            .then(function (result) {
            if (result.error) {
                if (result.error.type == "validation_error") {
                    _this.invalidChange.emit(_this.invalid = result.error);
                }
                else {
                    _this.catcher.emit(result.error);
                    throw result.error;
                }
            }
            else {
                _this.tokenChange.emit(_this.token = result.token);
                return result.token;
            }
        });
    };
    StripeBank.ctorParameters = function () { return [
        { type: StripeScriptTag }
    ]; };
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
            template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
            exportAs: "StripeBank"
        })
    ], StripeBank);
    return StripeBank;
}(StripeComponent));
export { StripeBank };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQmFuay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdHJpcGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQ3ZDLE1BQU0sZUFBZSxDQUFBO0FBRXRCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUVuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFtQmpEO0lBQWdDLDhCQUFlO0lBTWhELG9CQUNTLGVBQStCO1FBRHhDLFlBR0Usa0JBQU0sZUFBZSxDQUFDLFNBQ3ZCO1FBSFEscUJBQWUsR0FBZixlQUFlLENBQWdCO1FBSDlCLGlCQUFXLEdBQTZCLElBQUksWUFBWSxFQUFFLENBQUE7O0lBTXBFLENBQUM7SUFFRCxnQ0FBVyxHQUFYLFVBQWEsSUFBUztRQUF0QixpQkFrQkM7UUFqQkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUVyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUM7YUFDbkQsSUFBSSxDQUFDLFVBQUMsTUFBVTtZQUNmLElBQUcsTUFBTSxDQUFDLEtBQUssRUFBQztnQkFDZCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLGtCQUFrQixFQUFFO29CQUN6QyxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxLQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBQTtpQkFDckQ7cUJBQUk7b0JBQ0gsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUMvQixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUE7aUJBQ25CO2FBQ0Y7aUJBQUk7Z0JBQ0gsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzlDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQTthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7Z0JBdkJ3QixlQUFlOztJQU4vQjtRQUFSLEtBQUssRUFBRTsrQ0FBMkI7SUFFMUI7UUFBUixLQUFLLEVBQUU7NkNBQW1CO0lBQ2pCO1FBQVQsTUFBTSxFQUFFO21EQUEyRDtJQUp0RCxVQUFVO1FBUnpCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxzTkFJVDtZQUNELFFBQVEsRUFBQyxZQUFZO1NBQ3RCLENBQUM7T0FBYyxVQUFVLENBK0J6QjtJQUFELGlCQUFDO0NBQUEsQUEvQkUsQ0FBZ0MsZUFBZSxHQStCakQ7U0EvQmUsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50XG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7IFN0cmlwZUNhcmRPcHRpb25zIH0gZnJvbSBcIi4uL1N0cmlwZVR5cGVzXCJcbmltcG9ydCB7IFN0cmlwZUNvbXBvbmVudCB9IGZyb20gXCIuL1N0cmlwZUNvbXBvbmVudFwiXG5pbXBvcnQgeyBTdHJpcGVUb2tlbiB9IGZyb20gXCIuLi9TdHJpcGVUeXBlc1wiXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi4vU3RyaXBlU2NyaXB0VGFnXCJcblxuZXhwb3J0IGludGVyZmFjZSBiYW5rX2FjY291bnR7XG4gIGNvdW50cnkgICAgICAgICAgICAgOiBzdHJpbmdcbiAgY3VycmVuY3kgICAgICAgICAgICA6IHN0cmluZ1xuICByb3V0aW5nX251bWJlciAgICAgIDogc3RyaW5nXG4gIGFjY291bnRfbnVtYmVyICAgICAgOiBzdHJpbmdcbiAgYWNjb3VudF9ob2xkZXJfbmFtZSA6IHN0cmluZ1xuICBhY2NvdW50X2hvbGRlcl90eXBlIDogc3RyaW5nXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzdHJpcGUtYmFua1wiLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTdHJpcGVTY3JpcHRUYWcuU3RyaXBlSW5zdGFuY2VcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiY29sb3I6cmVkO1wiPlN0cmlwZSBQdWJsaXNoYWJsZUtleSBOT1QgU0VULiBVc2UgbWV0aG9kIFN0cmlwZVNjcmlwdFRhZy5zZXRQdWJsaXNoYWJsZUtleSgpPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZXhwb3J0QXM6XCJTdHJpcGVCYW5rXCJcbn0pIGV4cG9ydCBjbGFzcyBTdHJpcGVCYW5rIGV4dGVuZHMgU3RyaXBlQ29tcG9uZW50e1xuICBASW5wdXQoKSBvcHRpb25zITpTdHJpcGVDYXJkT3B0aW9ucy8vdmVyeSBzaW1pbGFyIHR5cGUgdG8gY2FyZCBvcHRpb25zXG5cbiAgQElucHV0KCkgdG9rZW4hOlN0cmlwZVRva2VuXG4gIEBPdXRwdXQoKSB0b2tlbkNoYW5nZTpFdmVudEVtaXR0ZXI8U3RyaXBlVG9rZW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIFN0cmlwZVNjcmlwdFRhZzpTdHJpcGVTY3JpcHRUYWdcbiAgKXtcbiAgICBzdXBlcihTdHJpcGVTY3JpcHRUYWcpXG4gIH1cblxuICBjcmVhdGVUb2tlbiggZGF0YT86YW55ICk6UHJvbWlzZTxTdHJpcGVUb2tlbj57XG4gICAgZGVsZXRlIHRoaXMuaW52YWxpZFxuICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KHRoaXMuaW52YWxpZClcblxuICAgIHJldHVybiB0aGlzLnN0cmlwZS5jcmVhdGVUb2tlbignYmFua19hY2NvdW50JywgZGF0YSlcbiAgICAudGhlbigocmVzdWx0OmFueSk9PntcbiAgICAgIGlmKHJlc3VsdC5lcnJvcil7XG4gICAgICAgIGlmKCByZXN1bHQuZXJyb3IudHlwZT09XCJ2YWxpZGF0aW9uX2Vycm9yXCIgKXtcbiAgICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJlc3VsdC5lcnJvcilcbiAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3JcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMudG9rZW5DaGFuZ2UuZW1pdCh0aGlzLnRva2VuPXJlc3VsdC50b2tlbilcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50b2tlblxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==