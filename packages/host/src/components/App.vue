<template>
  <div class="host">
    <navbar :apps="apps" :selected="selected" :host="host" @loadServers="loadServers" @setComponent="setComponent" />
    <component :is="comp" />
    <div v-if="!comp" class="host__content">
      <div class="host__title">
        <h1>Host</h1>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { LoadRemoteModule } from '../load-remote-module';

@Component
export default class App extends Vue {
  loadRemoteModule = new LoadRemoteModule();
  comp = null;
  host: string = 'http://localhost:8080/assets/apps.json';
  apps: string[] = [];
  selected: string = '';

  async setComponent (selected: string) {
    this.selected = selected;
    if (!this.selected) {
      this.comp = null;
      return;
    }
    this.comp = (await this.loadRemoteModule.loadComponent(this.selected, './Module')).default;
  }

  async loadServers () {
    await this.loadRemoteModule.setHost(this.host).loadServers();
    this.apps = this.loadRemoteModule.apps;
  }
}
</script>

<style scoped lang='scss'>
.host {
  background: var(--gr-azure-pink);
  width: 100%;
  height: 100%;
  &__content {
    display: grid;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
    h1 {
      width: max-content;
      text-transform: uppercase;
      background: var(--teal);
      background: var(--gr-teal-blue);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
