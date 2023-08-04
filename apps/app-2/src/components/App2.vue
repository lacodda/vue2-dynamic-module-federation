<template>
  <div class="app2__container">
    <div class="app2__title">
      <h1>App 2</h1>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App2 extends Vue {}
</script>

<style scoped lang='scss'>
.app2 {
  &__container {
    display: grid;
    justify-content: center;
    align-content: center;
    background: var(--gr-lime-blue);
    width: 100%;
    height: 100%;
  }
  &__title {
    display: flex;
    h1 {
      font-size: 2.6rem;
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
