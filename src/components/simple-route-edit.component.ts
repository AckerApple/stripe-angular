import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, TemplateRef } from "@angular/core"
import { flatten, removeFlats, changeKey, copyText } from "./app.component.utils"
import { SmartRouteEditor } from "./typings"

@Component({
  selector: 'simple-route-edit',
  templateUrl: './simple-route-edit.component.html'
}) export class SimpleRouteEditComponent {
  @Input() key: string
  @Input() config: SmartRouteEditor
  @Input() copy: string

  @Input() format: 'json' | 'small' = 'small'
  @Output() formatChange: EventEmitter<'json' | 'small'> = new EventEmitter

  @ContentChild('requestHeaderItems', { static: false }) requestHeaderItems:TemplateRef<ElementRef>
  @ContentChild('prependFormFooter', { static: false }) prependFormFooter:TemplateRef<ElementRef>

  showAll?: boolean
  showPost?: boolean
  showParams?: boolean
  showHeaders?: boolean

  copyText = copyText
  changeKey = changeKey

  ngOnChanges(){
    this.showPost = this.config.data ? true : false
    if (this.config.request) {
      this.showParams = this.config.request.params ? true : false
    }
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

    this.config.smarts.runtimeMessages = messages
  }
}
