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
StripeComponent.propDecorators = {
    catcher: [{ type: Output, args: ["catch",] }],
    invalid: [{ type: Input }],
    invalidChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hY2tlcmFwcGxlL1Byb2plY3RzL3dlYi9hbmd1bGFyL3N0cmlwZS1hbmd1bGFyL21hc3Rlci9zcmMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL1N0cmlwZUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQzVCLE1BQU0sZUFBZSxDQUFBO0FBTXRCLE1BQU0sT0FBTyxlQUFlO0lBUTFCLFlBQ1MsZUFBK0I7UUFBL0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBUnZCLFlBQU8sR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUd2RCxrQkFBYSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFBO0lBTTlELENBQUM7SUFFSCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVELElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFO2FBQzVDLElBQUksQ0FBRSxDQUFDLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFFLENBQUE7SUFDM0IsQ0FBQzs7O3NCQWxCQSxNQUFNLFNBQUMsT0FBTztzQkFFZCxLQUFLOzRCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHtcbiAgU3RyaXBlSW5zdGFuY2Vcbn0gZnJvbSBcIi4uL1N0cmlwZVR5cGVzXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuXG5leHBvcnQgY2xhc3MgU3RyaXBlQ29tcG9uZW50e1xuICBAT3V0cHV0KFwiY2F0Y2hcIikgY2F0Y2hlcjpFdmVudEVtaXR0ZXI8RXJyb3I+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgQElucHV0KCkgaW52YWxpZCE6RXJyb3JcbiAgQE91dHB1dCgpIGludmFsaWRDaGFuZ2U6RXZlbnRFbWl0dGVyPEVycm9yPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHN0cmlwZSE6U3RyaXBlSW5zdGFuY2VcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe31cblxuICBuZ09uSW5pdCgpe1xuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0KCk6UHJvbWlzZTxTdHJpcGVJbnN0YW5jZT57XG4gICAgcmV0dXJuIHRoaXMuU3RyaXBlU2NyaXB0VGFnLnByb21pc2VJbnN0YW5jZSgpXG4gICAgLnRoZW4oIGk9PnRoaXMuc3RyaXBlPWkgKVxuICB9XG59Il19