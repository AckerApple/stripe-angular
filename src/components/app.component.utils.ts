import * as hmacSHA256 from 'crypto-js/hmac-sha256';
import * as formatHex from 'crypto-js/format-hex';
import { EventEmitter } from "@angular/core"
import formurlencoded from 'form-urlencoded';

export const stripeServer = 'https://api.stripe.com/v1/';
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

export interface localSchema {
  key: string
  privateKey: string
  webhookSigningSecret?: string
  saveRequestsLocal?: boolean
  saveKeyLocally?: boolean
  savePrivateKeyLocally?: boolean
  metadata?: Record<string, any>
  extraData?: any
  requests?: {
    source?: any
    paymentMethod?: any
  }

  plaid?: {
    client_id?: string,
    secret?: string,
  }

  temp: {[index: string]: any}
}

export interface RequestOptions {
  url: string, method?: 'GET' | 'POST' | string
  post?: {[x: string]: any}
  json?: {[x: string]: any}
  authorizationBearer?: string
}

export function request(
  {url, method, post, json, authorizationBearer}: RequestOptions
) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    const endMethod = method || (post || json ? 'POST' : 'GET')

    // req.open(endMethod, url, true);
    req.open(endMethod, url);
    req.setRequestHeader('Accept', 'application/json');

    if (authorizationBearer) {
      req.setRequestHeader('Authorization', 'Bearer ' + authorizationBearer);
    }

    // const formPost = objectToUriForm(post);
    if (post) {
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      const formPost = formurlencoded(post);
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

export interface ISimpleRouteEditor {
  title?: string
  description?: string
  hint?: string
  link?: string // documentation link
  data: {[index:string]: any}
  request?: {
    method: string
    host?: string // base url example https://sandbox.plaid.com/
    path: string
  }
  results?: {
    favKeys: {
      name: string
      get?: (data: any) => any
    }[] // ['link_token']
  },
}

export interface SmartRouteEditor extends ISimpleRouteEditor {
  load: number
  resultAt?: number
  error?: any
  result?: {[index:string]: any} // runtime paste of result
  $send: EventEmitter<{[index:string]: any}>
}


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

  storage.key = storage.key || localStorage?.stripeAnguarKey || "pk_test_5JZuHhxsinNGc5JanVWWKSKq"
  storage.privateKey = storage.privateKey || localStorage?.stripeAngularPrivateKey

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

/**
 * Generates a header to be used for webhook mocking
 *
 * @typedef {object} opts
 * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
 * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
 * @property {string} secret - Stripe webhook secret 'whsec_...'
 * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
 * @property {string} signature - Computed webhook signature
 */
 export function generateTestHeaderString(opts) {
  if (!opts) {
    throw new Error('Options are required');
  }

  opts.timestamp = Math.floor(opts.timestamp) || Math.floor(Date.now() / 1000);
  opts.scheme = opts.scheme || 'v1';

  opts.signature =
    opts.signature ||
    _computeSignature(
      opts.timestamp + '.' + opts.payload,
      opts.secret
    );

  const generatedHeader = [
    't=' +  opts.timestamp,
    opts.scheme + '=' + opts.signature,
  ].join(',');

  return generatedHeader;
}

function _computeSignature(payload, secret) {
  const data = hmacSHA256(payload, secret)
  const hmacDigest = formatHex.stringify({ciphertext:data});
  return hmacDigest
}


export function changeKey(
  scope: SmartRouteEditor,
  value: string
) {
  delete scope.error
  const keys = ['data']
  var current = scope;

  while(keys.length > 1) {
    current = current[keys.shift()];
  }

  try {
    // current[keys[0]] = JSON.parse(value);
    eval('current[keys[0]] = ' + value); // allow loose js to be cast to json
  } catch (err) {
    scope.error = Object.getOwnPropertyNames(err).reverse().reduce((a, key) => (a[key] = err[key]) && a || a, {} as any)
    console.error(`failed to parse object key ${keys[0]}`);
    throw err
  }
}

