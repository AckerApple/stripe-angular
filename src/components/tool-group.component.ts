import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, TemplateRef } from "@angular/core"
import { ApiGroup, SmartRouteEditor } from "./typings"

@Component({
  selector:"tool-group",
  templateUrl: './tool-group.component.html'
}) export class ToolGroupComponent {
  @Input() group!: ApiGroup
  @Input() showApi!: SmartRouteEditor
  @Output() showApiChange: EventEmitter<SmartRouteEditor> = new EventEmitter()
}
