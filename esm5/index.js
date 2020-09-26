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
    StripeModule_1 = StripeModule;
    StripeModule.forRoot = function (publishableKey, options) {
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
    };
    var StripeModule_1;
    StripeModule = StripeModule_1 = __decorate([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdHJpcGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjLGVBQWUsQ0FBQTtBQUU3QixPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUF5QixjQUFjLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFFN0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUVuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUE7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFBO0FBRWxFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFFOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBQzlELE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFFNUUsSUFBTSxZQUFZLEdBQUc7SUFDbkIsWUFBWTtJQUNaLFVBQVU7SUFDVixVQUFVO0NBQ1gsQ0FBQTtBQVNFO0lBQUE7SUFpQkgsQ0FBQztxQkFqQmUsWUFBWTtJQUNuQixvQkFBTyxHQUFkLFVBQWUsY0FBdUIsRUFBRSxPQUErQjtRQUNyRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULGVBQWU7Z0JBQ2Y7b0JBQ0UsT0FBTyxFQUFFLHNCQUFzQjtvQkFDL0IsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxjQUFjO29CQUN2QixRQUFRLEVBQUUsT0FBTztpQkFDbEI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDOztJQWhCYSxZQUFZO1FBUDNCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBQztnQkFDTixZQUFZO2FBQ2I7WUFDRCxZQUFZLEVBQUUsWUFBWTtZQUMzQixrQ0FBa0M7WUFDakMsT0FBTyxXQUFNLFlBQVksQ0FBRTtTQUM1QixDQUFDO09BQWMsWUFBWSxDQWlCM0I7SUFBRCxtQkFBQztDQUFBLEFBakJFLElBaUJGO1NBakJlLFlBQVk7QUFtQjVCOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFHLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL1N0cmlwZVR5cGVzXCJcblxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQgeyBTdHJpcGVJbnN0YW5jZU9wdGlvbnMsIFNUUklQRV9PUFRJT05TLCBTVFJJUEVfUFVCTElTSEFCTEVfS0VZIH0gZnJvbSAnLi9TdHJpcGVUeXBlcydcblxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4vU3RyaXBlU2NyaXB0VGFnXCJcbmV4cG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuL1N0cmlwZVNjcmlwdFRhZ1wiXG5cbmltcG9ydCB7IFN0cmlwZVNvdXJjZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5leHBvcnQgeyBTdHJpcGVTb3VyY2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZVNvdXJjZS5jb21wb25lbnRcIlxuXG5pbXBvcnQgeyBTdHJpcGVDYXJkIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudFwiXG5leHBvcnQgeyBTdHJpcGVDYXJkIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudFwiXG5cbmltcG9ydCB7IFN0cmlwZUJhbmsgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUJhbmsuY29tcG9uZW50XCJcbmV4cG9ydCB7IGJhbmtfYWNjb3VudCwgU3RyaXBlQmFuayB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnRcIlxuXG5jb25zdCBkZWNsYXJhdGlvbnMgPSBbXG4gIFN0cmlwZVNvdXJjZSxcbiAgU3RyaXBlQ2FyZCxcbiAgU3RyaXBlQmFua1xuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOltcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBkZWNsYXJhdGlvbnMsXG4gLy8gcHJvdmlkZXJzOiBbIFN0cmlwZVNjcmlwdFRhZyBdLFxuICBleHBvcnRzOlsgLi4uZGVjbGFyYXRpb25zIF1cbn0pIGV4cG9ydCBjbGFzcyBTdHJpcGVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChwdWJsaXNoYWJsZUtleT86IHN0cmluZywgb3B0aW9ucz86IFN0cmlwZUluc3RhbmNlT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RyaXBlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdHJpcGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgU3RyaXBlU2NyaXB0VGFnLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogcHVibGlzaGFibGVLZXlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUUklQRV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgUGxlYXNlIGltcG9ydCBgU3RyaXBlTW9kdWxlYCBkaXJlY3RseVxuICovXG5leHBvcnQgY29uc3QgTW9kdWxlID0gU3RyaXBlTW9kdWxlXG4iXX0=