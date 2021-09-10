import { Component, ContentChild, ElementRef, Input, TemplateRef } from "@angular/core"
import { changeKey, copyText, SmartRouteEditor } from "./app.component.utils"

declare type PasteFav = [string, string, string | ((data: any) => any)]

@Component({
  selector: 'simple-route-edit',
  templateUrl: './simple-route-edit.component.html'
}) export class SimpleRouteEditComponent {
  @Input() key: string
  @Input() config: SmartRouteEditor
  @Input() copy: string
  @Input() pasteFavs: PasteFav[] // [[name, value, paste-name]]

  @ContentChild('requestHeaderItems', { static: false }) requestHeaderItems:TemplateRef<ElementRef>
  @ContentChild('prependFormFooter', { static: false }) prependFormFooter:TemplateRef<ElementRef>

  copyText = copyText
  changeKey = changeKey

  pasteBy(item: PasteFav[]) {
    let data = this.config.data

    if (item[2] && item[2] instanceof Function) {
      return item[2](data)
    }

    const keyName: string = (item[2] as any) || item[0]
    const keys = keyName.split('.')

    keys.forEach((key, index) => {
      if (index + 1 === keys.length) {
        return data[key] = item[1]
      }

      data = data[key]
    })
  }
}