import { Context } from '@nuxt/types'
import { stringify } from 'query-string'

export default function(context: Context) {
  // context.$axios.setHeader('Accept', 'application/json,text/plain;q=0.9,*/*;q=0.8')
  //
  // context.$axios.defaults.paramsSerializer = params => {
  //   const cleanedParams = Object.keys(params).reduce((output, key) => {
  //     // @ts-ignore
  //     output[key] = params[key] === '' || params[key] === [] ? undefined : params[key]
  //     return output
  //   }, {})
  //   return stringify(cleanedParams, { arrayFormat: 'comma', encode: false })
  // }
}
