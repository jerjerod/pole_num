<template>
  <div class="column is-2 section sidebar" v-bind:class="{ 'is-hidden-mobile': sidebar.active }">
    <aside class="menu">
      <p class="menu-label">
        Filtres
      </p>
      <section>
        <div class="field" v-bind:key="index" v-for="(filter, index) in filters">
          <b-switch size="is-small" v-model="filter.active"> {{filter.name}} </b-switch>
        </div>
      </section>
      <div class="buttons is-centered">
        <p class="field">
          <button class="button is-primary is-outlined is-rounded" type="button" @click="toggleButton">Tout {{button.text}}</button>
        </p>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      filters: this.$store.state.filters,
      button: {
        text: 'désactiver',
        active: true
      },
      sidebar: this.$store.state.sidebar
    }
  },
  methods: {
    toggleButton () {
      this.button.active = !this.button.active
      this.button.text = this.button.active ? 'désactiver' : 'activer'
      for (let filter of this.filters) {
        filter.active = this.button.active
      }
    },
    toggleSidebar () {
      this.sidebar.active = !this.sidebar.active
    }
  },
  watch: {
    'filters': {
      handler: function () {
        this.$store.dispatch('switchFilters', this.filters)
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.sidebar {
  top:50px;
  bottom:40px;
  overflow-y:auto;
}
.buttons {
  margin-top:10px;
}
</style>
