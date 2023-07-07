<script setup>
const enabled = ref(true);
setTimeout(() => {
  enabled.value = false;
}, 3000);
</script>

<template>
  <section v-accordion="{ group: 'group', enabled: false }">
    <div :style="{ background: 'pink' }" />
    <div :style="{ background: 'purple' }">
      <div />
    </div>
  </section>
  <section v-accordion="'group'">
    <div :style="{ background: 'pink' }" />
    <div :style="{ background: 'purple' }">
      <div />
    </div>
  </section>
  <section v-lay="{ dir: 'h', align: ['center'], enabled: true }" :style="{ background: 'blue' }">
    <div v-for="n in 8" :style="{ background: `rgb(1${n}0, 1${n}0, 1${n}0)`, height: `${n}00px` }" />
  </section>
  <section v-visible="true" v-lay="{ dir: 'h', align: ['center', 'even'], fluid: true }">
    <span v-for="n in 3" :style="{ background: `rgb(200, 1${n}0, 1${n}0)` }" />
  </section>
  <section v-grid="{ align: ['end'], enabled: true }" v-pad="'m'" :style="{ background: 'green' }">
    <div v-cols="'1 / -1'" :style="{ background: 'orange' }" />
    <div v-for="n in 4" v-self="n === 2 ? ['start'] : ['end']"
      :style="{ background: `rgb(2${n}0, 2${n}0, 2${n}0)`, height: `${n}00px` }" />
  </section>
</template>

<style lang="postcss" scoped>
@import 'normalize.css';

div {
  height: 200px;

  @media (--hover) {
    &:hover {
      background: red;
    }
  }
}

span {
  display: block;
  width: 100px;
  height: 100px;
}
</style>
