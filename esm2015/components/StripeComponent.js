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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3RyaXBlQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQ3ZDLE1BQU0sZUFBZSxDQUFBO0FBSXRCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUtwRCxNQUFNLE9BQU8sZUFBZTtJQVExQixZQUNTLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQVJ2QixZQUFPLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUE7UUFHdkQsa0JBQWEsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQU05RCxDQUFDO0lBRUgsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFFRCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTthQUM1QyxJQUFJLENBQUUsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBRSxDQUFBO0lBQzNCLENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxFQUFFO2FBQzNDOzs7WUFKUSxlQUFlOzs7c0JBTXJCLE1BQU0sU0FBQyxPQUFPO3NCQUVkLEtBQUs7NEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50XG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7XG4gIFN0cmlwZUluc3RhbmNlXG59IGZyb20gXCIuLi9TdHJpcGVUeXBlc1wiXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi4vU3RyaXBlU2NyaXB0VGFnXCJcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInN0cmlwZS1jb21wb25lbnRcIiwgdGVtcGxhdGU6IGBgXG59KVxuZXhwb3J0IGNsYXNzIFN0cmlwZUNvbXBvbmVudHtcbiAgQE91dHB1dChcImNhdGNoXCIpIGNhdGNoZXI6RXZlbnRFbWl0dGVyPEVycm9yPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBJbnB1dCgpIGludmFsaWQ/OkVycm9yXG4gIEBPdXRwdXQoKSBpbnZhbGlkQ2hhbmdlOkV2ZW50RW1pdHRlcjxFcnJvcj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBzdHJpcGUhOlN0cmlwZUluc3RhbmNlXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIFN0cmlwZVNjcmlwdFRhZzpTdHJpcGVTY3JpcHRUYWdcbiAgKXt9XG5cbiAgbmdPbkluaXQoKXtcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCgpOlByb21pc2U8U3RyaXBlSW5zdGFuY2U+e1xuICAgIHJldHVybiB0aGlzLlN0cmlwZVNjcmlwdFRhZy5wcm9taXNlSW5zdGFuY2UoKVxuICAgIC50aGVuKCBpPT50aGlzLnN0cmlwZT1pIClcbiAgfVxufSJdfQ==