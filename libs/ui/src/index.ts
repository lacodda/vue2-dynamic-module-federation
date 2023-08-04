import './styles/index.scss';

export default {
  install(app: any) {
    app.component('button-el', async () => await import('./components/Button.vue'));
    app.component('navbar-el', async () => await import('./components/Navbar.vue'));
  },
};
