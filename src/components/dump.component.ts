import { Component, EventEmitter, Input, Output } from "@angular/core"
import { copyText } from "./app.component.utils"

@Component({
  selector: 'dump',
  templateUrl: './dump.component.html',
}) export class DumpComponent {
  @Input() value: any
  @Input() showLevels: number = -1 // unfolded shown levels of depth. Default is auto decide
  @Input() format: 'json' | 'small' = 'small' // do not pass in, used to detect when first dump
  @Output() formatChange: EventEmitter<'json' | 'small'> = new EventEmitter()
  
  @Input() show!: boolean // hide entire results
  @Input() showKids: boolean = false // force children to be shown by true value
  @Input() key!: string // dump a key within the provided value
  @Input() isRootDump: boolean = true // do not pass in, used to detect when first dump

  arrayView?: 'table'
  typing?: string
  copyText = copyText

  ngOnChanges( changes:any ){
    this.typing = this.value === null ? 'null' : typeof(this.value)

    if (!this.key) {
      this.evalShowKids()
    }
  }

  ngOnInit(){
    this.evalShowKids()
  }

  typeof(v) {
    return typeof(v)
  }

  evalShowKids() {
    const levelsDefined = (this.showLevels>=0 && this.showLevels)
    // detect auto levels (default) and if object lets only show 2 levels deep
    const autoShowObjectLevels = this.showLevels === -1 && !this.key && this.isObject()
    this.showLevels = levelsDefined || (autoShowObjectLevels ? 2 : 0)

    if (this.showLevels > 0) {
      this.show = true
    }
  }

  isObject() {
    return this.value && this.value instanceof Object
  }

  unsorted() {} // ensure keyvalue pipe maintains order

  copyAsJsonText(value: any) {
    copyText( JSON.stringify(value, null, 2) )
  }
}
