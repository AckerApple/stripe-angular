import { Component, ContentChild, ElementRef, Input, TemplateRef } from "@angular/core"
import { localSchema } from "./storage"
import { ApiGroup, SmartRouteEditor } from "./typings"

export interface GroupScope {
  level: number
  showGroup?: ApiGroup
  showApi?: SmartRouteEditor
  scope?: GroupScope
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
  @Input() scope: GroupScope = {level: 0}

  getGroupByApi(api: SmartRouteEditor, _group: ApiGroup[]) {
    const result = getGroupByApi(api, this.groups)
    this.scope = result
  }

  apiListItemToggle(api: SmartRouteEditor, scope: GroupScope, level: number) {
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
    group: ApiGroup, scope: GroupScope,
    parentScope: GroupScope, level: number
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

export function getGroupByApi(
  api: SmartRouteEditor, groups: ApiGroup[]
): GroupScope {
  const scope = {level: 0}

  const loopGroups = (groups: ApiGroup[], scope: GroupScope) => {
    const match = groups.find((group: ApiGroup) => {
      if(group.apis) {
        const apiFind = group.apis?.find(groupApi => groupApi === api)

        if(apiFind) {
          scope.showGroup = group
          scope.showApi = apiFind as SmartRouteEditor
          return apiFind
        }
      }

      if(group.groups) {
        const apiMatch = loopGroups(group.groups, paramSubScope(scope, scope.level + 1)) as any

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

  loopGroups(groups, scope)

  return scope
}


function paramSubScope(scope: GroupScope, level): GroupScope {
  return scope.scope = scope.scope || {level}
}
