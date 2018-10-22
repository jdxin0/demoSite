import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: function(x){
      // eslint-disable-next-line
        console.log(x);
        return x(App)
    }
}).$mount('#app')
