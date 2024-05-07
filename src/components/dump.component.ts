import { Component, EventEmitter, Input, Output } from "@angular/core"
import { dump } from "taggedjs-dump"
import { loadTagGateway, tagGateway } from "taggedjs-gateway"
import { valueOrStripeLink } from "./dataTools.tag"

@Component({
  selector: 'dump',
  template: `
    <div
      [attr.tag]="dumpTag.id"
      [attr.props]="dumpTag.props('dumpTag_'+uniqueId, {
        key: key,
        value: value,
        show: show,
        showKids: showKids,
        showLevels: showLevels,
        showAll: showAll,
        format: format,
        isRootDump: isRootDump,
        everySimpleValue: everySimpleValue
      })"

      events="formatChange"
      (formatChange)="formatChange.emit($event.detail.formatChange)"
    ></div>
  `,
}) export class DumpComponent {
  // dumpTagId = loadTagGateway(dump)
  dumpTag = tagGateway(dump as any)
  uniqueId = performance.now()

  @Input() value: any
  @Input() showLevels: number = -1 // unfolded shown levels of depth. Default is auto decide
  @Input() format: 'json' | 'small' = 'small' // do not pass in, used to detect when first dump
  @Output() formatChange: EventEmitter<'json' | 'small'> = new EventEmitter()
  
  @Input() showAll!: boolean // hide entire results
  @Input() show!: boolean // hide entire results
  @Input() showKids: boolean = false // force children to be shown by true value
  @Input() key!: string // dump a key within the provided value
  @Input() isRootDump: boolean = true // do not pass in, used to detect when first dump

  /** Convert stripe identifiers into links */
  everySimpleValue(value, key) {
    return valueOrStripeLink(value)
  }
}
