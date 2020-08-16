<template>
  <q-page class="constrain q-pa-md">
    <div class="camera-frame q-pa-md">
      <img
        class="full-width"
        src="https://cdn.quasar.dev/img/parallax2.jpg">
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        round
        color="grey-10"
        icon="eva-camera"
        size="lg" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageName',
}
</script>

<style lang="sass">
  .camera-frame
    border: 1px solid $grey-10
    border-radius: 10px

</style>
