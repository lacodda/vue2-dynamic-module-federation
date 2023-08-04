import Vue from 'vue';
import './styles/index.scss';

Vue.component('button-el', async () => await import('./components/Button.vue'));
Vue.component('navbar-el', async () => await import('./components/Navbar.vue'));
