/** web browser intended functionality. May work in server side */
import * as hmacSHA256 from 'crypto-js/hmac-sha256'
import * as formatHex from 'crypto-js/format-hex'

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