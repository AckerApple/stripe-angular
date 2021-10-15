import { EventEmitter } from "@angular/core"
import { getStringIdentifiers, getStringInterpolations } from "./app.component.utils"
import { ISimpleRouteEditor, RouteRequest, SmartRouteEditor } from "./typings"

export function simpleRouteToSmart(route: ISimpleRouteEditor): SmartRouteEditor {
  const routeRef = route as SmartRouteEditor
  routeRef.related = routeRef.related || []

  if (routeRef.data && routeRef.examples) {
    routeRef.examples.push({title: 'original data', data: routeRef.data})
  }

  if (routeRef.request) {
    paramRequestUrlParams(routeRef.request)
  }

  // runtime tie memory paste-able data points
  if (routeRef.pastes) {
    routeRef.pastes.forEach((paste, index) => {
      let pasteApi = paste.api as SmartRouteEditor

      if (paste.$api) {
        pasteApi = paste.api = paste.$api() as SmartRouteEditor
        if (!pasteApi) {
          const msg = `could not populate api paste ${index}: ${routeRef.title}`
          throw new Error(msg)
        }
      }

      if (!pasteApi) {
        pasteApi = paste.api = routeRef // its a self ref paste
      }

      const selfReferencing = pasteApi === routeRef
      if(!selfReferencing) {
        pasteApi.related = pasteApi.related || []
        pasteApi.related.push({
          api: routeRef, relation: paste,
        })
      }
    })
  }

  routeRef.$result = new EventEmitter()
  routeRef.$send = new EventEmitter()
  routeRef.load = 0

  return routeRef
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
    end[ key ] = simpleRouteToSmart(value)
    return end
  }, menu as any)
}