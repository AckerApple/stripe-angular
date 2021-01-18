import { ElementRef, Input, Output, EventEmitter, Component } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeSource } from "./StripeSource.component";
export class StripeCard extends StripeSource {
    constructor(ElementRef, StripeScriptTag) {
        super(StripeScriptTag);
        this.ElementRef = ElementRef;
        this.StripeScriptTag = StripeScriptTag;
        this.tokenChange = new EventEmitter();
        this.cardMounted = new EventEmitter();
        this.complete = false;
        this.completeChange = new EventEmitter();
        this.changed = new EventEmitter();
        this.drawn = false;
    }
    ngOnInit() {
        super.init().then(() => this.redraw());
    }
    ngOnChanges(changes) {
        if (this.drawn && (changes.options || changes.createOptions)) {
            this.redraw();
        }
    }
    redraw() {
      if (this.drawn) {
          this.elements.unmount();
          this.elements.destroy();
      }
      this.elements = this.stripe.elements(this.createOptions).create('card', this.options);
        this.elements.mount(this.ElementRef.nativeElement);
        this.cardMounted.emit(this.elements);
        this.elements.on('change', (result) => {
            this.changed.emit(result);
            if (result.complete || (this.complete && !result.complete)) {
                this.completeChange.emit(this.complete = result.complete);
            }
        });
        this.elements.addEventListener('change', (result) => {
            if (result.error) {
                this.invalidChange.emit(this.invalid = result.error);
            }
        });
        this.drawn = true;
    }
    createToken(extraData) {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createToken(this.elements, extraData)
            .then((result) => {
            if (result.error) {
                if (result.error.type == "validation_error") {
                    this.invalidChange.emit(this.invalid = result.error);
                }
                else {
                    this.catcher.emit(result.error);
                    throw result.error;
                }
            }
            else {
                this.tokenChange.emit(this.token = result.token);
                return result.token;
            }
        });
    }
}
StripeCard.decorators = [
    { type: Component, args: [{
                selector: "stripe-card",
                template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                exportAs: "StripeCard"
            },] }
];
StripeCard.ctorParameters = () => [
    { type: ElementRef },
    { type: StripeScriptTag }
];
StripeCard.propDecorators = {
    options: [{ type: Input }],
    createOptions: [{ type: Input }],
    token: [{ type: Input }],
    tokenChange: [{ type: Output }],
    cardMounted: [{ type: Output }],
    complete: [{ type: Input }],
    completeChange: [{ type: Output }],
    changed: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaXBlQ2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TdHJpcGVDYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBVXBELE1BQU0sT0FBTyxVQUFXLFNBQVEsWUFBWTtJQWU3QyxZQUNTLFVBQXFCLEVBQ3JCLGVBQStCO1FBRXRDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUhmLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBYjlCLGdCQUFXLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFM0QsZ0JBQVcsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUVuRCxhQUFRLEdBQVksS0FBSyxDQUFBO1FBQ3hCLG1CQUFjLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFekQsWUFBTyxHQUFrQyxJQUFJLFlBQVksRUFBRSxDQUFBO1FBRXJFLFVBQUssR0FBRyxLQUFLLENBQUE7SUFPYixDQUFDO0lBRUQsUUFBUTtRQUNOLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFLENBQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUVELFdBQVcsQ0FBRSxPQUFXO1FBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUVsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBVyxFQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDekIsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0Q7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBVSxFQUFDLEVBQUU7WUFDckQsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBQTthQUNyRDtRQUNILENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVELFdBQVcsQ0FDVCxTQUFjO1FBRWQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUVyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO2FBQ3ZELElBQUksQ0FBQyxDQUFDLE1BQVUsRUFBQyxFQUFFO1lBQ2xCLElBQUcsTUFBTSxDQUFDLEtBQUssRUFBQztnQkFDZCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLGtCQUFrQixFQUFFO29CQUN6QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBQTtpQkFDckQ7cUJBQUk7b0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUMvQixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUE7aUJBQ25CO2FBQ0Y7aUJBQUk7Z0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzlDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQTthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7O1lBakZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsUUFBUSxFQUFDLFlBQVk7YUFDdEI7OztZQVpDLFVBQVU7WUFDSCxlQUFlOzs7c0JBWXJCLEtBQUs7b0JBRUwsS0FBSzswQkFDTCxNQUFNOzBCQUVOLE1BQU07dUJBRU4sS0FBSzs2QkFDTCxNQUFNO3NCQUVOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcbmltcG9ydCB7IFN0cmlwZVNjcmlwdFRhZyB9IGZyb20gXCIuLi9TdHJpcGVTY3JpcHRUYWdcIlxuaW1wb3J0IHsgU3RyaXBlU291cmNlIH0gZnJvbSBcIi4vU3RyaXBlU291cmNlLmNvbXBvbmVudFwiXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzdHJpcGUtY2FyZFwiLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTdHJpcGVTY3JpcHRUYWcuU3RyaXBlSW5zdGFuY2VcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiY29sb3I6cmVkO1wiPlN0cmlwZSBQdWJsaXNoYWJsZUtleSBOT1QgU0VULiBVc2UgbWV0aG9kIFN0cmlwZVNjcmlwdFRhZy5zZXRQdWJsaXNoYWJsZUtleSgpPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZXhwb3J0QXM6XCJTdHJpcGVDYXJkXCJcbn0pIGV4cG9ydCBjbGFzcyBTdHJpcGVDYXJkIGV4dGVuZHMgU3RyaXBlU291cmNlIHtcbiAgQElucHV0KCkgb3B0aW9ucyE6c3RyaXBlLmVsZW1lbnRzLkVsZW1lbnRzT3B0aW9uc1xuXG4gIEBJbnB1dCgpIHRva2VuITogc3RyaXBlLlRva2VuXG4gIEBPdXRwdXQoKSB0b2tlbkNoYW5nZTpFdmVudEVtaXR0ZXI8c3RyaXBlLlRva2VuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBPdXRwdXQoKSBjYXJkTW91bnRlZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBJbnB1dCgpIGNvbXBsZXRlOiBib29sZWFuID0gZmFsc2VcbiAgQE91dHB1dCgpIGNvbXBsZXRlQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBPdXRwdXQoKSBjaGFuZ2VkOkV2ZW50RW1pdHRlcjxJQ2FyZENoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGRyYXduID0gZmFsc2VcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgRWxlbWVudFJlZjpFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBTdHJpcGVTY3JpcHRUYWc6U3RyaXBlU2NyaXB0VGFnXG4gICl7XG4gICAgc3VwZXIoU3RyaXBlU2NyaXB0VGFnKVxuICB9XG5cbiAgbmdPbkluaXQoKXtcbiAgICBzdXBlci5pbml0KCkudGhlbigoKT0+dGhpcy5yZWRyYXcoKSlcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCBjaGFuZ2VzOmFueSApe1xuICAgIGlmICh0aGlzLmRyYXduICYmIGNoYW5nZXMub3B0aW9ucykge1xuICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG4gIH1cblxuICByZWRyYXcoKSB7XG4gICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKCkuY3JlYXRlKCdjYXJkJywgdGhpcy5vcHRpb25zKVxuICAgIHRoaXMuZWxlbWVudHMubW91bnQodGhpcy5FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpXG5cbiAgICB0aGlzLmNhcmRNb3VudGVkLmVtaXQodGhpcy5lbGVtZW50cyk7XG4gICAgdGhpcy5lbGVtZW50cy5vbignY2hhbmdlJywgKHJlc3VsdDogYW55KT0+e1xuICAgICAgdGhpcy5jaGFuZ2VkLmVtaXQocmVzdWx0KVxuICAgICAgaWYgKHJlc3VsdC5jb21wbGV0ZSB8fCAodGhpcy5jb21wbGV0ZSAmJiAhcmVzdWx0LmNvbXBsZXRlKSkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlQ2hhbmdlLmVtaXQodGhpcy5jb21wbGV0ZSA9IHJlc3VsdC5jb21wbGV0ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnRzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChyZXN1bHQ6YW55KT0+e1xuICAgICAgaWYoIHJlc3VsdC5lcnJvciApe1xuICAgICAgICB0aGlzLmludmFsaWRDaGFuZ2UuZW1pdCggdGhpcy5pbnZhbGlkPXJlc3VsdC5lcnJvciApXG4gICAgICB9XG4gICAgfSlcblxuICAgIHRoaXMuZHJhd24gPSB0cnVlO1xuICB9XG5cbiAgY3JlYXRlVG9rZW4oXG4gICAgZXh0cmFEYXRhPzphbnlcbiAgKTpQcm9taXNlPHN0cmlwZS5Ub2tlbj57XG4gICAgZGVsZXRlIHRoaXMuaW52YWxpZFxuICAgIHRoaXMuaW52YWxpZENoYW5nZS5lbWl0KHRoaXMuaW52YWxpZClcblxuICAgIHJldHVybiB0aGlzLnN0cmlwZS5jcmVhdGVUb2tlbih0aGlzLmVsZW1lbnRzLCBleHRyYURhdGEpXG4gICAgLnRoZW4oKHJlc3VsdDphbnkpPT57XG4gICAgICBpZihyZXN1bHQuZXJyb3Ipe1xuICAgICAgICBpZiggcmVzdWx0LmVycm9yLnR5cGU9PVwidmFsaWRhdGlvbl9lcnJvclwiICl7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkQ2hhbmdlLmVtaXQoIHRoaXMuaW52YWxpZD1yZXN1bHQuZXJyb3IgKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmNhdGNoZXIuZW1pdChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yXG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnRva2VuQ2hhbmdlLmVtaXQodGhpcy50b2tlbj1yZXN1bHQudG9rZW4pXG4gICAgICAgIHJldHVybiByZXN1bHQudG9rZW5cbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmludGVyZmFjZSBJQ2FyZENoYW5nZUV2ZW50IHtcbiAgXCJlbGVtZW50VHlwZVwiOiBzdHJpbmdcbiAgZXJyb3I/OiB7XG4gICAgXCJjb2RlXCI6IHN0cmluZ1xuICAgIFwidHlwZVwiOiBzdHJpbmdcbiAgICBcIm1lc3NhZ2VcIjogc3RyaW5nXG4gIH0sXG4gIFwidmFsdWVcIjoge1xuICAgIFwicG9zdGFsQ29kZVwiOiBzdHJpbmdcbiAgfSxcbiAgXCJlbXB0eVwiOiBib29sZWFuLFxuICBcImNvbXBsZXRlXCI6IGJvb2xlYW4sXG4gIFwiYnJhbmRcIjogc3RyaW5nXG59Il19
