import { Component, EventEmitter, Input, Output } from "@angular/core"
import { dump } from "taggedjs-dump"
import { loadTagGateway } from "taggedjs-gateway"

@Component({
  selector: 'dump',
  templateUrl: './dump.component.html',
}) export class DumpComponent {
  dumpTagId = loadTagGateway(dump)

  @Input() value: any
  @Input() showLevels: number = -1 // unfolded shown levels of depth. Default is auto decide
  @Input() format: 'json' | 'small' = 'small' // do not pass in, used to detect when first dump
  @Output() formatChange: EventEmitter<'json' | 'small'> = new EventEmitter()
  
  @Input() showAll!: boolean // hide entire results
  @Input() show!: boolean // hide entire results
  @Input() showKids: boolean = false // force children to be shown by true value
  @Input() key!: string // dump a key within the provided value
  @Input() isRootDump: boolean = true // do not pass in, used to detect when first dump
}
