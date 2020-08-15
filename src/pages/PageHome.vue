<template>
  <q-page class="constrain q-pa-md">

  <q-card class="card-post" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-bold">@serosgb</q-item-label>
        <q-item-label caption>
          AH, Michigan
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-img
      src="https://cdn.quasar.dev/img/parallax2.jpg"
    />
  </q-card>

  </q-page>
</template>

<script>
export default {
  name: 'PageHome'
}
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height: 200px
</style>