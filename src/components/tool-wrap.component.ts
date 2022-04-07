import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, TemplateRef } from "@angular/core"
import { SmartRouteEditor } from "./typings"

@Component({
  selector: 'tool-wrap',
  templateUrl: './tool-wrap.component.html'
}) export class ToolWrapComponent {
  @Input() allowHide: boolean
  @Input() showForm: boolean
  @Input() api: SmartRouteEditor
  @Input() format: 'json' | 'small' = 'small'
  @Input() dumpLevels: number = -1 // unfolded shown levels of depth. Default is auto decide
  @Output() formatChange: EventEmitter<'json' | 'small'> = new EventEmitter()
  @ContentChild('footer', { static: false }) footerTemplate:TemplateRef<ElementRef>
  @ContentChild('prependFormFooter', { static: false }) prependFormFooterTemplate:TemplateRef<ElementRef>
  @ContentChild('requestHeaderItems', { static: false }) requestHeaderItemsTemplate:TemplateRef<ElementRef>
}
