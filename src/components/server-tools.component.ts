import { Component, Input } from "@angular/core"
import { ApiGroup } from "./apis"
// import { stripeRequestByRouter } from "./app.component"
import { localSchema } from "./app.component.utils"
import { pasteFromOnto } from "./pastes-menu.component"
import { Paste, SmartRouteEditor } from "./typings"

@Component({
  selector:"server-tools",
  templateUrl: './server-tools.component.html'
}) export class ServerToolsComponent {
  @Input() apiGroups: ApiGroup[]
  @Input() api: any
  @Input() storage: localSchema

  showRelated: boolean
  showGroup!: any
  showApi!: SmartRouteEditor

  gotoApi(api: SmartRouteEditor, relation: Paste) {
    this.showRelated = false
    const lastApi = this.showApi
    this.showApi = api

    const findParent = this.apiGroups.find(group => group.apis.find(groupApi => groupApi === api))
    if(findParent) {
      this.showGroup = findParent
    }

    pasteFromOnto(relation, lastApi, api)
  }
}
