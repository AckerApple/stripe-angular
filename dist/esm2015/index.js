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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxlQUFlLENBQUE7QUFFN0IsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBeUIsY0FBYyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQzdGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQTtBQUU5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBRW5ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQTtBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUE7QUFFbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUU5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFDOUQsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUU1RSxNQUFNLFlBQVksR0FBRztJQUNuQixlQUFlO0lBQ2YsWUFBWTtJQUNaLFVBQVU7SUFDVixVQUFVO0NBQ1gsQ0FBQTtBQVNFLE1BQU0sT0FBTyxZQUFZO0lBQzFCLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBdUIsRUFBRSxPQUErQjtRQUNyRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULGVBQWU7Z0JBQ2Y7b0JBQ0UsT0FBTyxFQUFFLHNCQUFzQjtvQkFDL0IsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxjQUFjO29CQUN2QixRQUFRLEVBQUUsT0FBTztpQkFDbEI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDOzs7WUF2QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBQztvQkFDTixZQUFZO2lCQUNiO2dCQUNELFlBQVk7Z0JBQ2Isa0NBQWtDO2dCQUNqQyxPQUFPLEVBQUMsQ0FBRSxHQUFHLFlBQVksQ0FBRTthQUM1Qjs7QUFtQkQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vU3RyaXBlVHlwZXNcIlxuXG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7IFN0cmlwZUluc3RhbmNlT3B0aW9ucywgU1RSSVBFX09QVElPTlMsIFNUUklQRV9QVUJMSVNIQUJMRV9LRVkgfSBmcm9tICcuL1N0cmlwZVR5cGVzJ1xuaW1wb3J0IHsgU3RyaXBlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDb21wb25lbnRcIlxuXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi9TdHJpcGVTY3JpcHRUYWdcIlxuZXhwb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4vU3RyaXBlU2NyaXB0VGFnXCJcblxuaW1wb3J0IHsgU3RyaXBlU291cmNlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVTb3VyY2UuY29tcG9uZW50XCJcbmV4cG9ydCB7IFN0cmlwZVNvdXJjZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5cbmltcG9ydCB7IFN0cmlwZUNhcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUNhcmQuY29tcG9uZW50XCJcbmV4cG9ydCB7IFN0cmlwZUNhcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUNhcmQuY29tcG9uZW50XCJcblxuaW1wb3J0IHsgU3RyaXBlQmFuayB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnRcIlxuZXhwb3J0IHsgYmFua19hY2NvdW50LCBTdHJpcGVCYW5rIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVCYW5rLmNvbXBvbmVudFwiXG5cbmNvbnN0IGRlY2xhcmF0aW9ucyA9IFtcbiAgU3RyaXBlQ29tcG9uZW50LCAvLyBpZ25vcmUgZG8gbm90IHVzZSAoaGFzIHRvIGJlIGhlcmUgZm9yIGV4dGVuZHMgcHVycG9zZXMpXG4gIFN0cmlwZVNvdXJjZSxcbiAgU3RyaXBlQ2FyZCxcbiAgU3RyaXBlQmFua1xuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOltcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zLFxuIC8vIHByb3ZpZGVyczogWyBTdHJpcGVTY3JpcHRUYWcgXSxcbiAgZXhwb3J0czpbIC4uLmRlY2xhcmF0aW9ucyBdXG59KSBleHBvcnQgY2xhc3MgU3RyaXBlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QocHVibGlzaGFibGVLZXk/OiBzdHJpbmcsIG9wdGlvbnM/OiBTdHJpcGVJbnN0YW5jZU9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0cmlwZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RyaXBlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFN0cmlwZVNjcmlwdFRhZyxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUUklQRV9QVUJMSVNIQUJMRV9LRVksXG4gICAgICAgICAgdXNlVmFsdWU6IHB1Ymxpc2hhYmxlS2V5XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTVFJJUEVfT1BUSU9OUyxcbiAgICAgICAgICB1c2VWYWx1ZTogb3B0aW9uc1xuICAgICAgICB9XG4gICAgICBdLFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIFBsZWFzZSBpbXBvcnQgYFN0cmlwZU1vZHVsZWAgZGlyZWN0bHlcbiAqL1xuZXhwb3J0IGNvbnN0IE1vZHVsZSA9IFN0cmlwZU1vZHVsZVxuIl19