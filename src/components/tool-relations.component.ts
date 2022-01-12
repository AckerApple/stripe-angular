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
    const lastApi = this.showApi
    this.showApiChange.emit(this.showApi = api)

    pasteFromOnto(relation, lastApi, api)
  }
}
