import { Component, ContentChild, ElementRef, Input, TemplateRef } from "@angular/core"
import { localSchema } from "./app.component.utils"
import { ApiGroup, SmartRouteEditor } from "./typings"

interface Scope {
  level: number
  showGroup?: ApiGroup
  showApi?: SmartRouteEditor
  scope?: Scope
}

@Component({
  selector:"group-tools",
  templateUrl: './group-tools.component.html'
}) export class GroupToolsComponent {

  @Input() groups: ApiGroup[]
  @Input() api: any
  @Input() storage: localSchema

  // styles
  @Input() selectedGroupClass = 'text-xs'

  /* passed in templates */
  @ContentChild('groupTemplate', { static: false }) groupTemplate:TemplateRef<ElementRef>
  @ContentChild('groupBody', { static: false }) groupBody:TemplateRef<ElementRef>

  currentLevel = 0

  showRelated: boolean
  /*
  showGroup!: ApiGroup
  showApi!: SmartRouteEditor
  */
  scope: Scope = {level: 0}

  getGroupByApi(api: SmartRouteEditor, group: ApiGroup[]) {
    this.scope = {level: 0}

    const loopGroups = (groups: ApiGroup[], scope: Scope) => {
      const match = groups.find((group: ApiGroup) => {
        if(group.apis) {
          const apiFind = group.apis?.find(groupApi => groupApi === api)

          if(apiFind) {
            console.log('found', apiFind.title)
            scope.showGroup = group
            scope.showApi = apiFind as SmartRouteEditor
            return apiFind
          }
        }

        if(group.groups) {
          const apiMatch = loopGroups(group.groups, this.paramSubScope(scope, scope.level + 1)) as any

          if(apiMatch) {
            scope.showGroup = group
          }

          return apiMatch
        }
      })

      /*if(match) {
        scope.showGroup = match
      }*/
      return match
    }

    loopGroups(this.groups, this.scope)

    console.log('this.scope', this.scope)

    return
  }

  paramSubScope(scope: Scope, level): Scope {
    return scope.scope = scope.scope || {level}
  }

  apiListItemToggle(api: SmartRouteEditor, scope: Scope, level: number) {
    if (scope.showApi === api) {
      delete scope.showApi
      return
    }

    scope.showApi = api
    if (scope.scope) {
      scope.scope.showApi = null
      scope.scope.showGroup = null
    }
    this.currentLevel = level
  }

  switchToGroup(
    group: ApiGroup, scope: Scope,
    parentScope: Scope, level: number
  ) {
    scope.showGroup = scope.showGroup === group ? null : group
    if (parentScope) {
      delete parentScope.showApi
    }

    delete scope.showApi
    if (scope.scope) {
      delete scope.scope // if other groups are unfolded, fold them back in
      // delete scope.scope.showGroup
    }
    this.currentLevel = level + 1
  }
}
