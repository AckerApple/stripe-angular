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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3RyaXBlQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQ3ZDLE1BQU0sZUFBZSxDQUFBO0FBQ3RCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUtwRCxNQUFNLE9BQU8sZUFBZTtJQVExQixZQUNTLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQVJ2QixZQUFPLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUE7UUFHOUQsa0JBQWEsR0FBOEIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQU1yRSxDQUFDO0lBRUgsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFFRCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTthQUM1QyxJQUFJLENBQUUsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBRSxDQUFBO0lBQzNCLENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxFQUFFO2FBQzNDOzs7WUFKUSxlQUFlOzs7c0JBTXJCLE1BQU0sU0FBQyxPQUFPO3NCQUVkLEtBQUs7NEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50XG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwic3RyaXBlLWNvbXBvbmVudFwiLCB0ZW1wbGF0ZTogYGBcbn0pXG5leHBvcnQgY2xhc3MgU3RyaXBlQ29tcG9uZW50e1xuICBAT3V0cHV0KFwiY2F0Y2hcIikgY2F0Y2hlcjpFdmVudEVtaXR0ZXI8c3RyaXBlLkVycm9yPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBJbnB1dCgpIGludmFsaWQ/OnN0cmlwZS5FcnJvclxuICBAT3V0cHV0KCkgaW52YWxpZENoYW5nZTpFdmVudEVtaXR0ZXI8c3RyaXBlLkVycm9yPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHN0cmlwZSE6c3RyaXBlLlN0cmlwZVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBTdHJpcGVTY3JpcHRUYWc6U3RyaXBlU2NyaXB0VGFnXG4gICl7fVxuXG4gIG5nT25Jbml0KCl7XG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQoKTpQcm9taXNlPHN0cmlwZS5TdHJpcGU+e1xuICAgIHJldHVybiB0aGlzLlN0cmlwZVNjcmlwdFRhZy5wcm9taXNlSW5zdGFuY2UoKVxuICAgIC50aGVuKCBpPT50aGlzLnN0cmlwZT1pIClcbiAgfVxufSJdfQ==