import { Component, Input } from "@angular/core"
import { ApiPaste, SmartRouteEditor } from "./app.component.utils"
import { removeValues } from './removeValues.function'

// declare type PasteFav = [string, string, string | ((data: any) => any)]

@Component({
  selector: 'pastes-menu',
  templateUrl: './pastes-menu.component.html'
}) export class PastesMenuComponent {
  @Input() pastes: ApiPaste[]
  @Input() api: SmartRouteEditor

  showPastes?: boolean

  /*readyPastes: ApiPaste[] = []
  ngOnChanges( _changes:any ){
    this.readyPastes.length = 0
    this.pastes?.forEach(item => {
      if (item.api[ item.valueKey ]) {
        this.readyPastes.push(item)
      }
    })
  }*/

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
