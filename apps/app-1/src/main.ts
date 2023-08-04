import Vue from 'vue';
import App from '@/components/App1.vue';
import ui from '@libs/ui';

Vue.use(ui);

export default new Vue({
  render: (h) => h(App),
}).$mount('#app');
