<template>
  <div class="navbar__container">
    <div class="navbar__menu">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue { }
</script>

<style scoped lang="scss">
.navbar {
  &__container {
    position: absolute;
    width: 100%;
  }

  &__menu {
    display: flex;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;

    a {
      color: var(--white);
      font-weight: 700;
      text-decoration: none;
      transition: 1s;
      text-transform: uppercase;

      &:hover {
        color: var(--purple);
      }
    }

    input, textarea, select {
      padding: .45rem .5rem;
      border-color: transparent;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      line-height: 0.5rem;
      height: min-content;
      color: var(--black);
    }
  }
}</style>
