import { __decorate } from "tslib";
import { Input, Output, EventEmitter } from "@angular/core";
export class StripeComponent {
    constructor(StripeScriptTag) {
        this.StripeScriptTag = StripeScriptTag;
        this.catcher = new EventEmitter();
        this.invalidChange = new EventEmitter();
    }
    ngOnInit() {
        this.init();
    }
    init() {
        return this.StripeScriptTag.promiseInstance()
            .then(i => this.stripe = i);
    }
}
__decorate([
    Output("catch")
], StripeComponent.prototype, "catcher", void 0);
__decorate([
    Input()
], StripeComponent.prototype, "invalid", void 0);
__decorate([
    Output()
], StripeComponent.prototype, "invalidChange", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc3RyaXBlLWFuZ3VsYXIvIiwic291cmNlcyI6WyJjb21wb25lbnRzL1N0cmlwZUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM1QixNQUFNLGVBQWUsQ0FBQTtBQU10QixNQUFNLE9BQU8sZUFBZTtJQVExQixZQUNTLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQVJ2QixZQUFPLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUE7UUFHdkQsa0JBQWEsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQU05RCxDQUFDO0lBRUgsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFFRCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTthQUM1QyxJQUFJLENBQUUsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBRSxDQUFBO0lBQzNCLENBQUM7Q0FDRjtBQW5Ca0I7SUFBaEIsTUFBTSxDQUFDLE9BQU8sQ0FBQztnREFBaUQ7QUFFeEQ7SUFBUixLQUFLLEVBQUU7Z0RBQWU7QUFDYjtJQUFULE1BQU0sRUFBRTtzREFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHtcbiAgU3RyaXBlSW5zdGFuY2Vcbn0gZnJvbSBcIi4uL1N0cmlwZVR5cGVzXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuXG5leHBvcnQgY2xhc3MgU3RyaXBlQ29tcG9uZW50e1xuICBAT3V0cHV0KFwiY2F0Y2hcIikgY2F0Y2hlcjpFdmVudEVtaXR0ZXI8RXJyb3I+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgQElucHV0KCkgaW52YWxpZCE6RXJyb3JcbiAgQE91dHB1dCgpIGludmFsaWRDaGFuZ2U6RXZlbnRFbWl0dGVyPEVycm9yPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHN0cmlwZSE6U3RyaXBlSW5zdGFuY2VcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe31cblxuICBuZ09uSW5pdCgpe1xuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0KCk6UHJvbWlzZTxTdHJpcGVJbnN0YW5jZT57XG4gICAgcmV0dXJuIHRoaXMuU3RyaXBlU2NyaXB0VGFnLnByb21pc2VJbnN0YW5jZSgpXG4gICAgLnRoZW4oIGk9PnRoaXMuc3RyaXBlPWkgKVxuICB9XG59Il19