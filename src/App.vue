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
<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Poppins');
  @import "~bulma/sass/utilities/_all";
  $primary: #70d1d1;
  $text:#212529;
  $family-primary: "Poppins", sans-serif;
  $link: $primary;
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
