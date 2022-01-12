import { getProjectLocalStorage } from "./app.component.utils"

export const storage: localSchema = getProjectLocalStorage()

export interface KeyInfo {title: string, value: string}

export interface localSchema {
  key: string

  privateKey: string
  privateKeys: KeyInfo[] // switchable keys
  publicKeys: KeyInfo[] // switchable keys
  
  webhookSigningSecret?: string
  webhookSigningSecrets?: KeyInfo[]
  webhookServer: string
  webhookServers: KeyInfo[]

  saveRequestsLocal?: boolean
  saveKeyLocally?: boolean
  savePrivateKeyLocally?: boolean

  metadata?: Record<string, any>
  extraData?: any
  requests?: {
    resultView: 'json' | 'small'
    source?: any
    paymentMethod?: any
  }

  plaid?: {
    client_id?: string,
    secret?: string,

    clientIds?: string[],
    secrets?: string[],
  }

  temp: {[index: string]: any}
}