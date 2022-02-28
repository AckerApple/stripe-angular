import { EventEmitter, Output, Component, Input } from "@angular/core"
import { pasteFromOnto } from "./pastes-menu.component"
import { localSchema } from "./storage"
import { Paste, SmartRouteEditor } from "./typings"

@Component({
  selector:"tool-relations",
  templateUrl: './tool-relations.component.html'
}) export class ToolRelationsComponent {
  @Input() storage: localSchema
  @Input() api!: SmartRouteEditor
  @Input() showRelated: boolean

  @Input() showApi!: SmartRouteEditor
  @Output() showApiChange: EventEmitter<SmartRouteEditor> = new EventEmitter()

  gotoApi(api: SmartRouteEditor, relation: Paste) {
    this.showRelated = false
    const lastApi = this.showApi || this.api
    this.showApiChange.emit(this.showApi = api)

    console.log('relation, lastApi, api', lastApi.smarts)
    pasteFromOnto(relation, lastApi, api)
  }
}
