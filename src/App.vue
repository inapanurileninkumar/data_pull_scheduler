<template>
  <div>
    <home></home>
  </div>
</template>

<script>
  import Home from '@/components/Home';

  export default {
    name: 'App',
    components: {
      Home,
    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding-right: 60px;
    /*overflow: hidden;*/
    background: #f2f2f2;
  }
</style>
