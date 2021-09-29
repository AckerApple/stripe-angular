import { Component, ContentChild, ElementRef, Input, TemplateRef } from "@angular/core"
import { flatten, removeFlats } from "./app.component"
import { ApiPaste, changeKey, copyText, PostWarnFunction, SmartRouteEditor, WarnResults } from "./app.component.utils"
import { removeValues } from './removeValues.function'

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

  showAll?: boolean
  showPost?: boolean
  showParams?: boolean
  showHeaders?: boolean
  format: 'json' | 'small' = 'small'

  copyText = copyText
  changeKey = changeKey

  ngOnInit(){
    this.showPost = this.config.data ? true : false
    if (this.config.request) {
      this.showParams = this.config.request.params ? true : false
    }
  }

  pasteByPaste(item: ApiPaste) {
    try {
      let data = this.config // .data

      // paste by function
      if (item.paste) {
        (item.paste as any)(this.config)
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
        console.log(keyName, this.config)
      }
    } catch (err) {
      console.error(`Failed to paste by config`, {api: this.config, paste:item}, err);
    }
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

  changeByString(data: any, key: any, value:any) {
    changeKey(data, value, [key])
    removeFlats(this.config)
    flatten(this.config, this.config)
    this.updateMessages()
  }

  updateMessages() {
    const messages = []

    if (this.config.messages) {
      messages.push(
        ...this.config.messages.filter(config => {
          if (!config.valueKey) {
            return true // simple message
          }

          const value = this.config[config.valueKey]
          const notDefined = [undefined,null].includes(value)

          if ( notDefined ) {
            return false // value is not defined, no message
          }

          if (!config.valueExpression) {
            return config // value is defined and has no conditions to display
          }

          const expression = new RegExp(config.valueExpression, 'gi')
          return value.search(expression) >= 0
        })
      )
    }

    this.config.runtimeMessages = messages
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

