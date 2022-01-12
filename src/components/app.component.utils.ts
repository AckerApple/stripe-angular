import { ISimpleRouteEditor } from './typings'
import { localSchema } from './storage'

export const stripeServer = 'https://api.stripe.com/v1/'
const sampleAddress = {
  city: 'Coconut Creek',
  country: null,
  line1: '1234 sw 1st ct',
  line2: null,
  postal_code: '33066',
  state: 'FL'
}

export const sample = {
  metadata: {
    testedUsing: 'stripe-angular',
    author: 'Acker Apple'
  },
  owner: {
    email: 'jenny.rosen@example.com',
    name: 'jenny rosen',
    phone: '561-561-5611',
    address: sampleAddress
  }
}

function objectToUriForm(
  ob: {[index: string]: any} | string[],
  parentKey?: string
): string {
  let returnString = '';

  if (!ob) {
    return returnString;
  } else if (Array.isArray(ob)) {
    ob.forEach(value => {
      returnString += `${parentKey}[]=${encodeURIComponent(value)}&`;
    });
  } else {
    Object.keys(ob).forEach(key => {
      const value = ob[key]
      let endKey = key;
      let stringValue = '';

      if (parentKey) {
        endKey = `${parentKey}[${key}]`
      }

      switch (typeof(value)) {
        case 'string':
        case 'number':
          stringValue = value.toString();
          break;

        case 'object':
          if (parentKey) {
            returnString += parentKey;
            key = '[' + key + ']'
          }

          return returnString += objectToUriForm(value, key) + '&';
      }

      returnString += `${endKey}=${encodeURIComponent(stringValue)}` + '&'
    });
  }

  if (returnString.length) {
    returnString = returnString.substr(0, returnString.length - 1) // last &
  }

  return returnString;
}

export function tryParse(data: string | any) {
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
}

export interface PostWarning {
  message: string
}

export interface WarnResults {warnings?: PostWarning[]}
export declare type PostWarnFunction = (data: Record<string, any>, thisApi: ISimpleRouteEditor) => PostWarning[] & WarnResults


function getUrlStorage() {
  const urlQuery = new URLSearchParams(window.location.search)
  const storageUrlString = urlQuery.get('storage')

  if (!storageUrlString) {
    return
  }

  try {
    return JSON.parse(storageUrlString)
  } catch (err) {
    console.error('error parsing url storage', err);
  }
}

function getLocalStorage() {
  const storageString = localStorage?.stripeAngular

  if (!storageString) {
    return {}
  }

  try {
    return JSON.parse(storageString)
  } catch (err) {
    console.error('error parsing local storage', err);
  }

}

export function getProjectLocalStorage(): localSchema {
  const storage = getUrlStorage() || getLocalStorage() || {}

  storage.key = storage.key || localStorage?.stripeAnguarKey;
  storage.privateKey = storage.privateKey || localStorage?.stripeAngularPrivateKey

  storage.privateKeys = storage.privateKeys || []
  storage.publicKeys = storage.publicKeys || []
  storage.webhookSigningSecrets = storage.webhookSigningSecrets instanceof Array ? storage.webhookSigningSecrets : []
  storage.webhookServers = storage.webhookServers || []

  // 🏦 Plaid
  storage.plaid = storage.plaid || {}
  storage.plaid.clientIds = storage.plaid.clientIds || []
  storage.plaid.secrets = storage.plaid.secrets || []

  storage.requests = storage.requests || {
    // passed along when token or sources created
    source: {
      owner: sample.owner,
      metadata: sample.metadata
    },
    paymentMethod: {
      metadata: sample.metadata
    }
  }

  storage.metadata = storage.metadata || {}

  storage.temp = {}

  return storage
}

export function copyText(text: string) {
  /* Get the text field */
  var copyText = document.createElement('textarea');
  copyText.value = text
  document.body.appendChild(copyText)

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  document.body.removeChild(copyText)
  // copyText.parentNode.removeChild(copyText)
}

export function changeKey(
  scope: Record<any, any>,
  value: string,
  keys: string[] = ['data']
): any {
  delete scope.error // stripe-angular only
  let current: any = scope;

  while(keys.length > 2) {
    current = current[ keys.shift() ]
  }

  try {
    eval('value = ' + value) // allow loose js to be cast to json
    current[ keys[0] ] = value
  } catch (err) {
     // stripe-angular only
    scope.error = Object.getOwnPropertyNames(err).reverse().reduce((a, key) => (a[key] = err[key]) && a || a, {} as any)
    console.error(`failed to parse object key ${keys[0]}`);

    throw err
  }

  return current[ keys[0] ]
}

export const stringIdentifiers = /\/:[^\/]+(?=\/|$)/g;
export function getStringIdentifiers(string: String): RegExpMatchArray[] {
  return [...string.matchAll(stringIdentifiers)]
}

export const stringInterpolations = /\$\{\s*[^\}]+\s*\}/g;
export function getStringInterpolations(string: String): RegExpMatchArray[] {
  return [...string.matchAll(stringInterpolations)]
}

export function flatten<T>(
  data: T, response = data,
  {
    flatKey = "", onlyLastKey = false, seen = [], original = data
  }: {
    flatKey?: string,
    onlyLastKey?: boolean, // text key value display (instead of x.y.z just get z)
    seen?: any[], original?: T
  } = {}
) {
  const entries = Object.entries(data)
  for (const [key, value] of entries) {
    let newFlatKey;
    if (!isNaN(parseInt(key)) && flatKey.includes("[]")) {
      newFlatKey = (flatKey.charAt(flatKey.length - 1) == "." ? flatKey.slice(0, -1) : flatKey) + `[${key}]`;
    } else if (!flatKey.includes(".") && flatKey.length > 0) {
      newFlatKey = `${flatKey}.${key}`;
    } else {
      newFlatKey = `${flatKey}${key}`;
    }

    const isValObject = typeof value === "object" && value !== null && Object.keys(value).length > 0
    if (isValObject && !seen.includes(value) && value !== original) {
      seen.push(value)
      flatten(value, response, {flatKey: `${newFlatKey}.`, onlyLastKey, seen, original});
    } else {
      if(onlyLastKey){
        newFlatKey = newFlatKey.split(".").pop();
      }
      if (Array.isArray(response)) {
        response.push({
          [newFlatKey.replace("[]", "")]: value
        });
      } else {
        response[newFlatKey.replace("[]", "")] = value;
      }
    }
  }
  return response;
}

export function removeFlats<T>(data: T): T {
  const removes = Object.keys(data).filter(key => key.indexOf('.')>=0)
  removes.forEach(key => delete data[key])
  return data
}

export function getSaveableStorage(storage: any) {
  const cloneStorage = JSON.parse(JSON.stringify(storage))
  delete cloneStorage.temp

  if (!cloneStorage.saveKeyLocally) {
    delete cloneStorage.key
  }

  if (!cloneStorage.savePrivateKeyLocally) {
    delete cloneStorage.privateKey
    delete cloneStorage.webhookSigningSecret
  }

  if (!cloneStorage.saveRequestsLocal) {
    delete cloneStorage.requests
  }

  return cloneStorage
}
