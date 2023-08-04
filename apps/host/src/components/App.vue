<template>
  <div class="host">
    <navbar-el>
      <input :value="host" style="width: 100%" @input="setHost" />
      <button-el @click="loadServers">Download</button-el>
      <select :value="selected" @change="setComponent">
        <option value="">Please select one</option>
        <option v-for="(app, key) in apps" :key="key" :value="app">{{app}}</option>
      </select>
    </navbar-el>
    <component :is="dynamicComponent" />
    <div v-if="!dynamicComponent" class="host__content">
      <div class="host__title">
        <h1>Host</h1>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { LoadRemoteModule } from '@libs/utils';

type HTMLElementEvent<T extends HTMLElement> = Event & { target: T };

@Component
export default class App extends Vue {
  loadRemoteModule = new LoadRemoteModule();
  dynamicComponent: any = null;
  host: string = process.env.APPS_URL ?? '';
  apps: string[] = [];
  selected: string = '';

  setHost (event: HTMLElementEvent<HTMLButtonElement>): void {
    this.host = event.target.value;
  }

  async setComponent (event: HTMLElementEvent<HTMLButtonElement>): Promise<void> {
    this.selected = event.target.value;
    if (!this.selected) {
      this.dynamicComponent = null;
      return;
    }
    this.dynamicComponent = (await this.loadRemoteModule.loadComponent(this.selected, './Module')).default;
  }

  async loadServers (): Promise<void> {
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
      font-size: var(--font-size-h1);
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
