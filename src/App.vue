<template>
  <div id="app">
    <Header></Header>
    <div class="columns">
      <sidebar></sidebar>
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Sidebar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
