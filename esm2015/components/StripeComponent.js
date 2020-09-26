import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
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
StripeComponent.decorators = [
    { type: Component, args: [{
                selector: "stripe-component", template: ``
            },] }
];
StripeComponent.ctorParameters = () => [
    { type: StripeScriptTag }
];
StripeComponent.propDecorators = {
    catcher: [{ type: Output, args: ["catch",] }],
    invalid: [{ type: Input }],
    invalidChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hY2tlcmFwcGxlL1Byb2plY3RzL3dlYi9hbmd1bGFyL3N0cmlwZS1hbmd1bGFyL21hc3Rlci9zcmMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL1N0cmlwZUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUN2QyxNQUFNLGVBQWUsQ0FBQTtBQUl0QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFLcEQsTUFBTSxPQUFPLGVBQWU7SUFRMUIsWUFDUyxlQUErQjtRQUEvQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFSdkIsWUFBTyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFBO1FBR3ZELGtCQUFhLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUE7SUFNOUQsQ0FBQztJQUVILFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDYixDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUU7YUFDNUMsSUFBSSxDQUFFLENBQUMsQ0FBQSxFQUFFLENBQUEsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUUsQ0FBQTtJQUMzQixDQUFDOzs7WUF0QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsRUFBRTthQUMzQzs7O1lBSlEsZUFBZTs7O3NCQU1yQixNQUFNLFNBQUMsT0FBTztzQkFFZCxLQUFLOzRCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXG5pbXBvcnQge1xuICBTdHJpcGVJbnN0YW5jZVxufSBmcm9tIFwiLi4vU3RyaXBlVHlwZXNcIlxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4uL1N0cmlwZVNjcmlwdFRhZ1wiXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzdHJpcGUtY29tcG9uZW50XCIsIHRlbXBsYXRlOiBgYFxufSlcbmV4cG9ydCBjbGFzcyBTdHJpcGVDb21wb25lbnR7XG4gIEBPdXRwdXQoXCJjYXRjaFwiKSBjYXRjaGVyOkV2ZW50RW1pdHRlcjxFcnJvcj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBASW5wdXQoKSBpbnZhbGlkITpFcnJvclxuICBAT3V0cHV0KCkgaW52YWxpZENoYW5nZTpFdmVudEVtaXR0ZXI8RXJyb3I+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgc3RyaXBlITpTdHJpcGVJbnN0YW5jZVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBTdHJpcGVTY3JpcHRUYWc6U3RyaXBlU2NyaXB0VGFnXG4gICl7fVxuXG4gIG5nT25Jbml0KCl7XG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQoKTpQcm9taXNlPFN0cmlwZUluc3RhbmNlPntcbiAgICByZXR1cm4gdGhpcy5TdHJpcGVTY3JpcHRUYWcucHJvbWlzZUluc3RhbmNlKClcbiAgICAudGhlbiggaT0+dGhpcy5zdHJpcGU9aSApXG4gIH1cbn0iXX0=