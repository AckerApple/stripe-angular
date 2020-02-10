import { __decorate } from "tslib";
import { Input, Output, EventEmitter } from "@angular/core";
var StripeComponent = /** @class */ (function () {
    function StripeComponent(StripeScriptTag) {
        this.StripeScriptTag = StripeScriptTag;
        this.catcher = new EventEmitter();
        this.invalidChange = new EventEmitter();
    }
    StripeComponent.prototype.ngOnInit = function () {
        this.init();
    };
    StripeComponent.prototype.init = function () {
        var _this = this;
        return this.StripeScriptTag.promiseInstance()
            .then(function (i) { return _this.stripe = i; });
    };
    __decorate([
        Output("catch")
    ], StripeComponent.prototype, "catcher", void 0);
    __decorate([
        Input()
    ], StripeComponent.prototype, "invalid", void 0);
    __decorate([
        Output()
    ], StripeComponent.prototype, "invalidChange", void 0);
    return StripeComponent;
}());
export { StripeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc3RyaXBlLWFuZ3VsYXIvIiwic291cmNlcyI6WyJjb21wb25lbnRzL1N0cmlwZUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM1QixNQUFNLGVBQWUsQ0FBQTtBQU10QjtJQVFFLHlCQUNTLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQVJ2QixZQUFPLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUE7UUFHdkQsa0JBQWEsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQU05RCxDQUFDO0lBRUgsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFFRCw4QkFBSSxHQUFKO1FBQUEsaUJBR0M7UUFGQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFO2FBQzVDLElBQUksQ0FBRSxVQUFBLENBQUMsSUFBRSxPQUFBLEtBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFiLENBQWEsQ0FBRSxDQUFBO0lBQzNCLENBQUM7SUFsQmdCO1FBQWhCLE1BQU0sQ0FBQyxPQUFPLENBQUM7b0RBQWlEO0lBRXhEO1FBQVIsS0FBSyxFQUFFO29EQUFlO0lBQ2I7UUFBVCxNQUFNLEVBQUU7MERBQXVEO0lBZ0JsRSxzQkFBQztDQUFBLEFBcEJELElBb0JDO1NBcEJZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHtcbiAgU3RyaXBlSW5zdGFuY2Vcbn0gZnJvbSBcIi4uL1N0cmlwZVR5cGVzXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuXG5leHBvcnQgY2xhc3MgU3RyaXBlQ29tcG9uZW50e1xuICBAT3V0cHV0KFwiY2F0Y2hcIikgY2F0Y2hlcjpFdmVudEVtaXR0ZXI8RXJyb3I+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgQElucHV0KCkgaW52YWxpZCE6RXJyb3JcbiAgQE91dHB1dCgpIGludmFsaWRDaGFuZ2U6RXZlbnRFbWl0dGVyPEVycm9yPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHN0cmlwZSE6U3RyaXBlSW5zdGFuY2VcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe31cblxuICBuZ09uSW5pdCgpe1xuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0KCk6UHJvbWlzZTxTdHJpcGVJbnN0YW5jZT57XG4gICAgcmV0dXJuIHRoaXMuU3RyaXBlU2NyaXB0VGFnLnByb21pc2VJbnN0YW5jZSgpXG4gICAgLnRoZW4oIGk9PnRoaXMuc3RyaXBlPWkgKVxuICB9XG59Il19