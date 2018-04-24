<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title" v-html="feature.properties.title"></p>
    </header>
    <section class="modal-card-body">
      <div v-html="feature.properties.content"></div>
      <p v-if="feature.properties.adresse" v-html="feature.properties.adresse"><span class="icon"><i class="mdi mdi-map-marker"></i></span></p>
      <p v-if="feature.properties.telephone" v-html="feature.properties.telephone"><span class="icon"><i class="mdi mdi-phone"></i></span></p>
      <p v-if="feature.properties.web" v-html="feature.properties.web"><span class="icon"><i class="mdi mdi-web"></i></span><a :href="feature.properties.web" target="_blank"></a></p>
      <p v-if="feature.properties.twitter" v-html="feature.properties.twitter"><span class="icon"><i class="mdi mdi-twitter"></i></span></p>
      <p v-if="feature.properties.facebook" v-html="feature.properties.facebook"><span class="icon"><i class="mdi mdi-facebook"></i></span></p>
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
