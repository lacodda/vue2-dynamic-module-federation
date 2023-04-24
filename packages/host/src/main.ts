import Vue from 'vue';
import App from 'components/App.vue';
import 'styles/index.scss';

Vue.component('navbar', () => import('components/Navbar.vue'));

export default new Vue({
    render: (h) => h(App),
}).$mount('#app');
