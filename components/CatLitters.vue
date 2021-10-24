<template>
  <section>
    <div class="row mt-5">
      <div class="card-group">
        <div class="row">
          <div class="col-md-8">
            <CatLitter v-for="(catLitter, i) in catLitters" :key="i" :catLitter="catLitter" />
          </div>

          <div class="col-md-4 mt-3">
            <!-- <Newsletter /> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      catLitters: (state) => {
        return [...state.catlitter.catLitters].slice(0, 10)
      },
    }),
  },
}
</script>
<style></style>
