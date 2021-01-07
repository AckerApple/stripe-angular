export * from "./StripeTypes";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY } from './StripeTypes';
import { StripeComponent } from "./components/StripeComponent";
import { StripeScriptTag } from "./StripeScriptTag";
export { StripeScriptTag } from "./StripeScriptTag";
import { StripeSource } from "./components/StripeSource.component";
export { StripeSource } from "./components/StripeSource.component";
import { StripeCard } from "./components/StripeCard.component";
export { StripeCard } from "./components/StripeCard.component";
import { StripeBank } from "./components/StripeBank.component";
export { StripeBank } from "./components/StripeBank.component";
const declarations = [
    StripeComponent,
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
                declarations,
                // providers: [ StripeScriptTag ],
                exports: [...declarations]
            },] }
];
/**
 * @deprecated Please import `StripeModule` directly
 */
export const Module = StripeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxlQUFlLENBQUE7QUFFN0IsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBRTlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFBO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQTtBQUVsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBRTlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFFOUQsTUFBTSxZQUFZLEdBQUc7SUFDbkIsZUFBZTtJQUNmLFlBQVk7SUFDWixVQUFVO0lBQ1YsVUFBVTtDQUNYLENBQUE7QUFTRSxNQUFNLE9BQU8sWUFBWTtJQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLGNBQXVCLEVBQUUsT0FBOEI7UUFDcEUsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmO29CQUNFLE9BQU8sRUFBRSxzQkFBc0I7b0JBQy9CLFFBQVEsRUFBRSxjQUFjO2lCQUN6QjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsY0FBYztvQkFDdkIsUUFBUSxFQUFFLE9BQU87aUJBQ2xCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7O1lBdkJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUM7b0JBQ04sWUFBWTtpQkFDYjtnQkFDRCxZQUFZO2dCQUNiLGtDQUFrQztnQkFDakMsT0FBTyxFQUFDLENBQUUsR0FBRyxZQUFZLENBQUU7YUFDNUI7O0FBbUJEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL1N0cmlwZVR5cGVzXCJcblxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQgeyBTVFJJUEVfT1BUSU9OUywgU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSB9IGZyb20gJy4vU3RyaXBlVHlwZXMnXG5pbXBvcnQgeyBTdHJpcGVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUNvbXBvbmVudFwiXG5cbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuL1N0cmlwZVNjcmlwdFRhZ1wiXG5leHBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi9TdHJpcGVTY3JpcHRUYWdcIlxuXG5pbXBvcnQgeyBTdHJpcGVTb3VyY2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZVNvdXJjZS5jb21wb25lbnRcIlxuZXhwb3J0IHsgU3RyaXBlU291cmNlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVTb3VyY2UuY29tcG9uZW50XCJcblxuaW1wb3J0IHsgU3RyaXBlQ2FyZCB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQ2FyZC5jb21wb25lbnRcIlxuZXhwb3J0IHsgU3RyaXBlQ2FyZCB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQ2FyZC5jb21wb25lbnRcIlxuXG5pbXBvcnQgeyBTdHJpcGVCYW5rIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVCYW5rLmNvbXBvbmVudFwiXG5leHBvcnQgeyBTdHJpcGVCYW5rIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVCYW5rLmNvbXBvbmVudFwiXG5cbmNvbnN0IGRlY2xhcmF0aW9ucyA9IFtcbiAgU3RyaXBlQ29tcG9uZW50LCAvLyBpZ25vcmUgZG8gbm90IHVzZSAoaGFzIHRvIGJlIGhlcmUgZm9yIGV4dGVuZHMgcHVycG9zZXMpXG4gIFN0cmlwZVNvdXJjZSxcbiAgU3RyaXBlQ2FyZCxcbiAgU3RyaXBlQmFua1xuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOltcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zLFxuIC8vIHByb3ZpZGVyczogWyBTdHJpcGVTY3JpcHRUYWcgXSxcbiAgZXhwb3J0czpbIC4uLmRlY2xhcmF0aW9ucyBdXG59KSBleHBvcnQgY2xhc3MgU3RyaXBlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QocHVibGlzaGFibGVLZXk/OiBzdHJpbmcsIG9wdGlvbnM/OiBzdHJpcGUuU3RyaXBlT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RyaXBlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdHJpcGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgU3RyaXBlU2NyaXB0VGFnLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogcHVibGlzaGFibGVLZXlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUUklQRV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgUGxlYXNlIGltcG9ydCBgU3RyaXBlTW9kdWxlYCBkaXJlY3RseVxuICovXG5leHBvcnQgY29uc3QgTW9kdWxlID0gU3RyaXBlTW9kdWxlXG4iXX0=