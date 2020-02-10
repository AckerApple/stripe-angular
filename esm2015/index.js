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
let StripeModule = class StripeModule {
    static forRoot(publishableKey, options) {
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
    }
};
StripeModule = __decorate([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdHJpcGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjLGVBQWUsQ0FBQTtBQUU3QixPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUF5QixjQUFjLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFFN0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUVuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUE7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFBO0FBRWxFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFFOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBQzlELE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFFNUUsTUFBTSxZQUFZLEdBQUc7SUFDbkIsWUFBWTtJQUNaLFVBQVU7SUFDVixVQUFVO0NBQ1gsQ0FBQTtBQVNFLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFDMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUF1QixFQUFFLE9BQStCO1FBQ3JFLE9BQU87WUFDTCxRQUFRLEVBQUUsTUFBTTtZQUNoQixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZjtvQkFDRSxPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixRQUFRLEVBQUUsY0FBYztpQkFDekI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxPQUFPO2lCQUNsQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBO0FBakJlLFlBQVk7SUFQM0IsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFDO1lBQ04sWUFBWTtTQUNiO1FBQ0QsWUFBWSxFQUFFLFlBQVk7UUFDM0Isa0NBQWtDO1FBQ2pDLE9BQU8sRUFBQyxDQUFFLEdBQUcsWUFBWSxDQUFFO0tBQzVCLENBQUM7R0FBYyxZQUFZLENBaUIzQjtTQWpCZSxZQUFZO0FBbUI1Qjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9TdHJpcGVUeXBlc1wiXG5cbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgU3RyaXBlSW5zdGFuY2VPcHRpb25zLCBTVFJJUEVfT1BUSU9OUywgU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSB9IGZyb20gJy4vU3RyaXBlVHlwZXMnXG5cbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuL1N0cmlwZVNjcmlwdFRhZ1wiXG5leHBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi9TdHJpcGVTY3JpcHRUYWdcIlxuXG5pbXBvcnQgeyBTdHJpcGVTb3VyY2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZVNvdXJjZS5jb21wb25lbnRcIlxuZXhwb3J0IHsgU3RyaXBlU291cmNlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVTb3VyY2UuY29tcG9uZW50XCJcblxuaW1wb3J0IHsgU3RyaXBlQ2FyZCB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQ2FyZC5jb21wb25lbnRcIlxuZXhwb3J0IHsgU3RyaXBlQ2FyZCB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQ2FyZC5jb21wb25lbnRcIlxuXG5pbXBvcnQgeyBTdHJpcGVCYW5rIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVCYW5rLmNvbXBvbmVudFwiXG5leHBvcnQgeyBiYW5rX2FjY291bnQsIFN0cmlwZUJhbmsgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUJhbmsuY29tcG9uZW50XCJcblxuY29uc3QgZGVjbGFyYXRpb25zID0gW1xuICBTdHJpcGVTb3VyY2UsXG4gIFN0cmlwZUNhcmQsXG4gIFN0cmlwZUJhbmtcbl1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czpbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogZGVjbGFyYXRpb25zLFxuIC8vIHByb3ZpZGVyczogWyBTdHJpcGVTY3JpcHRUYWcgXSxcbiAgZXhwb3J0czpbIC4uLmRlY2xhcmF0aW9ucyBdXG59KSBleHBvcnQgY2xhc3MgU3RyaXBlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QocHVibGlzaGFibGVLZXk/OiBzdHJpbmcsIG9wdGlvbnM/OiBTdHJpcGVJbnN0YW5jZU9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBTdHJpcGVTY3JpcHRUYWcsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTVFJJUEVfUFVCTElTSEFCTEVfS0VZLFxuICAgICAgICAgIHVzZVZhbHVlOiBwdWJsaXNoYWJsZUtleVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RSSVBFX09QVElPTlMsXG4gICAgICAgICAgdXNlVmFsdWU6IG9wdGlvbnNcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBQbGVhc2UgaW1wb3J0IGBTdHJpcGVNb2R1bGVgIGRpcmVjdGx5XG4gKi9cbmV4cG9ydCBjb25zdCBNb2R1bGUgPSBTdHJpcGVNb2R1bGVcbiJdfQ==