<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{feature.properties.title}}</p>
    </header>
    <section class="modal-card-body">
      <p v-if="feature.properties.adresse"><span class="icon"><i class="mdi mdi-map-marker"></i></span>{{feature.properties.adresse}}</p>
      <p v-if="feature.properties.telephone"><span class="icon"><i class="mdi mdi-phone"></i></span>{{feature.properties.telephone}}</p>
      <p v-if="feature.properties.web"><span class="icon"><i class="mdi mdi-web"></i></span><a :href="feature.properties.web" target="_blank">{{feature.properties.web}}</a></p>
      <p v-if="feature.properties.twitter"><span class="icon"><i class="mdi mdi-twitter"></i></span>{{feature.properties.twitter}}</p>
      <p v-if="feature.properties.facebook"><span class="icon"><i class="mdi mdi-facebook"></i></span>{{feature.properties.facebook}}</p>
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
