import Vue from 'vue'
/**
 * @author José Luis R. <jose.ruiz@jbge.com.mx>
 *
 * Service to fetch exchanges data
 *
 * @param  props
 */

const exchangeService = (props = {}) =>
  Vue.$http.get("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((response) => {
      console.assert(props);
      const info = []
      const EUR = response.data.bpi.EUR;
      const GBP = response.data.bpi.GBP;
      const USD = response.data.bpi.USD;
      info.push(EUR, GBP, USD);
      return info
    })
    .catch(err => {
      throw err
    })

export default exchangeService
