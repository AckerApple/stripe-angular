import { html, letState, tag } from "taggedjs"

const STRIPE_HOSTS = {
  'SANDBOX': 'https://dashboard.stripe.com/test',
  'PROD': 'https://dashboard.stripe.com'
};

const STRIPE_ENDPOINTS = {
  'PI': '/payments',
  'PY': '/payments',
  'CUS': '/customers',
  'EVT': '/events'
};

export const dataTools = tag(() => {
  return html`
    <div class="flex-wrap flex-center flex1 gap">
      ${stripeIdLookup()}
      ${dateConversions()}
    </div>
  `
})

export const stripeIdLookup = tag(() => {
  const isValidId = (id: string) => {
    const prefix = id.split('_')[0].toUpperCase();
    return STRIPE_ENDPOINTS[prefix];
  };
  
  const getStripeURL = (host: string, id: string) => {
    const uri = STRIPE_HOSTS[host];
    const url = isValidId(id);
    return url && uri + url + '/' + id;
  };

  let inputVal = letState('')(x => [inputVal, inputVal = x])
  let selectVal = letState('SANDBOX')(x => [selectVal, selectVal = x])
  const isValid = isValidId(inputVal)

  return html`
    <div class="flex2 flex-wrap bg-grey pad">
      <h2 class="lookup m-0 mb-2">🔎 ⭐️ Stripe ID Lookup <em><span>pi_*</span> <span>py_*</span> <span>cus_*</span> <span>evt_*</span></em></h2>
      <div class="flex flex-wrap flex1">
        <select class="flex-1 mr-2" onchange=${e => selectVal = e.target.value}>
          <option value="SANDBOX">Sandbox</option>
          <option value="PROD">Production</option>
        </select>
        <input type="text" maxLength="125" value=${inputVal} onkeyup=${e => inputVal = e.target.value} placeholder="Enter Stripe ID" class="flex-1 mr-2" />
        <a href=${getStripeURL(selectVal, inputVal)} target="_blank">
          <button disabled=${!isValid} class.opacity-50=${!isValid} class.bg-balanced=${isValid}>GO</button>
        </a>
      </div>
    </div>
  `
})

export const dateConversions = tag(() => {
  let toStripeVal = letState('')(x => [toStripeVal, toStripeVal = x])
  let fromStripeVal = letState('')(x => [fromStripeVal, fromStripeVal = x])

  const convertDate = () => {
    if (toStripeVal) {
      const date = new Date(toStripeVal);
      const unixString = Math.floor(date.getTime() / 1000);
      toStripeVal = String(unixString);
    }

    if (fromStripeVal) {
      const date = new Date(Number(fromStripeVal) * 1000);
      const isoString = date.toISOString();
      fromStripeVal = isoString;
    }
  };

  const isValidInputs = (to: string, from: string) => {
    if (toStripeVal) {
      const date = new Date(toStripeVal);
      return isNaN(date.getTime()) ? false : true;
    } else if (fromStripeVal) {
      const date = new Date(Number(fromStripeVal) * 1000);
      return isNaN(date.getTime()) ? false : true;
    }

    return false;
  }

  const isValid = isValidInputs(toStripeVal, fromStripeVal);

  return html`
    <div class="flex2 flex-wrap bg-grey pad">
      <h2 class="m-0 mb-2">📅 🔁 Stripe Date Conversions</h2>
      <div class="flex flex-wrap flex1">
        <input type="text" maxLength="125" value=${toStripeVal} onkeyup=${e => {
          toStripeVal = e.target.value;
          fromStripeVal = '';
        }} placeholder="Convert to Stripe Date" class="flex-1 mr-2" />
        <input type="text" maxLength="125" value=${fromStripeVal} onkeyup=${e => {
          fromStripeVal = e.target.value;
          toStripeVal = '';
        }} placeholder="Convert from Stripe Date" class="flex-1 mr-2" />
        <button onclick=${convertDate} disabled=${!isValid} class.opacity-50=${!isValid} class.bg-balanced=${isValid}>Convert</button>
      </div>
    </div>
  `
})
