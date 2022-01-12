import { Component, Input } from "@angular/core"
import { ISimpleRouteEditor, Paste, PasteMatch, SmartApiPaste, SmartRouteEditor } from "./typings"
import { removeValues } from './removeValues.function'

// declare type PasteFav = [string, string, string | ((data: any) => any)]

@Component({
  selector: 'pastes-menu',
  templateUrl: './pastes-menu.component.html'
}) export class PastesMenuComponent {
  @Input() pastes: SmartApiPaste[]
  @Input() api: SmartRouteEditor

  showPastes?: boolean

  pasteByPaste(item: SmartApiPaste) {
    try {
      this.pasteFrom(item, item.api || item.$api())
    } catch (err) {
      console.error(`🔴 Failed to paste by config`, {api: this.api, paste:item}, err);
    }
  }

  pasteFrom(pasteConfig: Paste, api: ISimpleRouteEditor) {
    pasteFromOnto(pasteConfig, api, this.api)
  }
}

export function pasteFromOnto(
  pasteConfig: Paste, apiFrom: ISimpleRouteEditor, apiOnto: ISimpleRouteEditor
) {
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

  return deepClone
}


function pasteKeyFromOnto(
  pasteKey: string, item: Paste, from: any, onto: ISimpleRouteEditor
): void {
  const keyName: string = pasteKey // || 'id'
  const value = getPasteValueFrom(item, from)

  // validate to paste
  if( item.valueMatches) {
    const valid = pasteValueFromMatches(item, from)

    if (!valid) {
      return
    }
  }

  pasteValueOnto(onto, keyName, value)
}

function getPasteValueFrom(item: Paste | PasteMatch, from: any) {
  const asPaste = item as Paste
  const valueKey = asPaste.pasteValueKey || item.valueKey

  let value = asPaste.value

  if (valueKey) {
    value = valueKey.split('.')
      .reduce((all, now) => all ? all[now] : undefined, from)
  }

  if (asPaste.removeKeys) {
    value = removeKeys(asPaste.removeKeys, value) // remove keys from value
  }

  if (asPaste.removeValues) {
    value = removeValues(value, asPaste.removeValues)
  }

  return value
}

function pasteValueFromMatches(item: Paste, from: any): boolean {
  // const value = getPasteValueFrom(item, from)
  return item.valueMatches.find(valConfig => {
    const value = getPasteValueFrom(valConfig, from)
    const found = value.search(new RegExp(valConfig.expression, 'gi')) >= 0
    return found
  }) ? true : false
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
