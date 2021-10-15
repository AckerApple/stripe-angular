import { Component, Input } from "@angular/core"
import { ApiPaste, ISimpleRouteEditor, Paste, SmartRouteEditor } from "./typings"
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
      this.pasteFrom(item, item.api || item.$api())
    } catch (err) {
      console.error(`Failed to paste by config`, {api: this.api, paste:item}, err);
    }
  }

  pasteFrom(pasteConfig: Paste, api: ISimpleRouteEditor) {
    pasteFromOnto(pasteConfig, api, this.api)
  }
}

export function pasteFromOnto(
  pasteConfig: Paste, apiFrom: ISimpleRouteEditor, apiOnto: ISimpleRouteEditor
) {
    // paste by function
    if (pasteConfig.paste) {
      (pasteConfig.paste as any)(apiOnto, apiFrom)
    }

    if (pasteConfig.pasteKey) {
      pasteKeyFromOnto(pasteConfig.pasteKey, pasteConfig, apiFrom, apiOnto)
    }

    // sub paste definitions (meaning one paste actually results in multiple things pasted)
    if (pasteConfig.pastes) {
      pasteConfig.pastes.forEach(paste => pasteFromOnto(paste, apiFrom, apiOnto))
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

  // console.log('removeKeys', keys, cleanData, deepClone, deepClone.id, deepClone.individual?.id)

  return deepClone
}


function pasteKeyFromOnto(
  pasteKey: string, item: Paste, from: any, onto: ISimpleRouteEditor
): void {
  const keyName: string = pasteKey // || 'id'
  const valueKey = item.pasteValueKey || item.valueKey
  let value = item.value || valueKey.split('.')
    .reduce((all, now) => all ? all[now] : undefined, from)

  if (item.removeKeys) {
    value = removeKeys(item.removeKeys, value) // remove keys from value
  }

  if (item.removeValues) {
    value = removeValues(value, item.removeValues)
  }

  pasteValueOnto(onto, keyName, value)
}

function pasteValueOnto(onto: any, keyName: string, value: any) {
  const keys = keyName.split('.')
  // paste flattened value
  onto[keyName] = value

  keys.forEach((key, index) => {
    if (index + 1 === keys.length) {
      return onto[key] = value
    }

    onto = onto[key] || (onto[key] = {})
  })
}
