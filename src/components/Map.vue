<template>
  <div class="column is-10">
    <div class="map-wrapper">
      <div id="map"></div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Modal from '@/components/Modal'
import * as turf from '@turf/helpers'
import * as mapboxgl from 'mapbox-gl'

export default {
  name: 'Map',
  data () {
    return {
      isFullPage: true
    }
  },
  mounted () {
    this.loadAll()
    this.loading()
  },
  computed: {
    ...mapGetters([
      'activeFilters',
      'activeFeatures'
    ])
  },
  watch: {
    activeFeatures: function () {
      this.loadData()
    },
    activeFilters: function () {
      this.loadData()
    }
  },
  methods: {
    async createMap () {
      mapboxgl.accessToken = process.env.MAPBOX_KEY
      if (!mapboxgl.supported()) {
        alert('Your browser does not support Mapbox GL')
      } else {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'https://openmaptiles.github.io/klokantech-3d-gl-style/style-cdn.json',
          center: [5.9, 45.1],
          zoom: 10
        })
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')
        this.map.addControl(new mapboxgl.GeolocateControl(), 'top-left')
        this.map.addControl(new mapboxgl.ScaleControl({unit: 'kilometer'}))
        this.map.on('load', () => {
          this.setMapEvents()
        })
      }
    },
    setMapEvents () {
      this.map.addSource('places', {
        type: 'geojson',
        data: turf.featureCollection([])
      })
      this.map.addLayer({
        id: 'structures',
        type: 'circle',
        source: 'places',
        'paint': {
          'circle-radius': {
            'stops': [[0, 2], [8, 6], [16, 16]]
          },
          'circle-color': '#70d1d1',
          'circle-stroke-width': {
            'stops': [[0, 1], [8, 2], [16, 2]]
          },
          'circle-stroke-color': '#fff'
        }
      })
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      })
      this.map.on('mouseenter', 'structures', e => {
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: ['structures']
        })
        const feature = features[0]
        popup.setLngLat(feature.geometry.coordinates)
          .setHTML(feature.properties.title)
          .addTo(this.map)
      })
      this.map.on('mousemove', e => {
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: ['structures']
        })
        this.map.getCanvas().style.cursor = features.length ? 'pointer' : ''
      })
      this.map.on('mouseleave', 'structures', () => {
        popup.remove()
      })
      this.map.on('zoomend', () => {
        if (this.map.getZoom() >= 15) {
          this.map.easeTo({pitch: 60})
        } else {
          this.map.easeTo({pitch: 0})
        }
      })
      this.map.on('click', e => {
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: ['structures']
        })
        if (!features.length) {
          return
        }
        const feature = features[0]
        this.$modal.open({
          active: true,
          parent: this,
          component: Modal,
          props: {
            feature: feature
          }
        })
      })
    },
    async loadFeatures () {
      await this.$store.dispatch('loadFeatures')
    },
    loadData () {
      this.map.getSource('places').setData(turf.featureCollection(this.activeFeatures))
    },
    async loadAll () {
      await this.createMap()
      await this.loadFeatures()
    },
    loading () {
      const loadingComponent = this.$loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      setTimeout(() => loadingComponent.close(), 2 * 1000)
    }
  }
}
</script>

<style scoped>
.map-wrapper { width: 100%; height:100%; position: fixed;}
#map { width: 100%; height:100%; position: relative;}
</style>
