<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" >
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="@/assets/logo.png" alt="Bulma: a modern CSS framework based on Flexbox">
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
