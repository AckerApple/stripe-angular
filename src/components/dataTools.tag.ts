import { html, letState, tag } from "taggedjs"
import { copyText } from "./copyText.function";

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
    const split = id.split('_')
    if(split.length < 2 || !split[1].length) {
      return false
    }
    const prefix = split[0].toUpperCase();
    return STRIPE_ENDPOINTS[prefix];
  };
  
  const getStripeURL = (host: string, id: string) => {
    const uri = STRIPE_HOSTS[host];
    const url = isValidId(id);
    return url && uri + url + '/' + id;
  };

  let inputVal = letState('')(x => [inputVal, inputVal = x])
  // let selectVal = letState('SANDBOX')(x => [selectVal, selectVal = x])
  const isValid = isValidId(inputVal)

  console.log('inputVal', {inputVal, isValid})

  return html`
    <div class="flex2 flex-wrap bg-grey pad">
      <h2 class="lookup m-0 mb-2">🔎 ⭐️ Stripe ID Linking <em><span>pi_*</span> <span>py_*</span> <span>cus_*</span> <span>evt_*</span></em></h2>
      <div class="flex flex-wrap flex1 gap">
        <input
          type="text"
          maxLength="125"
          value=${inputVal}
          onkeyup=${e => inputVal = e.target.value}
          placeholder="Enter Stripe ID"
          class="flex-1"
        />
        ${isValid && html`
          <div class="flex flex-wrap gap">
            <a href=${getStripeURL('SANDBOX', inputVal)} target="_blank"><button>sandbox</button></a>
            <a href=${getStripeURL('PROD', inputVal)} target="_blank"><button>production</button></a>
          </div>
        `}
      </div>
    </div>
  `
})

export const dateConversions = tag(() => {
  let toStripeVal = letState('')(x => [toStripeVal, toStripeVal = x])
  let fromStripeVal = letState('')(x => [fromStripeVal, fromStripeVal = x])

  const convertDate = () => {
    const date = new Date(toStripeVal);
    const unixString = Math.floor(date.getTime() / 1000);
    fromStripeVal = String(unixString);
  }

  const convertStripeNumber = () => {
    const date = new Date(Number(fromStripeVal) * 1000);
    const isoString = date.toISOString();
    toStripeVal = isoString;
  }

  return html`
    <div class="flex2 bg-grey pad">
      <h2 class="m-0 mb-2">📅 🔁 Stripe Date Conversions</h2>
      <div class="flex flex-wrap gap">
        <div class="flex1 pos-rel">
          ${toStripeVal && html`
            <a class="pos-abs right-0 pad-right-xs active-text-2x" onclick=${() => copyText(toStripeVal)}>📋</a>
          `}
          <input type="text" maxLength="125" value=${toStripeVal} onkeyup=${e => {
            const same = toStripeVal === e.target.value
            if(same)return;
            toStripeVal = e.target.value;
            convertDate()
          }} placeholder="Convert to Stripe Date" class="width-full" />
        </div>
        
        <div class="flex1 pos-rel">
          ${fromStripeVal && html`
            <a class="pos-abs right-0 pad-right-xs active-text-2x" onclick=${() => copyText(fromStripeVal)}>📋</a>
          `}
          <input type="text" maxLength="125" value=${fromStripeVal} onkeyup=${e => {
            const same = fromStripeVal === e.target.value
            if(same)return;
            fromStripeVal = e.target.value;
            convertStripeNumber()
          }} placeholder="Convert from Stripe Date" class="width-full" />
        </div>
      </div>
    </div>
  `
})
