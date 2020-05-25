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
        _this.cardMounted = new EventEmitter();
        return _this;
    }
    StripeCard.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.init.call(this)
            .then(function () {
            _this.elements = _this.stripe.elements().create('card', _this.options);
            _this.elements.mount(_this.ElementRef.nativeElement);
            _this.cardMounted.emit(_this.elements);
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
    __decorate([
        Output()
    ], StripeCard.prototype, "cardMounted", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdHJpcGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3RyaXBlQ2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRzNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFVcEQ7SUFBZ0MsOEJBQVk7SUFRN0Msb0JBQ1MsVUFBcUIsRUFDckIsZUFBK0I7UUFGeEMsWUFJRSxrQkFBTSxlQUFlLENBQUMsU0FDdkI7UUFKUSxnQkFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixxQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFOOUIsaUJBQVcsR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUUxRCxpQkFBVyxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFBOztJQU81RCxDQUFDO0lBRUQsNkJBQVEsR0FBUjtRQUFBLGlCQWNDO1FBYkMsaUJBQU0sSUFBSSxXQUFFO2FBQ1gsSUFBSSxDQUFDO1lBQ0osS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ25FLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUE7WUFFbEQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXJDLEtBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUMsTUFBVTtnQkFDbEQsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUNoQixLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxLQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBQTtpQkFDckQ7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGdDQUFXLEdBQVgsVUFDRSxTQUFjO1FBRGhCLGlCQW9CQztRQWpCQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7YUFDdkQsSUFBSSxDQUFDLFVBQUMsTUFBVTtZQUNmLElBQUcsTUFBTSxDQUFDLEtBQUssRUFBQztnQkFDZCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLGtCQUFrQixFQUFFO29CQUN6QyxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxLQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBQTtpQkFDckQ7cUJBQUk7b0JBQ0gsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUMvQixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUE7aUJBQ25CO2FBQ0Y7aUJBQUk7Z0JBQ0gsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzlDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQTthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7Z0JBMUNtQixVQUFVO2dCQUNMLGVBQWU7O0lBVC9CO1FBQVIsS0FBSyxFQUFFOytDQUEyQjtJQUUxQjtRQUFSLEtBQUssRUFBRTs2Q0FBbUI7SUFDakI7UUFBVCxNQUFNLEVBQUU7bURBQTJEO0lBRTFEO1FBQVQsTUFBTSxFQUFFO21EQUFtRDtJQU45QyxVQUFVO1FBUnpCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxzTkFJVDtZQUNELFFBQVEsRUFBQyxZQUFZO1NBQ3RCLENBQUM7T0FBYyxVQUFVLENBb0R6QjtJQUFELGlCQUFDO0NBQUEsQUFwREUsQ0FBZ0MsWUFBWSxHQW9EOUM7U0FwRGUsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHtcbiAgU3RyaXBlVG9rZW4sIFN0cmlwZUNhcmRPcHRpb25zIH0gZnJvbSBcIi4uL1N0cmlwZVR5cGVzXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuaW1wb3J0IHsgU3RyaXBlU291cmNlIH0gZnJvbSBcIi4vU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzdHJpcGUtY2FyZFwiLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTdHJpcGVTY3JpcHRUYWcuU3RyaXBlSW5zdGFuY2VcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiY29sb3I6cmVkO1wiPlN0cmlwZSBQdWJsaXNoYWJsZUtleSBOT1QgU0VULiBVc2UgbWV0aG9kIFN0cmlwZVNjcmlwdFRhZy5zZXRQdWJsaXNoYWJsZUtleSgpPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZXhwb3J0QXM6XCJTdHJpcGVDYXJkXCJcbn0pIGV4cG9ydCBjbGFzcyBTdHJpcGVDYXJkIGV4dGVuZHMgU3RyaXBlU291cmNle1xuICBASW5wdXQoKSBvcHRpb25zITpTdHJpcGVDYXJkT3B0aW9uc1xuXG4gIEBJbnB1dCgpIHRva2VuITpTdHJpcGVUb2tlblxuICBAT3V0cHV0KCkgdG9rZW5DaGFuZ2U6RXZlbnRFbWl0dGVyPFN0cmlwZVRva2VuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBPdXRwdXQoKSBjYXJkTW91bnRlZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBFbGVtZW50UmVmOkVsZW1lbnRSZWYsXG4gICAgcHVibGljIFN0cmlwZVNjcmlwdFRhZzpTdHJpcGVTY3JpcHRUYWdcbiAgKXtcbiAgICBzdXBlcihTdHJpcGVTY3JpcHRUYWcpXG4gIH1cblxuICBuZ09uSW5pdCgpe1xuICAgIHN1cGVyLmluaXQoKVxuICAgIC50aGVuKCgpPT57XG4gICAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoKS5jcmVhdGUoJ2NhcmQnLCB0aGlzLm9wdGlvbnMpXG4gICAgICB0aGlzLmVsZW1lbnRzLm1vdW50KHRoaXMuRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KVxuICAgICAgXG4gICAgICB0aGlzLmNhcmRNb3VudGVkLmVtaXQodGhpcy5lbGVtZW50cyk7XG5cbiAgICAgIHRoaXMuZWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKHJlc3VsdDphbnkpPT57XG4gICAgICAgIGlmKCByZXN1bHQuZXJyb3IgKXtcbiAgICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZVRva2VuKFxuICAgIGV4dHJhRGF0YT86YW55XG4gICk6UHJvbWlzZTxTdHJpcGVUb2tlbj57XG4gICAgZGVsZXRlIHRoaXMuaW52YWxpZFxuICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KHRoaXMuaW52YWxpZClcblxuICAgIHJldHVybiB0aGlzLnN0cmlwZS5jcmVhdGVUb2tlbih0aGlzLmVsZW1lbnRzLCBleHRyYURhdGEpXG4gICAgLnRoZW4oKHJlc3VsdDphbnkpPT57XG4gICAgICBpZihyZXN1bHQuZXJyb3Ipe1xuICAgICAgICBpZiggcmVzdWx0LmVycm9yLnR5cGU9PVwidmFsaWRhdGlvbl9lcnJvclwiICl7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQoIHRoaXMuaW52YWxpZD1yZXN1bHQuZXJyb3IgKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmNhdGNoZXIuZW1pdChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yXG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnRva2VuQ2hhbmdlLmVtaXQodGhpcy50b2tlbj1yZXN1bHQudG9rZW4pXG4gICAgICAgIHJldHVybiByZXN1bHQudG9rZW5cbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=