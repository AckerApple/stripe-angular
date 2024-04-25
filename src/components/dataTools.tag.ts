import { html, letState, providers, tag } from "taggedjs"

// El$ work within this file

/** This tag is put onto Angular stage of Stripe tool */
export const dataTools = tag(() => {
  // demo useState replacement
  let counter = letState(0)(x => [counter, counter = x])
  
  // demo dependency creation
  let provider = providers.create(CounterProvider)

  return html`
    <h2>hello El$</h2>
    <p>Code new stripe tools here</p>

    <button onclick=${() => ++counter}>increase counter to ${counter + 1}</button>
    <button onclick=${() => ++provider.counter}>increase provider counter to ${provider.counter + 1}</button>
    <hr />
    ${child({counter, increaseCounter: () => ++counter})}
  `
})

// TEST PROVIDER, can be deleted when done
const CounterProvider = () => ({counter: 0})

// TEST CHILD TAG with props, can be deleted when done
const child = tag((
  {counter, increaseCounter}: {counter: number, increaseCounter: () => unknown}
) => {
  let provider = providers.inject(CounterProvider) // demo dependency injection

  return html`
    <button onclick=${increaseCounter}>increase counter to ${counter + 1}</button>
    <button onclick=${() => ++provider.counter}>increase provider counter to ${provider.counter + 1}</button>
  `
})
