import Vue from 'vue'
/**
 * @author José Luis R. <jose.ruiz@jbge.com.mx>
 *
 * Service to fetch exchanges data
 *
 * @param  props
 */

const currencyService = (props = {}) =>
  Vue.$http[props.request](`https://httpbin.org/${props.request}`, props.payload)
    .then(() => {
      return true
    }).catch(err => {
      throw err
    })
export default currencyService
