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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxlQUFlLENBQUE7QUFFN0IsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBRTlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFBO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQTtBQUVsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBRTlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUM5RCxPQUFPLEVBQWdCLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBRTVFLE1BQU0sWUFBWSxHQUFHO0lBQ25CLGVBQWU7SUFDZixZQUFZO0lBQ1osVUFBVTtJQUNWLFVBQVU7Q0FDWCxDQUFBO0FBU0UsTUFBTSxPQUFPLFlBQVk7SUFDMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUF1QixFQUFFLE9BQThCO1FBQ3BFLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZjtvQkFDRSxPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixRQUFRLEVBQUUsY0FBYztpQkFDekI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxPQUFPO2lCQUNsQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7OztZQXZCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFDO29CQUNOLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWTtnQkFDYixrQ0FBa0M7Z0JBQ2pDLE9BQU8sRUFBQyxDQUFFLEdBQUcsWUFBWSxDQUFFO2FBQzVCOztBQW1CRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9TdHJpcGVUeXBlc1wiXG5cbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgU1RSSVBFX09QVElPTlMsIFNUUklQRV9QVUJMSVNIQUJMRV9LRVkgfSBmcm9tICcuL1N0cmlwZVR5cGVzJ1xuaW1wb3J0IHsgU3RyaXBlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDb21wb25lbnRcIlxuXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi9TdHJpcGVTY3JpcHRUYWdcIlxuZXhwb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4vU3RyaXBlU2NyaXB0VGFnXCJcblxuaW1wb3J0IHsgU3RyaXBlU291cmNlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVTb3VyY2UuY29tcG9uZW50XCJcbmV4cG9ydCB7IFN0cmlwZVNvdXJjZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5cbmltcG9ydCB7IFN0cmlwZUNhcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUNhcmQuY29tcG9uZW50XCJcbmV4cG9ydCB7IFN0cmlwZUNhcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUNhcmQuY29tcG9uZW50XCJcblxuaW1wb3J0IHsgU3RyaXBlQmFuayB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnRcIlxuZXhwb3J0IHsgYmFua19hY2NvdW50LCBTdHJpcGVCYW5rIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVCYW5rLmNvbXBvbmVudFwiXG5cbmNvbnN0IGRlY2xhcmF0aW9ucyA9IFtcbiAgU3RyaXBlQ29tcG9uZW50LCAvLyBpZ25vcmUgZG8gbm90IHVzZSAoaGFzIHRvIGJlIGhlcmUgZm9yIGV4dGVuZHMgcHVycG9zZXMpXG4gIFN0cmlwZVNvdXJjZSxcbiAgU3RyaXBlQ2FyZCxcbiAgU3RyaXBlQmFua1xuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOltcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zLFxuIC8vIHByb3ZpZGVyczogWyBTdHJpcGVTY3JpcHRUYWcgXSxcbiAgZXhwb3J0czpbIC4uLmRlY2xhcmF0aW9ucyBdXG59KSBleHBvcnQgY2xhc3MgU3RyaXBlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QocHVibGlzaGFibGVLZXk/OiBzdHJpbmcsIG9wdGlvbnM/OiBzdHJpcGUuU3RyaXBlT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RyaXBlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdHJpcGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgU3RyaXBlU2NyaXB0VGFnLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogcHVibGlzaGFibGVLZXlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUUklQRV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgUGxlYXNlIGltcG9ydCBgU3RyaXBlTW9kdWxlYCBkaXJlY3RseVxuICovXG5leHBvcnQgY29uc3QgTW9kdWxlID0gU3RyaXBlTW9kdWxlXG4iXX0=