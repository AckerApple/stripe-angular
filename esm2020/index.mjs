import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY } from './StripeTypes';
import { StripeComponent } from "./components/StripeComponent";
import { StripeScriptTag } from "./StripeScriptTag";
import { StripeSource } from "./components/StripeSource.component";
import { StripeCard } from "./components/StripeCard.component";
import { StripeBank } from "./components/StripeBank.component";
import * as i0 from "@angular/core";
export * from "./StripeTypes";
export { StripeComponent } from "./components/StripeComponent";
export { StripeScriptTag } from "./StripeScriptTag";
export { StripeSource } from "./components/StripeSource.component";
export { StripeCard } from "./components/StripeCard.component";
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
StripeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StripeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeModule, declarations: [StripeComponent,
        StripeSource,
        StripeCard,
        StripeBank], imports: [CommonModule], exports: [StripeComponent,
        StripeSource,
        StripeCard,
        StripeBank] });
StripeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations,
                    // providers: [ StripeScriptTag ],
                    exports: [...declarations]
                }]
        }] });
/**
 * @deprecated Please import `StripeModule` directly
 */
export const Module = StripeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBRzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUE7QUFHbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBRzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTs7QUFsQjlELGNBQWMsZUFBZSxDQUFBO0FBTzdCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQTtBQUc5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFHbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFBO0FBR2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUc5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFFOUQsTUFBTSxZQUFZLEdBQUc7SUFDbkIsZUFBZTtJQUNmLFlBQVk7SUFDWixVQUFVO0lBQ1YsVUFBVTtDQUNYLENBQUE7QUFTRSxNQUFNLE9BQU8sWUFBWTtJQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLGNBQXVCLEVBQUUsT0FBOEI7UUFDcEUsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmO29CQUNFLE9BQU8sRUFBRSxzQkFBc0I7b0JBQy9CLFFBQVEsRUFBRSxjQUFjO2lCQUN6QjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsY0FBYztvQkFDdkIsUUFBUSxFQUFFLE9BQU87aUJBQ2xCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7MEdBaEJhLFlBQVk7MkdBQVosWUFBWSxpQkFiMUIsZUFBZTtRQUNmLFlBQVk7UUFDWixVQUFVO1FBQ1YsVUFBVSxhQUtSLFlBQVksYUFSZCxlQUFlO1FBQ2YsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVOzJHQVVJLFlBQVksWUFObEI7WUFDTixZQUFZO1NBQ2I7NEZBSWEsWUFBWTtrQkFQM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUM7d0JBQ04sWUFBWTtxQkFDYjtvQkFDRCxZQUFZO29CQUNiLGtDQUFrQztvQkFDakMsT0FBTyxFQUFDLENBQUUsR0FBRyxZQUFZLENBQUU7aUJBQzVCOztBQW1CRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9TdHJpcGVUeXBlc1wiXG5cbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgU1RSSVBFX09QVElPTlMsIFNUUklQRV9QVUJMSVNIQUJMRV9LRVkgfSBmcm9tICcuL1N0cmlwZVR5cGVzJ1xuaW1wb3J0IHsgU3RyaXBlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDb21wb25lbnRcIlxuZXhwb3J0IHsgU3RyaXBlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVDb21wb25lbnRcIlxuXG5pbXBvcnQgeyBTdHJpcGVTY3JpcHRUYWcgfSBmcm9tIFwiLi9TdHJpcGVTY3JpcHRUYWdcIlxuZXhwb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4vU3RyaXBlU2NyaXB0VGFnXCJcblxuaW1wb3J0IHsgU3RyaXBlU291cmNlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdHJpcGVTb3VyY2UuY29tcG9uZW50XCJcbmV4cG9ydCB7IFN0cmlwZVNvdXJjZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5cbmltcG9ydCB7IFN0cmlwZUNhcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUNhcmQuY29tcG9uZW50XCJcbmV4cG9ydCB7IFN0cmlwZUNhcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N0cmlwZUNhcmQuY29tcG9uZW50XCJcblxuaW1wb3J0IHsgU3RyaXBlQmFuayB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnRcIlxuZXhwb3J0IHsgU3RyaXBlQmFuayB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3RyaXBlQmFuay5jb21wb25lbnRcIlxuXG5jb25zdCBkZWNsYXJhdGlvbnMgPSBbXG4gIFN0cmlwZUNvbXBvbmVudCwgLy8gaWdub3JlIGRvIG5vdCB1c2UgKGhhcyB0byBiZSBoZXJlIGZvciBleHRlbmRzIHB1cnBvc2VzKVxuICBTdHJpcGVTb3VyY2UsXG4gIFN0cmlwZUNhcmQsXG4gIFN0cmlwZUJhbmtcbl1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czpbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9ucyxcbiAvLyBwcm92aWRlcnM6IFsgU3RyaXBlU2NyaXB0VGFnIF0sXG4gIGV4cG9ydHM6WyAuLi5kZWNsYXJhdGlvbnMgXVxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KHB1Ymxpc2hhYmxlS2V5Pzogc3RyaW5nLCBvcHRpb25zPzogc3RyaXBlLlN0cmlwZU9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0cmlwZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RyaXBlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFN0cmlwZVNjcmlwdFRhZyxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUUklQRV9QVUJMSVNIQUJMRV9LRVksXG4gICAgICAgICAgdXNlVmFsdWU6IHB1Ymxpc2hhYmxlS2V5XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTVFJJUEVfT1BUSU9OUyxcbiAgICAgICAgICB1c2VWYWx1ZTogb3B0aW9uc1xuICAgICAgICB9XG4gICAgICBdLFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIFBsZWFzZSBpbXBvcnQgYFN0cmlwZU1vZHVsZWAgZGlyZWN0bHlcbiAqL1xuZXhwb3J0IGNvbnN0IE1vZHVsZSA9IFN0cmlwZU1vZHVsZVxuIl19