import { __decorate, __extends } from "tslib";
import { ElementRef, Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeSource } from "./StripeSource.component";
var StripeCard = /** @class */ (function (_super) {
    __extends(StripeCard, _super);
    function StripeCard(ElementRef, StripeScriptTag) {
        var _this = _super.call(this, StripeScriptTag) || this;
        _this.ElementRef = ElementRef;
        _this.StripeScriptTag = StripeScriptTag;
        _this.tokenChange = new EventEmitter();
        return _this;
    }
    StripeCard.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.init.call(this)
            .then(function () {
            _this.elements = _this.stripe.elements().create('card', _this.options);
            _this.elements.mount(_this.ElementRef.nativeElement);
            _this.elements.addEventListener('change', function (result) {
                if (result.error) {
                    _this.invalidChange.emit(_this.invalid = result.error);
                }
            });
        });
    };
    StripeCard.prototype.createToken = function (extraData) {
        var _this = this;
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createToken(this.elements, extraData)
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
                _this.tokenChange.emit(_this.token = result.token);
                return result.token;
            }
        });
    };
    StripeCard.ctorParameters = function () { return [
        { type: ElementRef },
        { type: StripeScriptTag }
    ]; };
    __decorate([
        Input()
    ], StripeCard.prototype, "options", void 0);
    __decorate([
        Input()
    ], StripeCard.prototype, "token", void 0);
    __decorate([
        Output()
    ], StripeCard.prototype, "tokenChange", void 0);
    StripeCard = __decorate([
        Component({
            selector: "stripe-card",
            template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
            exportAs: "StripeCard"
        })
    ], StripeCard);
    return StripeCard;
}(StripeSource));
export { StripeCard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdHJpcGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3RyaXBlQ2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRzNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFVcEQ7SUFBZ0MsOEJBQVk7SUFNN0Msb0JBQ1MsVUFBcUIsRUFDckIsZUFBK0I7UUFGeEMsWUFJRSxrQkFBTSxlQUFlLENBQUMsU0FDdkI7UUFKUSxnQkFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixxQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFKOUIsaUJBQVcsR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQTs7SUFPcEUsQ0FBQztJQUVELDZCQUFRLEdBQVI7UUFBQSxpQkFZQztRQVhDLGlCQUFNLElBQUksV0FBRTthQUNYLElBQUksQ0FBQztZQUNKLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNuRSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBRWxELEtBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUMsTUFBVTtnQkFDbEQsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUNoQixLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxLQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBQTtpQkFDckQ7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGdDQUFXLEdBQVgsVUFDRSxTQUFjO1FBRGhCLGlCQW9CQztRQWpCQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7YUFDdkQsSUFBSSxDQUFDLFVBQUMsTUFBVTtZQUNmLElBQUcsTUFBTSxDQUFDLEtBQUssRUFBQztnQkFDZCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLGtCQUFrQixFQUFFO29CQUN6QyxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxLQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBQTtpQkFDckQ7cUJBQUk7b0JBQ0gsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUMvQixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUE7aUJBQ25CO2FBQ0Y7aUJBQUk7Z0JBQ0gsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzlDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQTthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7Z0JBeENtQixVQUFVO2dCQUNMLGVBQWU7O0lBUC9CO1FBQVIsS0FBSyxFQUFFOytDQUEyQjtJQUUxQjtRQUFSLEtBQUssRUFBRTs2Q0FBbUI7SUFDakI7UUFBVCxNQUFNLEVBQUU7bURBQTJEO0lBSnRELFVBQVU7UUFSekIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLHNOQUlUO1lBQ0QsUUFBUSxFQUFDLFlBQVk7U0FDdEIsQ0FBQztPQUFjLFVBQVUsQ0FnRHpCO0lBQUQsaUJBQUM7Q0FBQSxBQWhERSxDQUFnQyxZQUFZLEdBZ0Q5QztTQWhEZSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXG5pbXBvcnQge1xuICBTdHJpcGVUb2tlbiwgU3RyaXBlQ2FyZE9wdGlvbnMgfSBmcm9tIFwiLi4vU3RyaXBlVHlwZXNcIlxuaW1wb3J0IHsgU3RyaXBlU2NyaXB0VGFnIH0gZnJvbSBcIi4uL1N0cmlwZVNjcmlwdFRhZ1wiXG5pbXBvcnQgeyBTdHJpcGVTb3VyY2UgfSBmcm9tIFwiLi9TdHJpcGVTb3VyY2UuY29tcG9uZW50XCJcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInN0cmlwZS1jYXJkXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVN0cmlwZVNjcmlwdFRhZy5TdHJpcGVJbnN0YW5jZVwiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJjb2xvcjpyZWQ7XCI+U3RyaXBlIFB1Ymxpc2hhYmxlS2V5IE5PVCBTRVQuIFVzZSBtZXRob2QgU3RyaXBlU2NyaXB0VGFnLnNldFB1Ymxpc2hhYmxlS2V5KCk8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBleHBvcnRBczpcIlN0cmlwZUNhcmRcIlxufSkgZXhwb3J0IGNsYXNzIFN0cmlwZUNhcmQgZXh0ZW5kcyBTdHJpcGVTb3VyY2V7XG4gIEBJbnB1dCgpIG9wdGlvbnMhOlN0cmlwZUNhcmRPcHRpb25zXG5cbiAgQElucHV0KCkgdG9rZW4hOlN0cmlwZVRva2VuXG4gIEBPdXRwdXQoKSB0b2tlbkNoYW5nZTpFdmVudEVtaXR0ZXI8U3RyaXBlVG9rZW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIEVsZW1lbnRSZWY6RWxlbWVudFJlZixcbiAgICBwdWJsaWMgU3RyaXBlU2NyaXB0VGFnOlN0cmlwZVNjcmlwdFRhZ1xuICApe1xuICAgIHN1cGVyKFN0cmlwZVNjcmlwdFRhZylcbiAgfVxuXG4gIG5nT25Jbml0KCl7XG4gICAgc3VwZXIuaW5pdCgpXG4gICAgLnRoZW4oKCk9PntcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cygpLmNyZWF0ZSgnY2FyZCcsIHRoaXMub3B0aW9ucylcbiAgICAgIHRoaXMuZWxlbWVudHMubW91bnQodGhpcy5FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpXG5cbiAgICAgIHRoaXMuZWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKHJlc3VsdDphbnkpPT57XG4gICAgICAgIGlmKCByZXN1bHQuZXJyb3IgKXtcbiAgICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZVRva2VuKFxuICAgIGV4dHJhRGF0YT86YW55XG4gICk6UHJvbWlzZTxTdHJpcGVUb2tlbj57XG4gICAgZGVsZXRlIHRoaXMuaW52YWxpZFxuICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KHRoaXMuaW52YWxpZClcblxuICAgIHJldHVybiB0aGlzLnN0cmlwZS5jcmVhdGVUb2tlbih0aGlzLmVsZW1lbnRzLCBleHRyYURhdGEpXG4gICAgLnRoZW4oKHJlc3VsdDphbnkpPT57XG4gICAgICBpZihyZXN1bHQuZXJyb3Ipe1xuICAgICAgICBpZiggcmVzdWx0LmVycm9yLnR5cGU9PVwidmFsaWRhdGlvbl9lcnJvclwiICl7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQoIHRoaXMuaW52YWxpZD1yZXN1bHQuZXJyb3IgKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmNhdGNoZXIuZW1pdChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yXG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnRva2VuQ2hhbmdlLmVtaXQodGhpcy50b2tlbj1yZXN1bHQudG9rZW4pXG4gICAgICAgIHJldHVybiByZXN1bHQudG9rZW5cbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=