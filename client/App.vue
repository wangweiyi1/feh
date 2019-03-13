<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body{
    background: #e9ebee;
  }

  #app {
    height: 100%;
  }
</style>
