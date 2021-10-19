import { EventEmitter } from "@angular/core"
import { Subject } from 'rxjs'
import { ApiGroup } from "./apis"

export interface RouteRequest {
  params?: {[name: string]: string}
  method: string
  host?: string // base url example https://sandbox.plaid.com/
  path: string,

  headers?: {[name: string]: string}
  removeHeaderValues?: any[]
}

interface RelatedApi {
  api:SmartRouteEditor
  relation: Paste
  title?: string // maybe deprecated
  group?: ApiGroup
}

export interface SmartRouteEditor extends ISimpleRouteEditor {
  load: number
  $result: Subject<any>
  resultAt?: number
  error?: any
  $send: EventEmitter<{[index:string]: any}>
  related: RelatedApi[]
  runtimeMessages: ApiMessage[]
}

export interface ApiPaste extends Paste {
  $api: () => ISimpleRouteEditor | SmartRouteEditor // default is current api
  title?: string
  // titlePrepend?: string // Intended to appear in front of dynamic title

  // deprecated? (maybe not, this is runtime edition)
  api?: SmartRouteEditor // ISimpleRouteEditor // default is current api
}

export interface LinkRef {
  url: string
  title: string
}

export interface ApiMessage {
  message: string // '⚠️ It appears you are using a bank source which is NOT truly a source. Fetch bank sources using GET /customers/:id/sources',
  valueKey: string // Only shows when value present. Example: request.params.id
  valueExpression: string // Only shows when value matches expression ba_
}

export interface PasteMatch {
  expression: string
  valueKey?: string // when not the valueKey of original Paste
}

export interface Paste {
  value?: any
  valueKey?: string // MUST be to a simple value detection (will not detect sub objects)

  valueMatches?: PasteMatch[] // value must match expression

  // when no paste defined, "id" is the paste key
  pasteKey?: string // must target simple value
  pasteValueKey?: string // Actual value to paste (does not have to be simple value) (typically used when a object is being pasted)

  pastes?: Paste[] // sub pastes (paste two things for one)

  paste?: (thisApi: ISimpleRouteEditor) => any
  removeKeys?: string[] // ex: {balance, secret, ...keepTheRest}
  removeValues?: any[] // deletes any values with null
}

export interface ISimpleRouteEditor {
  title?: string
  description?: string
  hint?: string
  warn?: string // description of things to keep in mind

  links?: LinkRef[]
  // maybe deprecated
  link?: string // documentation link

  // Input data. For POST requests, its the request post body. For GET its the URL variables (this may need to change)
  data?: {[index:string]: any}
  examples?: {[index:string]: any}[]

  // last result
  result?: {[index:string]: any} // Output data. Runtime data. For request, its the response body
  pastes?: ApiPaste[]

  messages?: ApiMessage[]

  request?: RouteRequest

  // data points that can be display links or copy action buttons
  favKeys?: {
    title?: string,
    type?: 'link' | 'copy'
    valueKey: string
    get?: (data: any) => any
  }[] // ['link_token']
}
