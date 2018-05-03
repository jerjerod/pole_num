<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" >
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="@/assets/logo.png" alt="">
      </a>
      <div class="navbar-burger"  @click="toggleSidebar">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      sidebar: this.$store.state.sidebar.active
    }
  },
  methods: {
    toggleSidebar () {
      this.sidebar = !this.sidebar
    }
  },
  watch: {
    'sidebar': {
      handler () {
        this.$store.dispatch('sidebarActive', this.sidebar)
      }
    }
  }
}
</script>
<style>
.navbar-item img {max-height: 3rem;}
</style>
