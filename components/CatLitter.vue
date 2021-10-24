<template>
  <div class="card mt-3 mb-5 pb-5">
    <div class="card-header">
      <div class="card-title title">
        <h3>
          <a class="title is-size-4-mobile" :href="catLitter.url" target="_blank">
            {{ catLitter.title }}
          </a>
        </h3>
      </div>
    </div>
    <div class="card-body">
      <small style="float: right">{{ catLitter.date }} </small>
      <p class="mt-3">
        {{ catLitter.description }}
      </p>
    </div>
    <div style="clear: both"></div>
    <div class="card-footer">
      <div class="actions">
        <a class="btn btn3" :href="catLitter.url" target="_blank">Apply Now</a>
        <small style="float: right">Source: {{ catLitter.website }}</small>
      </div>
      <div style="clear: both"></div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: 'CatLitter',
  props: {
    catLitter: {
      type: [Array, Object],
      default: () => {},
    },
  },
}
</script>

<style></style>
