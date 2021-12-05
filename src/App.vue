<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<style lang="scss">
  .bi {
    margin-right: 4px;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Navbar from '@/components/Navbar.vue';

  @Component({
    components: {
      Navbar
    },
    metaInfo() {
       return {
          titleTemplate(titleChunk: string): string {
            return titleChunk ? `CVthèque - ${titleChunk}` : 'CVthèque';
          }
      }
    }
  })
  export default class App extends Vue {}
</script>
