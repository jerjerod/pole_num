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
    async getNbPages () {
      let response = await axios.get(process.env.API_URL)
      let pagesNumber = Number(response.headers['x-wp-totalpages'])
      return pagesNumber
    },
    async loadFeatures ({ commit, dispatch }) {
      const features = []
      const callPages = []
      let pagesNumber = await dispatch('getNbPages')
      for (let i = 1; i <= pagesNumber; i++) {
        callPages.push(axios.get(process.env.API_URL + '?page=' + i))
      }
      let responses = await axios.all(callPages)
      for (let a in responses) {
        for (let b in responses[a].data) {
          if (responses[a].data[b].localisation != null) {
            responses[a].data[b].localisation[0].properties['title'] = responses[a].data[b].title.rendered
            responses[a].data[b].localisation[0].properties['content'] = responses[a].data[b].content.rendered
            features.push(responses[a].data[b].localisation[0])
          }
        }
      }
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
