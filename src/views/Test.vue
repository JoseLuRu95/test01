<template>
  <div>
    <v-btn data-testid="button" class="primary-text" @click="methodForTesting">Test</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 1
    };
  },
  methods: {
    methodForTesting() {
      this.index++;
    }
  }
};
</script>