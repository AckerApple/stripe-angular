var StripeModule_1;
import { __decorate } from "tslib";
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
let StripeModule = StripeModule_1 = class StripeModule {
    static forRoot(publishableKey, options) {
        return {
            ngModule: StripeModule_1,
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
};
StripeModule = StripeModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        declarations: declarations,
        // providers: [ StripeScriptTag ],
        exports: [...declarations]
    })
], StripeModule);
export { StripeModule };
/**
 * @deprecated Please import `StripeModule` directly
 */
export const Module = StripeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdHJpcGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsY0FBYyxlQUFlLENBQUE7QUFFN0IsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBeUIsY0FBYyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRTdGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFBO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQTtBQUVsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBRTlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUM5RCxPQUFPLEVBQWdCLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBRTVFLE1BQU0sWUFBWSxHQUFHO0lBQ25CLFlBQVk7SUFDWixVQUFVO0lBQ1YsVUFBVTtDQUNYLENBQUE7QUFTRSxJQUFhLFlBQVksb0JBQXpCLE1BQWEsWUFBWTtJQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLGNBQXVCLEVBQUUsT0FBK0I7UUFDckUsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmO29CQUNFLE9BQU8sRUFBRSxzQkFBc0I7b0JBQy9CLFFBQVEsRUFBRSxjQUFjO2lCQUN6QjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsY0FBYztvQkFDdkIsUUFBUSxFQUFFLE9BQU87aUJBQ2xCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFqQmUsWUFBWTtJQVAzQixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUM7WUFDTixZQUFZO1NBQ2I7UUFDRCxZQUFZLEVBQUUsWUFBWTtRQUMzQixrQ0FBa0M7UUFDakMsT0FBTyxFQUFDLENBQUUsR0FBRyxZQUFZLENBQUU7S0FDNUIsQ0FBQztHQUFjLFlBQVksQ0FpQjNCO1NBakJlLFlBQVk7QUFtQjVCOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL1N0cmlwZVR5cGVzXCJcblxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQgeyBTdHJpcGVJbnN0YW5jZU9wdGlvbnMsIFNUUklQRV9PUFRJT05TLCBTVFJJUEVfUFVCTElTSEFCTEVfS0VZIH0gZnJvbSAnLi9TdHJpcGVUeXBlcydcblxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4vU3RyaXBlU2NyaXB0VGFnXCJcbmV4cG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuL1N0cmlwZVNjcmlwdFRhZ1wiXG5cbmltcG9ydCB7IFN0cmlwZVNvdXJjZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5leHBvcnQgeyBTdHJpcGVTb3VyY2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZVNvdXJjZS5jb21wb25lbnRcIlxuXG5pbXBvcnQgeyBTdHJpcGVDYXJkIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudFwiXG5leHBvcnQgeyBTdHJpcGVDYXJkIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudFwiXG5cbmltcG9ydCB7IFN0cmlwZUJhbmsgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUJhbmsuY29tcG9uZW50XCJcbmV4cG9ydCB7IGJhbmtfYWNjb3VudCwgU3RyaXBlQmFuayB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnRcIlxuXG5jb25zdCBkZWNsYXJhdGlvbnMgPSBbXG4gIFN0cmlwZVNvdXJjZSxcbiAgU3RyaXBlQ2FyZCxcbiAgU3RyaXBlQmFua1xuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOltcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBkZWNsYXJhdGlvbnMsXG4gLy8gcHJvdmlkZXJzOiBbIFN0cmlwZVNjcmlwdFRhZyBdLFxuICBleHBvcnRzOlsgLi4uZGVjbGFyYXRpb25zIF1cbn0pIGV4cG9ydCBjbGFzcyBTdHJpcGVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChwdWJsaXNoYWJsZUtleT86IHN0cmluZywgb3B0aW9ucz86IFN0cmlwZUluc3RhbmNlT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RyaXBlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFN0cmlwZVNjcmlwdFRhZyxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUUklQRV9QVUJMSVNIQUJMRV9LRVksXG4gICAgICAgICAgdXNlVmFsdWU6IHB1Ymxpc2hhYmxlS2V5XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTVFJJUEVfT1BUSU9OUyxcbiAgICAgICAgICB1c2VWYWx1ZTogb3B0aW9uc1xuICAgICAgICB9XG4gICAgICBdLFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIFBsZWFzZSBpbXBvcnQgYFN0cmlwZU1vZHVsZWAgZGlyZWN0bHlcbiAqL1xuZXhwb3J0IGNvbnN0IE1vZHVsZSA9IFN0cmlwZU1vZHVsZVxuIl19