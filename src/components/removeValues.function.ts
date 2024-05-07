export function removeValues(data: any, values: any[], options: {seen?:any[]}={}): any {
  const isValid = data instanceof Object && data!=undefined && data!=null
  if (isValid) {
    const seen = options.seen || []

    for(const key in data){
      if (values.includes(data[key])) {
        delete data[key]
        continue
      }

      if (seen.includes(data[key])) {
        continue // skip, already done
      }

      seen.push(data[key])

      if (data[key] instanceof Array) {
        data[key].forEach(data => removeValues(data, values, {seen}))
        continue
      }

      if (data[key] instanceof Object) {
        removeValues(data[key], values, {seen})
      }
    }
  }

  return data
}
