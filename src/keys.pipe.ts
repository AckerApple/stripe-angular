import { Pipe } from '@angular/core'

@Pipe({name: 'keys'}) export class KeysPipe {
  transform(input:any){
    const type = typeof(input)=='object'
    const isOb = input && type
    const isArray = isOb && input.constructor == Array

    if(isArray){
      return input.map((_value: any, index: any)=>index)
    }

    return input ? Object.keys(input) : []
  }
}
