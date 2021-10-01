import { Component, Input } from "@angular/core"
import { stripeRequestByRouter } from "./app.component"
import { localSchema, SmartRouteEditor } from "./app.component.utils"

@Component({
  selector:"server-tools",
  templateUrl: './server-tools.component.html'
}) export class ServerToolsComponent {
  @Input() apiGroups: any
  @Input() api: any
  @Input() storage: localSchema

  showGroup!: string | any
}
