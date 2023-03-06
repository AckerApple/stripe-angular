import { Input, Output, EventEmitter, Component } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../StripeScriptTag";
export class StripeComponent {
    constructor(StripeScriptTag) {
        this.StripeScriptTag = StripeScriptTag;
        this.catcher = new EventEmitter();
        this.invalidChange = new EventEmitter();
    }
    ngOnInit() {
        this.init();
    }
    init() {
        return this.StripeScriptTag.promiseInstance()
            .then(i => this.stripe = i);
    }
}
StripeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeComponent, deps: [{ token: i1.StripeScriptTag }], target: i0.ɵɵFactoryTarget.Component });
StripeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: StripeComponent, selector: "stripe-component", inputs: { invalid: "invalid" }, outputs: { catcher: "catch", invalidChange: "invalidChange" }, ngImport: i0, template: ``, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "stripe-component", template: ``
                }]
        }], ctorParameters: function () { return [{ type: i1.StripeScriptTag }]; }, propDecorators: { catcher: [{
                type: Output,
                args: ["catch"]
            }], invalid: [{
                type: Input
            }], invalidChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvU3RyaXBlQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQ3ZDLE1BQU0sZUFBZSxDQUFBOzs7QUFNdEIsTUFBTSxPQUFPLGVBQWU7SUFRMUIsWUFDUyxlQUErQjtRQUEvQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFSdkIsWUFBTyxHQUE4QixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRzlELGtCQUFhLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUE7SUFNckUsQ0FBQztJQUVILFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDYixDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUU7YUFDNUMsSUFBSSxDQUFFLENBQUMsQ0FBQSxFQUFFLENBQUEsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUUsQ0FBQTtJQUMzQixDQUFDOzs2R0FuQlUsZUFBZTtpR0FBZixlQUFlLHVKQUZjLEVBQUU7NEZBRS9CLGVBQWU7a0JBSDNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxFQUFFO2lCQUMzQztzR0FFa0IsT0FBTztzQkFBdkIsTUFBTTt1QkFBQyxPQUFPO2dCQUVOLE9BQU87c0JBQWYsS0FBSztnQkFDSSxhQUFhO3NCQUF0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb21wb25lbnRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4uL1N0cmlwZVNjcmlwdFRhZ1wiXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzdHJpcGUtY29tcG9uZW50XCIsIHRlbXBsYXRlOiBgYFxufSlcbmV4cG9ydCBjbGFzcyBTdHJpcGVDb21wb25lbnR7XG4gIEBPdXRwdXQoXCJjYXRjaFwiKSBjYXRjaGVyOkV2ZW50RW1pdHRlcjxzdHJpcGUuRXJyb3I+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgQElucHV0KCkgaW52YWxpZD86c3RyaXBlLkVycm9yXG4gIEBPdXRwdXQoKSBpbnZhbGlkQ2hhbmdlOkV2ZW50RW1pdHRlcjxzdHJpcGUuRXJyb3I+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgc3RyaXBlITpzdHJpcGUuU3RyaXBlXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIFN0cmlwZVNjcmlwdFRhZzpTdHJpcGVTY3JpcHRUYWdcbiAgKXt9XG5cbiAgbmdPbkluaXQoKXtcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCgpOlByb21pc2U8c3RyaXBlLlN0cmlwZT57XG4gICAgcmV0dXJuIHRoaXMuU3RyaXBlU2NyaXB0VGFnLnByb21pc2VJbnN0YW5jZSgpXG4gICAgLnRoZW4oIGk9PnRoaXMuc3RyaXBlPWkgKVxuICB9XG59Il19