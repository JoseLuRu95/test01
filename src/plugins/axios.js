// "use strict";

// import Vue from 'vue';
// import axios from "axios";

// // Full config:  https://github.com/axios/axios#request-config
// // axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// let config = {
//   // baseURL: process.env.baseURL || process.env.apiUrl || ""
//   // timeout: 60 * 1000, // Timeout
//   // withCredentials: true, // Check cross-site Access-Control
// };

// const _axios = axios.create(config);

// _axios.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     return config;
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// _axios.interceptors.response.use(
//   function(response) {
//     // Do something with response data
//     return response;
//   },
//   function(error) {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

// Plugin.install = function(Vue) {
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       }
//     },
//     $axios: {
//       get() {
//         return _axios;
//       }
//     },
//   });
// };

// Vue.use(Plugin)

// export default Plugin;

// ********************

import Axios from 'axios'

export default {
  install(Vue) {
    Vue.$http = Axios
    Object.defineProperties(Vue.prototype, {
      // axios: {
      //   get() {
      //     return Axios;
      //   }
      // },
      $axios: {
        get() {
          return Axios;
        }
      },
    });

    // *Setting Axios*
    const baseURL = process.env.NODE_ENV === 'development'
      ? process.env.VUE_APP_API_LOCATION || 'http://dev.localhost:8000/api/v1/'
      : '/api/v1/'
    Axios.defaults.xsrfCookieName = 'csrftoken'
    Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    Axios.defaults.baseURL = baseURL
    Axios.defaults.headers.common.Accept = 'application/json'

    Axios.interceptors.response.use(
      response => response, (error) => {
        if (error.response && error.response.status === 401) {
          // Vue.$router.push({
          //   name: 'Login'
          // })  
        }
        throw error
      })
  },
}
