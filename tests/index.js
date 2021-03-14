import Vue from 'vue'
import Vuetify from 'vuetify'
// import router from "../src/router"

import axios from "../src/plugins/axios";
import mixins from "../src/plugins/mixins";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(axios);
Vue.use(mixins);
// Vue.use(router);
