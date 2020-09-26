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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Fja2VyYXBwbGUvUHJvamVjdHMvd2ViL2FuZ3VsYXIvc3RyaXBlLWFuZ3VsYXIvbWFzdGVyL3NyYy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWMsZUFBZSxDQUFBO0FBRTdCLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQXlCLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUM3RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUE7QUFFOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUVuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUE7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFBO0FBRWxFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFFOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBQzlELE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFFNUUsTUFBTSxZQUFZLEdBQUc7SUFDbkIsZUFBZTtJQUNmLFlBQVk7SUFDWixVQUFVO0lBQ1YsVUFBVTtDQUNYLENBQUE7QUFTRSxNQUFNLE9BQU8sWUFBWTtJQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLGNBQXVCLEVBQUUsT0FBK0I7UUFDckUsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmO29CQUNFLE9BQU8sRUFBRSxzQkFBc0I7b0JBQy9CLFFBQVEsRUFBRSxjQUFjO2lCQUN6QjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsY0FBYztvQkFDdkIsUUFBUSxFQUFFLE9BQU87aUJBQ2xCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7O1lBdkJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUM7b0JBQ04sWUFBWTtpQkFDYjtnQkFDRCxZQUFZO2dCQUNiLGtDQUFrQztnQkFDakMsT0FBTyxFQUFDLENBQUUsR0FBRyxZQUFZLENBQUU7YUFDNUI7O0FBbUJEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL1N0cmlwZVR5cGVzXCJcblxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQgeyBTdHJpcGVJbnN0YW5jZU9wdGlvbnMsIFNUUklQRV9PUFRJT05TLCBTVFJJUEVfUFVCTElTSEFCTEVfS0VZIH0gZnJvbSAnLi9TdHJpcGVUeXBlcydcbmltcG9ydCB7IFN0cmlwZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQ29tcG9uZW50XCJcblxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4vU3RyaXBlU2NyaXB0VGFnXCJcbmV4cG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuL1N0cmlwZVNjcmlwdFRhZ1wiXG5cbmltcG9ydCB7IFN0cmlwZVNvdXJjZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5leHBvcnQgeyBTdHJpcGVTb3VyY2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZVNvdXJjZS5jb21wb25lbnRcIlxuXG5pbXBvcnQgeyBTdHJpcGVDYXJkIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudFwiXG5leHBvcnQgeyBTdHJpcGVDYXJkIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudFwiXG5cbmltcG9ydCB7IFN0cmlwZUJhbmsgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUJhbmsuY29tcG9uZW50XCJcbmV4cG9ydCB7IGJhbmtfYWNjb3VudCwgU3RyaXBlQmFuayB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnRcIlxuXG5jb25zdCBkZWNsYXJhdGlvbnMgPSBbXG4gIFN0cmlwZUNvbXBvbmVudCwgLy8gaWdub3JlIGRvIG5vdCB1c2UgKGhhcyB0byBiZSBoZXJlIGZvciBleHRlbmRzIHB1cnBvc2VzKVxuICBTdHJpcGVTb3VyY2UsXG4gIFN0cmlwZUNhcmQsXG4gIFN0cmlwZUJhbmtcbl1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czpbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9ucyxcbiAvLyBwcm92aWRlcnM6IFsgU3RyaXBlU2NyaXB0VGFnIF0sXG4gIGV4cG9ydHM6WyAuLi5kZWNsYXJhdGlvbnMgXVxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KHB1Ymxpc2hhYmxlS2V5Pzogc3RyaW5nLCBvcHRpb25zPzogU3RyaXBlSW5zdGFuY2VPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdHJpcGVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0cmlwZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBTdHJpcGVTY3JpcHRUYWcsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTVFJJUEVfUFVCTElTSEFCTEVfS0VZLFxuICAgICAgICAgIHVzZVZhbHVlOiBwdWJsaXNoYWJsZUtleVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RSSVBFX09QVElPTlMsXG4gICAgICAgICAgdXNlVmFsdWU6IG9wdGlvbnNcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBQbGVhc2UgaW1wb3J0IGBTdHJpcGVNb2R1bGVgIGRpcmVjdGx5XG4gKi9cbmV4cG9ydCBjb25zdCBNb2R1bGUgPSBTdHJpcGVNb2R1bGVcbiJdfQ==