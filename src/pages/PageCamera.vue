<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        ref="video"
        class="full-width"
        autoplay
       />

       <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"/>
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        round
        v-if="hasCameraSupport"
        @click="captureImage"
        color="grey-10"
        icon="eva-camera"
        size="lg" />

      <q-file
        v-else
        v-model="imageUpload"
        @input="captureImageFallback"
        label="Choose and image"
        accept="image/*"
        outlined
        >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        v-model="post.caption"
        class="col col-sm-6"
        label="Caption"
        dense
        />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        v-model="post.location"
        class="col col-sm-6"
        label="Location"
        dense
        >
        <template v-slot:append>
          <q-btn
            @click="getLocation"
            round
            dense
            flat
            icon="eva-navigation-2-outline" />
        </template>
      </q-input>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        unelevated
        rounded
        color="primary"
        label="Post Image" />
    </div>

  </q-page>
</template>

<script>
import {uid} from 'quasar'
require('md-gum-polyfill')

export default {
  name: 'PageName',
  data() {
    return {
      post : {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now()
      },
      imageCaptured: false,
      imageUpload: [],
      hasCameraSupport: true
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
      }).catch(error => {
        this.hasCameraSupport = false
      })
    },
    captureImage() {
      let video = this.$refs.video
      let canvas = this.$refs.canvas

      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height

      let context = canvas.getContexte('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      this.imageCaptured = true

      this.post.photo = this.dataURItoBlob(canvas.toDataUrl())

      this.disableCamera()
    },
    captureImageFallback(file) {
      let reader = new FileReader()

      let canvas = this.$refs.canvas
      let context = canvas.getContexte('2d')

      reader.onload = (event) => {
          var img = new Image();
          img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            context.drawImage(img,0,0)
            this.imageCaptured = true
          }

          img.src = event.target.result
      }
      reader.readAsDataURL( file );
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })
    },
    dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      let byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

        return new Blob([ia], {type:mimeString});
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.getCityAndCountry(position)
      }, error => {

      }, { timeout: 7000 })
    },
    getCityAndCountry(position) {
      let apiUrl = `https://geocode.xyz/${ position.coords.latitude },${ position.coords.longitude }?json=1`
      this.$axios.get(apiUrl).then(result => {
        this.locationSuccess(result)
      }).catch(error => {
        console.log('error: ', error)
      })
    },
    locationSuccess(result) {
      this.post.location = result.data.city
      if (result.data.country) {
        this.post.location +=  `, ${ result.data.country }`
      }
    }
  },
  mounted() {
    this.initCamera()
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera()
    }
  }
}
</script>

<style lang="sass">
  .camera-frame
    border: 1px solid $grey-10
    border-radius: 10px

</style>
