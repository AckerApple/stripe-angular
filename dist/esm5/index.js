import { __decorate, __read, __spread } from "tslib";
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
var declarations = [
    StripeSource,
    StripeCard,
    StripeBank
];
var StripeModule = /** @class */ (function () {
    function StripeModule() {
    }
    StripeModule.forRoot = function (publishableKey, options) {
        return {
            ngModule: Module,
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
    };
    StripeModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: declarations,
            // providers: [ StripeScriptTag ],
            exports: __spread(declarations)
        })
    ], StripeModule);
    return StripeModule;
}());
export { StripeModule };
/**
 * @deprecated Please import `StripeModule` directly
 */
export var Module = StripeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdHJpcGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjLGVBQWUsQ0FBQTtBQUU3QixPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUF5QixjQUFjLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFFN0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUVuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUE7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFBO0FBRWxFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFFOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBQzlELE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFFNUUsSUFBTSxZQUFZLEdBQUc7SUFDbkIsWUFBWTtJQUNaLFVBQVU7SUFDVixVQUFVO0NBQ1gsQ0FBQTtBQVNFO0lBQUE7SUFpQkgsQ0FBQztJQWhCUSxvQkFBTyxHQUFkLFVBQWUsY0FBdUIsRUFBRSxPQUErQjtRQUNyRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLE1BQU07WUFDaEIsU0FBUyxFQUFFO2dCQUNULGVBQWU7Z0JBQ2Y7b0JBQ0UsT0FBTyxFQUFFLHNCQUFzQjtvQkFDL0IsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxjQUFjO29CQUN2QixRQUFRLEVBQUUsT0FBTztpQkFDbEI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBaEJhLFlBQVk7UUFQM0IsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFDO2dCQUNOLFlBQVk7YUFDYjtZQUNELFlBQVksRUFBRSxZQUFZO1lBQzNCLGtDQUFrQztZQUNqQyxPQUFPLFdBQU0sWUFBWSxDQUFFO1NBQzVCLENBQUM7T0FBYyxZQUFZLENBaUIzQjtJQUFELG1CQUFDO0NBQUEsQUFqQkUsSUFpQkY7U0FqQmUsWUFBWTtBQW1CNUI7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vU3RyaXBlVHlwZXNcIlxuXG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7IFN0cmlwZUluc3RhbmNlT3B0aW9ucywgU1RSSVBFX09QVElPTlMsIFNUUklQRV9QVUJMSVNIQUJMRV9LRVkgfSBmcm9tICcuL1N0cmlwZVR5cGVzJ1xuXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi9TdHJpcGVTY3JpcHRUYWdcIlxuZXhwb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4vU3RyaXBlU2NyaXB0VGFnXCJcblxuaW1wb3J0IHsgU3RyaXBlU291cmNlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVTb3VyY2UuY29tcG9uZW50XCJcbmV4cG9ydCB7IFN0cmlwZVNvdXJjZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5cbmltcG9ydCB7IFN0cmlwZUNhcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUNhcmQuY29tcG9uZW50XCJcbmV4cG9ydCB7IFN0cmlwZUNhcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUNhcmQuY29tcG9uZW50XCJcblxuaW1wb3J0IHsgU3RyaXBlQmFuayB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnRcIlxuZXhwb3J0IHsgYmFua19hY2NvdW50LCBTdHJpcGVCYW5rIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVCYW5rLmNvbXBvbmVudFwiXG5cbmNvbnN0IGRlY2xhcmF0aW9ucyA9IFtcbiAgU3RyaXBlU291cmNlLFxuICBTdHJpcGVDYXJkLFxuICBTdHJpcGVCYW5rXG5dXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6W1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IGRlY2xhcmF0aW9ucyxcbiAvLyBwcm92aWRlcnM6IFsgU3RyaXBlU2NyaXB0VGFnIF0sXG4gIGV4cG9ydHM6WyAuLi5kZWNsYXJhdGlvbnMgXVxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KHB1Ymxpc2hhYmxlS2V5Pzogc3RyaW5nLCBvcHRpb25zPzogU3RyaXBlSW5zdGFuY2VPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgU3RyaXBlU2NyaXB0VGFnLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogcHVibGlzaGFibGVLZXlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUUklQRV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgUGxlYXNlIGltcG9ydCBgU3RyaXBlTW9kdWxlYCBkaXJlY3RseVxuICovXG5leHBvcnQgY29uc3QgTW9kdWxlID0gU3RyaXBlTW9kdWxlXG4iXX0=