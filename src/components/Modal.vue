<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title" v-html="feature.properties.title"></p>
    </header>
    <section class="modal-card-body">
      <p v-if="feature.properties.adresse" v-html="feature.properties.adresse"><span class="icon"><i class="mdi mdi-map-marker"></i></span></p>
      <div v-if="feature.properties.telephone"><b-icon icon="phone" size="is-medium"></b-icon><span class="phone" v-html="feature.properties.telephone"></span></div>
      <div class="block">
        <a v-if="feature.properties.web" :href="feature.properties.web" target="_blank">
          <b-icon icon="web" size="is-large"></b-icon>
        </a>
        <a v-if="feature.properties.twitter" :href="feature.properties.twitter" target="_blank">
          <b-icon icon="twitter" size="is-large"></b-icon>
        </a>
        <a v-if="feature.properties.facebook" :href="feature.properties.facebook" target="_blank">
          <b-icon icon="facebook" size="is-large"></b-icon>
        </a>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Fermer</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FeatureContent',
  props: ['feature']
}
</script>
<style scoped>
.phone {font-size: 20px;}
.modal-card-head {background-color: rgba(10, 10, 10, 0.86);}
.modal-card-title {color:#fff; font-weight: bold;}
ul li {margin:20px;}
</style>
