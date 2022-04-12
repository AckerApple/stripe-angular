import { EventEmitter } from "@angular/core"
import { Subject } from 'rxjs'

export interface SmartApiGroup extends ApiGroup {
  groups?: SmartApiGroup[]
  apis?: SmartRouteEditor[]
}

export interface ApiGroup {
  title: string
  icon?: string // emoji
  links?: LinkRef[]
  description?: string
  groups?: ApiGroup[]

  apis?: ISimpleRouteEditor[]
}

export interface RouteRequest {
  params?: {[name: string]: string}
  query?: {[name: string]: string}
  method: string
  host?: string // base url example https://sandbox.plaid.com/
  path: string,

  headers?: {[name: string]: string}
  removeHeaderValues?: any[]
}

interface RelatedApi {
  api: SmartRouteEditor
  relation: Paste
  title?: string // maybe deprecated
  group?: ApiGroup

  // part of smart route
  show?: boolean
}

export interface ApiPaste extends Paste {
  title?: string

  _api?: {
    _id: number, knownTitle: string
  }

  // TODO: deprecate this in favor of identifier
  $api?: () => ISimpleRouteEditor | SmartRouteEditor // default is current api
}

export interface SmartApiPaste extends ApiPaste {
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

  // paste?: (thisApi: ISimpleRouteEditor) => any
  removeKeys?: string[] // ex: ['remove_key_from_copy']
  afterRemoveKeys?: string[] // ex: ['data.remove_key_from_end_paste']
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

  // optional ability to reference an entirely other existing api (avoid duplication)
  $api?: () => ISimpleRouteEditor
  _api?: ApiReference,
}

export interface ApiReference {
  _id: number
  knownTitle: string
  original?: ISimpleRouteEditor // runtime reference to original symbolic link definition
}

export interface ToolSmarts {
  smartAt?: number // prevents being made smart twice which will corrupt if done twice
  pastes: SmartApiPaste[]
  related: RelatedApi[]
  runtimeMessages: ApiMessage[]
  resultAt?: number
  $result: Subject<any>
  load: number
  $send: EventEmitter<{[index:string]: any}>
}

export interface SmartRouteEditor extends ISimpleRouteEditor {
  _id: number
  error?: any
  result?: {[index:string]: any} // Output data. Runtime data. For request, its the response body

  smarts: ToolSmarts
}
