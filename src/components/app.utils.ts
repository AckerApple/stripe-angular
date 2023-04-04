import { requestByRouter, RouterRequestOptions } from './request.utils'

import { stripeServer } from "./app.component.utils"
import { ApiGroup, SmartApiGroup, SmartRouteEditor } from "./typings"
import { simpleRouteToSmart } from "./simpleRouteToSmart.function"

export interface CardsData {
  token?:any
  source?:any
  payment_method?: stripe.paymentMethod.PaymentMethod
}

interface StripeRouterRequestOptions extends RouterRequestOptions {
  privateKey: string
}

export function stripeRequestByRouter(
  route: SmartRouteEditor,
  options: StripeRouterRequestOptions
) {
  options.baseUrl = stripeServer
  const request = options.request = options.request || {} as any
  request.authorizationBearer = options.privateKey
  return requestByRouter(route, options)
}

export function simpleGroupsToSmart(
  groups: ApiGroup[]
): SmartApiGroup[] {
  const groupMapper = group => {
    if (group.groups) {
      group.groups = group.groups.map(groupMapper)
    }

    if (group.apis) {
      group.apis = group.apis.map(api => simpleRouteToSmart(api, groups)) as any
    }

    return group
  }

  return groups.map(groupMapper)
}

export function isObject(obj: any) {
  return obj && typeof(obj) === 'object' && !(obj instanceof Array)
}

export function getAllGroupsSave(groups: SmartApiGroup[]) {
  return groups.map(group => {
    const newGroup = {...group}

    // remove apis smarts
    if (newGroup.apis) {
      newGroup.apis = newGroup.apis.map(api => {
        const newApi = {...api}
        delete (newApi as any).smarts
        delete newApi.result

        Object.keys(newApi).forEach(key => {
          if (key.indexOf('result.') === 0
          || key.indexOf('request.') === 0
          ) {
            delete newApi[key]
          }
        })

        return newApi
      })
    }

    // recurse
    if (newGroup.groups) {
      newGroup.groups = getAllGroupsSave(newGroup.groups)
    }

    return newGroup
  })
}

export function download(filename: string, text: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
