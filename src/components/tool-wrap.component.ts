import { Component, ContentChild, ElementRef, Input, TemplateRef } from "@angular/core"
import { ApiPaste, SmartRouteEditor } from "./app.component.utils"

@Component({
  selector:"tool-wrap",
  templateUrl: './tool-wrap.component.html'
}) export class ToolWrapComponent {
  @Input() api: SmartRouteEditor

  // deprecated in favor of pastes
  @Input() pasteFavs: string[][] // [ title, value, pasteKey ]

  @ContentChild('footer', { static: false }) footerTemplate:TemplateRef<ElementRef>
  @ContentChild('prependFormFooter', { static: false }) prependFormFooterTemplate:TemplateRef<ElementRef>
  @ContentChild('requestHeaderItems', { static: false }) requestHeaderItemsTemplate:TemplateRef<ElementRef>
}