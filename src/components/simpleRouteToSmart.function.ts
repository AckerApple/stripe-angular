import { EventEmitter } from "@angular/core"
import { ApiGroup } from "./typings"
import { getStringIdentifiers, getStringInterpolations } from "./app.component.utils"
import { ApiPaste, ISimpleRouteEditor, Paste, RouteRequest, SmartApiPaste, SmartRouteEditor } from "./typings"

export function simpleRouteToSmart(
  route: ISimpleRouteEditor,
  allGroups: ApiGroup[], // for relation lookups
): SmartRouteEditor {
  const routeRef = route as SmartRouteEditor

  routeRef._id = routeRef._id || performance.now()

  if (routeRef.smarts && routeRef.smarts.smartAt) {
    return routeRef // already has been made smart
  }

  if (routeRef.data && routeRef.examples) {
    routeRef.examples.push({title: 'original data', data: routeRef.data})
  }

  if (routeRef.request) {
    paramRequestUrlParams(routeRef.request)
  }

  routeRef.smarts = routeRef.smarts || newSmarts()

  if (routeRef.smarts.smartAt) {
    return routeRef
  }

  routeRef.smarts.smartAt = performance.now()

  // runtime tie memory paste-able data points
  if (routeRef.pastes) {
    routeRef.smarts.pastes = smartPastes(routeRef.pastes, routeRef, allGroups)
  }

  return routeRef
}

function newSmarts() {
  return {
    pastes: [],
    related: [],
    runtimeMessages: [],
    $result: new EventEmitter(),
    $send: new EventEmitter(),
    load: 0
  }
}

function smartPastes(
  pastes: ApiPaste[],
  api: SmartRouteEditor,
  allGroups: ApiGroup[], // for relation lookups & title reference icons
): SmartApiPaste[] {
  return pastes.map((paste, index) => {
    const newPaste = JSON.parse(JSON.stringify(paste)) as SmartApiPaste
    let pasteApi: SmartRouteEditor = (paste as SmartApiPaste).api

    // lookup by identifier
    if (paste._api) {
      pasteApi = newPaste.api = findApiByIdInGroups(paste._api._id, allGroups)
    }

    // TODO: deprecate this in-favor of named references
    if (paste.$api) {
      pasteApi = newPaste.api = paste.$api() as SmartRouteEditor

      if (!pasteApi) {
        const msg = `could not populate api paste ${index}: ${api.title}`
        throw new Error(msg)
      }

      delete paste.$api
    }

    makePasteSmart(newPaste)

    if (!pasteApi) {
      pasteApi = newPaste.api = api // its a self ref paste
    }

    // relating apis by pastes
    const selfReferencing = pasteApi === api
    if(!selfReferencing) {
      paste._api = {
        _id: pasteApi._id || (pasteApi._id = performance.now()),
        knownTitle: pasteApi.title
      }

      // find the group this api belongs to for icon title purposes
      const group = findApiGroup(allGroups, api)

      pasteApi.smarts = pasteApi.smarts || newSmarts()
      pasteApi.smarts.related.push({
        api, relation: newPaste, group,
        title: api.title || newPaste.title,
      })
    }

    return newPaste
  })
}

function findApiByIdInGroups(id: number, groups: ApiGroup[]) {
  const findApiGroup = (result, group) => {
    if (result) {
      return result
    }

    if(group.apis) {
      const found = group.apis.find(iApi => iApi._id === id)

      if (found) {
        return found
      }
    }

    if (group.groups) {
      return group.groups.reduce(findApiGroup, result)
    }
  }

  return groups.reduce(findApiGroup, undefined)
}

function findApiGroup(groups: ApiGroup[], api: SmartRouteEditor) {
  const findApiGroup = (result, group) => {
    if (result) {
      return result
    }

    if(group.apis) {
      const found = group.apis.find(iApi => iApi === api || (api._id && iApi._id === api._id))

      if (found) {
        return group
      }
    }

    if (group.groups) {
      return group.groups.reduce(findApiGroup, result)
    }
  }

  return groups.reduce(findApiGroup, undefined)
}

function makePasteSmart(paste: Paste): SmartApiPaste {
  if (paste.valueMatches) {
    paste.valueMatches.forEach(item => {
      if (!item.valueKey) {
        item.valueKey = paste.valueKey
      }
    })
  }


  if (paste.valueKey == undefined && paste.value == undefined) {
    const err = new Error('Issue exists with paste');
    (err as any).paste = paste
    throw err
  }


  if (paste.pastes) {
    paste.pastes.forEach(pasteChild => makePasteSmart(pasteChild))
  }

  return paste
}

function paramRequestUrlParams(request: RouteRequest) {
  const identifiers = getStringIdentifiers(request.path)
  const interps = getStringInterpolations(request.path)

  if (interps.length) {
    request.params = request.params || {}

    // create data points for path interps
    interps.forEach(result => {
      const nameString = result[0]
      const name = nameString.slice(2, nameString.length-1)
      request.params[name] = request.params[name] || ''
    })
  }

  if (identifiers.length) {
    request.params = request.params || {}

    // create data points for path identifiers
    identifiers.forEach(result => {
      const nameString = result[0]
      const name = nameString.slice(2, nameString.length) // remove /:
      request.params[name] = request.params[name] || ''
    })
  }
}

export function simpleMenuToSmart(
  menu: {[name: string]: ISimpleRouteEditor}
): {[name: string]: SmartRouteEditor} {
  return Object.entries(menu).reduce((end, [key, value]) => {
    end[ key ] = simpleRouteToSmart(value, [])
    return end
  }, menu as any)
}