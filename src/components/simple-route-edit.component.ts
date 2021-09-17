import { Component, ContentChild, ElementRef, Input, TemplateRef } from "@angular/core"
import { ApiPaste, changeKey, copyText, SmartRouteEditor } from "./app.component.utils"

declare type PasteFav = [string, string, string | ((data: any) => any)]

@Component({
  selector: 'simple-route-edit',
  templateUrl: './simple-route-edit.component.html'
}) export class SimpleRouteEditComponent {
  @Input() key: string
  @Input() config: SmartRouteEditor
  @Input() copy: string

  @Input() pastes: PasteFav[] // [[name, value, paste-name]]

  // deprecated in favor of pastes
  @Input() pasteFavs: PasteFav[] // [[name, value, paste-name]]

  @ContentChild('requestHeaderItems', { static: false }) requestHeaderItems:TemplateRef<ElementRef>
  @ContentChild('prependFormFooter', { static: false }) prependFormFooter:TemplateRef<ElementRef>

  copyText = copyText
  changeKey = changeKey

  pasteByPaste(item: ApiPaste) {
    let data = this.config.data

    if (item.pasteKey && item.pasteKey as any instanceof Function) {
      return (item.pasteKey as any)(data)
    }

    const keyName: string = item.pasteKey
    const keys = keyName.split('.')

    keys.forEach((key, index) => {
      if (index + 1 === keys.length) {
        return data[key] = item.api[ item.valueKey ]
      }

      data = data[key]
    })
  }

  pasteBy(item: PasteFav[]) {
    if (item[2] && item[2] instanceof Function) {
      return item[2]( this.config.data )
    }

    let data: any = this.config
    let keyName = 'data'

    // specific paste, otherwise paste all
    if (item[2]) {
      data = this.config.data
      keyName = item[2] as any
    }

    const keys = keyName.split('.')
    keys.forEach((key, index) => {
      if (index + 1 === keys.length) {
        return data[key] = item[1]
      }

      data = data[key]
    })
  }
}