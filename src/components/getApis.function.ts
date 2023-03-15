import { simpleMenuToSmart } from "./simpleRouteToSmart.function"
import { SmartRouteEditor } from "./typings"
import { menu } from "./ui-apis"

interface ApiMenu {
  [name: string]: SmartRouteEditor
}

export function getApis (): ApiMenu {
  return simpleMenuToSmart(menu)
}

export default getApis
