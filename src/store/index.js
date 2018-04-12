import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    features: [],
    filters: [
      { name: 'Espace Public Numérique', active: true },
      { name: 'Espace de coworking', active: true },
      { name: 'InfoLab', active: true },
      { name: 'FabLab', active: true },
      { name: 'MédiaLab', active: true },
      { name: 'LivingLab', active: true },
      { name: 'Hackerspace', active: true },
      { name: 'Makerspace', active: true },
      { name: 'Repair Café', active: true },
      { name: 'Tiers-lieux', active: true }
    ],
    sidebar: {
      active: true
    }
  },
  getters: {
    activeFilters: state => {
      let activeFilters = []
      for (let filter of state.filters.filter(filter => filter.active)) {
        activeFilters.push(filter.name)
      }
      return activeFilters
    },
    activeFeatures: (state, getters) => {
      return state.features.filter(feature => feature.properties.types.some(filter => getters.activeFilters.includes(filter)))
    }
  },
  mutations: {
    loadFeatures (state, features) {
      state.features = features
    },
    switchFilters (state, filters) {
      state.filters = filters
    },
    sidebarActive (state, active) {
      state.sidebar.active = active
    }
  },
  actions: {
    loadFeatures ({ commit }) {
      let features = []
      axios
        .get(process.env.API_URL)
        .then(response => {
          let pagesNumber = Number(response.headers['x-wp-totalpages'])
          for (let i = 1; i <= pagesNumber; i++) {
            axios
              .get(process.env.API_URL + '?page=' + i)
              .then(response => {
                for (let value in response.data) {
                  if (response.data[value].localisation[0].properties['types'] != null) {
                    response.data[value].localisation[0].properties['title'] = response.data[value].title.rendered
                    response.data[value].localisation[0].properties['content'] = response.data[value].content.rendered
                    features.push(response.data[value].localisation[0])
                  }
                }
              })
          }
        })
      commit('loadFeatures', features)
    },
    switchFilters ({ commit }, filters) {
      commit('switchFilters', filters)
    },
    sidebarActive ({ commit }, active) {
      commit('sidebarActive', active)
    }
  }
})
