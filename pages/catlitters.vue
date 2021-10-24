<template>
  <div class="row mt-5">
    <div class="card-group">
      <div class="row">
        <div class="col-md-8">
          <CatLitter
            v-for="(catLitter, i) in catLitters"
            :key="i"
            :catLitter="catLitter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    const getCatLitters = store.getters['catlitter/getCatLitters']
    let catLitters = getCatLitters()
    if (!catLitters.length) {
      catLitters = await store.dispatch('catlitter/getCatLitters')
    }
    return { catLitters }
  },
}
</script>
