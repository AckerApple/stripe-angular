import formurlencoded from 'form-urlencoded'
import { SmartRouteEditor } from "./typings"
import { stringInterpolations, stringIdentifiers, tryParse } from "./app.component.utils"

export interface RouterRequestOptions {
  baseUrl?: string
  post?: any, // form post style
  json?: any, // POST as json
  id?: string,
  query?: Record<string, string | number>
  
  request?: RequestOptions // not sure needed
}

export function requestByRouter(
  route: SmartRouteEditor,
  options: RouterRequestOptions
) {
  delete route.result
  delete route.error

  const req = route.request || {} as any

  if (!req) {
    return console.warn('🟠 not an api request')
  }

  ++route.smarts.load

  let url: string = options.baseUrl || req.host || ''

  if (options.id) {
    const idSearch = /\$\{\s*id\s*\}/.exec(req.path)
    if (idSearch.length > 0) {
      url = url + req.path.slice(0, idSearch.index) + options.id + req.path.slice(idSearch.index + idSearch[0].length, url.length)
    } else {
      url = url + options.id
    }
  } else {
    url = url + req.path
  }

  const rawData = options.post || options.json || route.data
  const data = rawData ? JSON.parse(JSON.stringify(rawData)) : {} // clone

  const params = req.params
  const replaced = replaceStringVars(url, params)
  url = replaced.url

  let headers = {}

  if (options.request?.headers) {
    Object.assign(headers, options.request.headers)
  }

  if (req.headers) {
    Object.assign(headers, req.headers)
  }

  if (req.removeHeaderValues) {
    headers = JSON.parse(JSON.stringify(headers)) // clone before deletes occur
    Object.entries(headers).forEach(([key, value]) => {
      if (req.removeHeaderValues.includes(value)) {
        delete headers[key]
      }
    })
  }

  const reqOptions: RequestOptions = {
    url, method: req.method, headers,
    authorizationBearer: options.request?.authorizationBearer,
  }

  if (options.post) {
    reqOptions.post = data
  }

  if (options.json) {
    reqOptions.json = data
  }

  // GET convert POST to query params
  if (req.method === 'GET' && reqOptions.post) {
    options.query = reqOptions.post
  }

  if (options.query) {
    const queryString = Object.keys(options.query).reduce((all, key) => all + (all.length && '&' || '') + `${key}=${options.query[key]}`,'')
    reqOptions.url = reqOptions.url + '?' + queryString
  }

  return request(reqOptions)
    .then(resultSetter(route))
    .catch(err => {
      route.error = err
      console.error('🔴 err', err)
      return Promise.reject(err)
    })
    .finally(() => --route.smarts.load)
}
export interface RequestOptions {
  url: string, method?: 'GET' | 'POST' | string
  json?: {[x: string]: any} // POST string
  post?: {[x: string]: any} // form post style
  headers?: {[x: string]: any}
  authorizationBearer?: string
}

export function request(
  {url, method, post, json, headers, authorizationBearer}: RequestOptions
) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    const endMethod = method || (post || json ? 'POST' : 'GET')

    // req.open(endMethod, url, true);
    req.open(endMethod, url);
    req.setRequestHeader('Accept', 'application/json')

    if (authorizationBearer) {
      req.setRequestHeader('Authorization', 'Bearer ' + authorizationBearer)
    }

    if (headers) {
      Object.entries(headers).forEach(([name, value]) =>
        req.setRequestHeader(name, value)
      )
    }

    // const formPost = objectToUriForm(post)
    if (post) {
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded charset=UTF-8')
      const formPost = formurlencoded(post)
      req.send( formPost )
    } else if (json) {
      const content = JSON.stringify(json)
      // req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
      req.setRequestHeader("Content-Type", "application/json")
      // req.setRequestHeader("Content-Length", content.length.toString())
      req.send(content);
    } else {
      req.send()
    }

    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        res( tryParse(req.responseText) )
      }
    }
  })
}

function replaceStringVars(url: string, data: any): {url:string, data: any} {
  // ${interpolations}
  const regexp = stringInterpolations
  const array = [...url.matchAll(regexp)]
  for (let index = array.length - 1; index >= 0; --index) {
    const result = array[index]
    const key = result[0].slice(2, result[0].length-1).trim() // remove brackets and trim
    const value = data[key]
    // delete data[key] // remove from body data
    url = url.slice(0, result.index) + value + url.slice(result.index + result[0].length, url.length)
  }

  // :identifiers
  const idRegexp = stringIdentifiers
  const idArray = [...url.matchAll(idRegexp)]
  for (let index = idArray.length - 1; index >= 0; --index) {
    const result = idArray[index]
    const key = result[0].slice(2, result[0].length).trim() // remove :
    const value = data[key]
    url = url.slice(0, result.index+1) + value + url.slice(result.index + result[0].length, url.length)
  }

  return {url, data}
}

function resultSetter(
  route: SmartRouteEditor
): (res: any) => SmartRouteEditor {
  return (res) => {
    const parsed = tryParse(res)
    route.smarts.resultAt = Date.now()

    if (parsed.error) {
      const error = {message:parsed.errorMessage, name: res.error}
      route.error = error
      throw error
    }

    delete route.error
    route.result = parsed
    route.smarts.$result.next(route)

    return route
  }
}
