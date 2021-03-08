<template>
  <div>
    <h2 class="title">Uploading {{files.length}} files</h2>
    <span  class="size"> 
      {{ filesize}}
    </span>
    <div class="progressbar" :style="{ width: `${progression}%`}"></div>
    <v-card>
      <v-card-title>
        <span data-testId="title" v-if="!show" v-text="title"></span>

        <v-spacer></v-spacer>

        <v-btn @click="$emit('action-btn:clicked')">
          Action
        </v-btn>
        <v-btn data-testId="button-show" @click="show = !show">
          Show
        </v-btn>
      </v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </div>
</template> 

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => { return 'Prueba'}
    },
    files: {
      type: Array,
      default: () => { return [] }
    }, 
    progression: {
      type: Number,
      default: () => { return 1 }
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    filesize () {
      const totalSize = this.files.reduce((acc, {size}) => acc + size , 0)
      if (totalSize   < 1000) {
        return totalSize /10**3 + " KB"
      }
      return totalSize /10**6 + ' MB'
    }
  },
  methods: {
    toggleTitle() {
      this.show = !this.show
    }
  }
}
</script>