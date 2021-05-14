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

  temp: {[index: string]: any}
}

export function request(
  {url, method, post, authorizationBearer}: {
    url: string, method?: 'GET' | 'POST'
    post?: {[x: string]: any}
    authorizationBearer?: string
  }
) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    const endMethod = method || (post ? 'POST' : 'GET')
    req.open(endMethod, url, true);
    req.setRequestHeader('Accept', 'application/json');

    if (authorizationBearer) {
      req.setRequestHeader('Authorization', 'Bearer ' + authorizationBearer);
    }

    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    // const formPost = objectToUriForm(post);
    const formPost = formurlencoded(post);
    req.send( formPost );

    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        res(req.responseText);
        req.responseText;
      }
    }
  });
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
  data: {[index:string]: any}
  request?: {
    method: string
    path: string
  }
  load: number
  result?: {[index:string]: any}
  resultAt?: number
  error?: any
  // stringResult?: string
  // retrieve?: any // any update checks that might occur
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
