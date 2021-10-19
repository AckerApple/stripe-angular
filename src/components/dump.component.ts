import { Component, Input } from "@angular/core"
import { copyText } from "./app.component.utils"

@Component({
  selector: 'dump',
  templateUrl: './dump.component.html'
}) export class DumpComponent {
  @Input() key: string
  @Input() value: any
  @Input() showKids: boolean = false
  @Input() show: boolean
  @Input() showLevels: number = -1

  typing: string
  copyText = copyText

  ngOnChanges( changes:any ){
    this.typing = typeof(this.value)

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
    this.showLevels = (this.showLevels>=0 && this.showLevels) || (this.showLevels === -1 && !this.key && this.isObject() ? 2 : 0)

    if (this.showLevels > 0) {
      this.show = true
    }
  }

  isObject() {
    return this.value && this.value instanceof Object
  }

  unsorted() {} // ensure keyvalue pipe maintains order
}
