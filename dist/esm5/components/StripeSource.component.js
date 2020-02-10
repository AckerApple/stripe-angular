import { __decorate, __extends } from "tslib";
import { Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeComponent } from "./StripeComponent";
var StripeSource = /** @class */ (function (_super) {
    __extends(StripeSource, _super);
    function StripeSource(StripeScriptTag) {
        var _this = _super.call(this, StripeScriptTag) || this;
        _this.StripeScriptTag = StripeScriptTag;
        _this.sourceChange = new EventEmitter();
        return _this;
    }
    StripeSource.prototype.createSource = function () {
        var _this = this;
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createSource(this.elements)
            .then(function (result) {
            if (result.error) {
                if (result.error.type == "validation_error") {
                    _this.invalidChange.emit(_this.invalid = result.error);
                }
                else {
                    _this.catcher.emit(result.error);
                    throw result.error;
                }
            }
            else {
                _this.sourceChange.emit(_this.source = result.source);
                return result.source;
            }
        });
    };
    StripeSource.ctorParameters = function () { return [
        { type: StripeScriptTag }
    ]; };
    __decorate([
        Input()
    ], StripeSource.prototype, "source", void 0);
    __decorate([
        Output()
    ], StripeSource.prototype, "sourceChange", void 0);
    StripeSource = __decorate([
        Component({
            selector: "stripe-source",
            template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
            exportAs: "StripeSource"
        })
    ], StripeSource);
    return StripeSource;
}(StripeComponent));
export { StripeSource };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlU291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0cmlwZS1hbmd1bGFyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TdHJpcGVTb3VyY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUN2QyxNQUFNLGVBQWUsQ0FBQTtBQUl0QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBVWhEO0lBQWtDLGdDQUFlO0lBT2xELHNCQUNTLGVBQStCO1FBRHhDLFlBR0Usa0JBQU0sZUFBZSxDQUFDLFNBQ3ZCO1FBSFEscUJBQWUsR0FBZixlQUFlLENBQWdCO1FBTDlCLGtCQUFZLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUE7O0lBUTFFLENBQUM7SUFFRCxtQ0FBWSxHQUFaO1FBQUEsaUJBb0JDO1FBbkJDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FDN0IsSUFBSSxDQUFDLFFBQVEsQ0FDZDthQUNBLElBQUksQ0FBQyxVQUFDLE1BQVU7WUFDZixJQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUM7Z0JBQ2QsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksSUFBRSxrQkFBa0IsRUFBRTtvQkFDekMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUUsS0FBSSxDQUFDLE9BQU8sR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLENBQUE7aUJBQ3JEO3FCQUFJO29CQUNILEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDL0IsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFBO2lCQUNuQjthQUNGO2lCQUFJO2dCQUNILEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNqRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUE7YUFDckI7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7O2dCQXpCd0IsZUFBZTs7SUFOL0I7UUFBUixLQUFLLEVBQUU7Z0RBQXlCO0lBQ3ZCO1FBQVQsTUFBTSxFQUFFO3NEQUFpRTtJQUg1RCxZQUFZO1FBUjNCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxzTkFJVDtZQUNELFFBQVEsRUFBQyxjQUFjO1NBQ3hCLENBQUM7T0FBYyxZQUFZLENBa0MzQjtJQUFELG1CQUFDO0NBQUEsQUFsQ0UsQ0FBa0MsZUFBZSxHQWtDbkQ7U0FsQ2UsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50XG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7XG4gIFN0cmlwZVRva2VuLCBTdHJpcGVTb3VyY2UgYXMgU3RyaXBlU291cmNlVHlwZVxufSBmcm9tIFwiLi4vU3RyaXBlVHlwZXNcIlxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4uL1N0cmlwZVNjcmlwdFRhZ1wiXG5pbXBvcnQgeyBTdHJpcGVDb21wb25lbnQgfSBmcm9tIFwiLi9TdHJpcGVDb21wb25lbnRcIlxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwic3RyaXBlLXNvdXJjZVwiLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTdHJpcGVTY3JpcHRUYWcuU3RyaXBlSW5zdGFuY2VcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiY29sb3I6cmVkO1wiPlN0cmlwZSBQdWJsaXNoYWJsZUtleSBOT1QgU0VULiBVc2UgbWV0aG9kIFN0cmlwZVNjcmlwdFRhZy5zZXRQdWJsaXNoYWJsZUtleSgpPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZXhwb3J0QXM6XCJTdHJpcGVTb3VyY2VcIlxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZVNvdXJjZSBleHRlbmRzIFN0cmlwZUNvbXBvbmVudHtcblxuICBASW5wdXQoKSBzb3VyY2UhOlN0cmlwZVNvdXJjZVR5cGVcbiAgQE91dHB1dCgpIHNvdXJjZUNoYW5nZTpFdmVudEVtaXR0ZXI8U3RyaXBlU291cmNlVHlwZT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBlbGVtZW50czphbnlcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe1xuICAgIHN1cGVyKFN0cmlwZVNjcmlwdFRhZylcbiAgfVxuXG4gIGNyZWF0ZVNvdXJjZSgpOlByb21pc2U8U3RyaXBlVG9rZW4+e1xuICAgIGRlbGV0ZSB0aGlzLmludmFsaWRcbiAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWQpXG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcGUuY3JlYXRlU291cmNlKFxuICAgICAgdGhpcy5lbGVtZW50c1xuICAgIClcbiAgICAudGhlbigocmVzdWx0OmFueSk9PntcbiAgICAgIGlmKHJlc3VsdC5lcnJvcil7XG4gICAgICAgIGlmKCByZXN1bHQuZXJyb3IudHlwZT09XCJ2YWxpZGF0aW9uX2Vycm9yXCIgKXtcbiAgICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY2F0Y2hlci5lbWl0KHJlc3VsdC5lcnJvcilcbiAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3JcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuc291cmNlQ2hhbmdlLmVtaXQodGhpcy5zb3VyY2U9cmVzdWx0LnNvdXJjZSlcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zb3VyY2VcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=