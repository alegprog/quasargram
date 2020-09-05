<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts">
          <q-card
            v-for="post in posts"
            :key="post.id"
            class="card-post p-mb-md"
            flat
            bordered
            >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">@serosgb</q-item-label>
                <q-item-label caption>
                  {{ post.location }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-img
              :src="post.imageUrl"
            />
            <q-card-section>
              <div >{{ post.caption }}</div>
              <div class="text-caption text-grey">{{ post.date | niceDate }}</div>
            </q-card-section>

          </q-card>
        </template>
        <template v-else>
          
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
            </q-card-section>
          </q-card>

        </template>  
      </div>
      <div class="col-4 large-screen-only">
          <q-item class="fixed">
            <q-item-section avatar>
              <q-avatar size="48px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">@serosgb</q-item-label>
              <q-item-label caption>
                Sergio Gtz
              </q-item-label>
            </q-item-section>
          </q-item>        
      </div>
    </div>



  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageHome',
  data() {
    return {
      posts: [],
      loadingPosts: false
    }
  },
  methods: {
    getPosts() {
      this.loadingPosts = true
      setTimeout(() => {
        this.$axios.get('http://localhost:3000/posts').then(response => {
          this.posts = response.data
          this.loadingPosts = false
        }).catch(error =>{
          this.$q.dialog({
            title: 'Error',
            message: 'Could not download posts.'
          })
          this.loadingPosts = false
        })

      }, 4000)

    }
  },
  filters: {
    niceDate(value ) {
      return date.formatDate(value, 'MMMM D, YYYY h:mmA')
    }
  },
  created() {
    this.getPosts()
  }
}
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height: 200px
</style>