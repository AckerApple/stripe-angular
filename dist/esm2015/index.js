export * from "./StripeTypes";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY } from './StripeTypes';
import { StripeScriptTag } from "./StripeScriptTag";
export { StripeScriptTag } from "./StripeScriptTag";
import { StripeSource } from "./components/StripeSource.component";
export { StripeSource } from "./components/StripeSource.component";
import { StripeCard } from "./components/StripeCard.component";
export { StripeCard } from "./components/StripeCard.component";
import { StripeBank } from "./components/StripeBank.component";
export { StripeBank } from "./components/StripeBank.component";
const declarations = [
    StripeSource,
    StripeCard,
    StripeBank
];
export class StripeModule {
    static forRoot(publishableKey, options) {
        return {
            ngModule: StripeModule,
            providers: [
                StripeScriptTag,
                {
                    provide: STRIPE_PUBLISHABLE_KEY,
                    useValue: publishableKey
                },
                {
                    provide: STRIPE_OPTIONS,
                    useValue: options
                }
            ],
        };
    }
}
StripeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: declarations,
                // providers: [ StripeScriptTag ],
                exports: [...declarations]
            },] }
];
/**
 * @deprecated Please import `StripeModule` directly
 */
export const Module = StripeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Fja2VyYXBwbGUvUHJvamVjdHMvd2ViL2FuZ3VsYXIvc3RyaXBlLWFuZ3VsYXIvbWFzdGVyL3NyYy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWMsZUFBZSxDQUFBO0FBRTdCLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQXlCLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUU3RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBRW5ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQTtBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUE7QUFFbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUU5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFDOUQsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUU1RSxNQUFNLFlBQVksR0FBRztJQUNuQixZQUFZO0lBQ1osVUFBVTtJQUNWLFVBQVU7Q0FDWCxDQUFBO0FBU0UsTUFBTSxPQUFPLFlBQVk7SUFDMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUF1QixFQUFFLE9BQStCO1FBQ3JFLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZjtvQkFDRSxPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixRQUFRLEVBQUUsY0FBYztpQkFDekI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxPQUFPO2lCQUNsQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7OztZQXZCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFDO29CQUNOLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFLFlBQVk7Z0JBQzNCLGtDQUFrQztnQkFDakMsT0FBTyxFQUFDLENBQUUsR0FBRyxZQUFZLENBQUU7YUFDNUI7O0FBbUJEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL1N0cmlwZVR5cGVzXCJcblxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQgeyBTdHJpcGVJbnN0YW5jZU9wdGlvbnMsIFNUUklQRV9PUFRJT05TLCBTVFJJUEVfUFVCTElTSEFCTEVfS0VZIH0gZnJvbSAnLi9TdHJpcGVUeXBlcydcblxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4vU3RyaXBlU2NyaXB0VGFnXCJcbmV4cG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuL1N0cmlwZVNjcmlwdFRhZ1wiXG5cbmltcG9ydCB7IFN0cmlwZVNvdXJjZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5leHBvcnQgeyBTdHJpcGVTb3VyY2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZVNvdXJjZS5jb21wb25lbnRcIlxuXG5pbXBvcnQgeyBTdHJpcGVDYXJkIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudFwiXG5leHBvcnQgeyBTdHJpcGVDYXJkIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudFwiXG5cbmltcG9ydCB7IFN0cmlwZUJhbmsgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUJhbmsuY29tcG9uZW50XCJcbmV4cG9ydCB7IGJhbmtfYWNjb3VudCwgU3RyaXBlQmFuayB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnRcIlxuXG5jb25zdCBkZWNsYXJhdGlvbnMgPSBbXG4gIFN0cmlwZVNvdXJjZSxcbiAgU3RyaXBlQ2FyZCxcbiAgU3RyaXBlQmFua1xuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOltcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBkZWNsYXJhdGlvbnMsXG4gLy8gcHJvdmlkZXJzOiBbIFN0cmlwZVNjcmlwdFRhZyBdLFxuICBleHBvcnRzOlsgLi4uZGVjbGFyYXRpb25zIF1cbn0pIGV4cG9ydCBjbGFzcyBTdHJpcGVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChwdWJsaXNoYWJsZUtleT86IHN0cmluZywgb3B0aW9ucz86IFN0cmlwZUluc3RhbmNlT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RyaXBlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdHJpcGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgU3RyaXBlU2NyaXB0VGFnLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogcHVibGlzaGFibGVLZXlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUUklQRV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgUGxlYXNlIGltcG9ydCBgU3RyaXBlTW9kdWxlYCBkaXJlY3RseVxuICovXG5leHBvcnQgY29uc3QgTW9kdWxlID0gU3RyaXBlTW9kdWxlXG4iXX0=