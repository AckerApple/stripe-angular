export function removeAllNulls(value: any, options: {seen?:any[]}={}): any {
  const isValid = value instanceof Object && value!=undefined && value!=null
  if (isValid) {
    const seen = options.seen || []

    for(const key in value){
      if (value[key]===null) {
        delete value[key]
        continue
      }

      if (seen.includes(value[key])) {
        continue // skip, already done
      }

      seen.push(value[key])

      if (value[key] instanceof Array) {
        value[key].forEach(value => removeAllNulls(value, {seen}))
        continue
      }

      if (value[key] instanceof Object) {
        removeAllNulls(value[key], {seen})
      }
    }
  }

  return value
}



/*const x = removeAllNulls({
  a: null,
  b: 22,
  array: [{
    a: null,
    b:33
  }]
})

console.log('x',x)*/