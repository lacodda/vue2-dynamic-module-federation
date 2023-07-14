<template>
  <div class="app1__container">
    <div class="app1__title">
      <h1>App 1</h1>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App1 extends Vue {}
</script>

<style scoped lang='scss'>
.app1 {
  &__container {
    display: grid;
    justify-content: center;
    align-content: center;
    background: var(--gr-pink-violet);
    width: 100%;
    height: 100%;
  }
  &__title {
    display: flex;
    h1 {
      width: max-content;
      text-transform: uppercase;
      background: var(--purple);
      background: var(--gr-violet-purple);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
