import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, TemplateRef } from "@angular/core"
import { ApiPaste, SmartRouteEditor } from "./app.component.utils"
import { removeValues } from './removeValues.function'

// declare type PasteFav = [string, string, string | ((data: any) => any)]

@Component({
  selector: 'tool-wrap',
  templateUrl: './tool-wrap.component.html'
}) export class ToolWrapComponent {
  @Input() showForm: boolean
  @Input() api: SmartRouteEditor
  @Input() format: 'json' | 'small' = 'small'
  @Output() formatChange: EventEmitter<'json' | 'small'> = new EventEmitter
  @ContentChild('footer', { static: false }) footerTemplate:TemplateRef<ElementRef>
  @ContentChild('prependFormFooter', { static: false }) prependFormFooterTemplate:TemplateRef<ElementRef>
  @ContentChild('requestHeaderItems', { static: false }) requestHeaderItemsTemplate:TemplateRef<ElementRef>

  showPastes?: boolean

  pasteByPaste(item: ApiPaste) {
    try {
      let data = this.api // .data

      // paste by function
      if (item.paste) {
        (item.paste as any)(this.api)
      }

      if (item.pasteKey) {
        const keyName: string = item.pasteKey // || 'id'
        const keys = keyName.split('.')

        let value = (item.pasteValueKey || item.valueKey).split('.')
          .reduce((all, now) => all[now], item.api)

        if (item.removeKeys) {
          value = removeKeys(item.removeKeys, value) // remove keys from value
        }

        if (item.removeValues) {
          value = removeValues(value, item.removeValues)
        }

        // paste flattened value
        data[keyName] = value

        keys.forEach((key, index) => {
          if (index + 1 === keys.length) {
            return data[key] = value
          }

          data = data[key] || (data[key] = {})
        })
        // console.log(keyName, this.api)
      }
    } catch (err) {
      console.error(`Failed to paste by config`, {api: this.api, paste:item}, err);
    }
  }
}

export function removeKeys(keys: string[], cleanData: any) {
  const deepClone = JSON.parse(JSON.stringify(cleanData))

  keys.map(varName => {
    const name = varName.trim()
    delete deepClone[name] // flattened delete 'something' or 'something.something'

    // delete by dot notation
    const dotNotation = name.split('.')
    dotNotation.reduce((all, now, index) => {
      if ([undefined,null].includes(all)) {
        return
      }

      if (index === dotNotation.length-1) {
        return delete all[now]
      }

      return all[now]
    }, deepClone)

    return varName
  })

  return deepClone
}

