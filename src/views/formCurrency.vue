<template>
  <v-card>
    <v-card-title>{{ title }} currency</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field label="Code" v-model="code" :rules="requiredField"></v-text-field>
        <v-text-field label="Description" v-model="description" :rules="requiredField"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="!valid" @click="sendCurrency" class="success">Send</v-btn>
      <v-btn @click="closeDialog" class="error">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    closeDialog: {
      type: Function,
      required: true,
      default: () => {
        return false;
      }
    },
    addCurrency: {
      type: Function,
      required: true,
      default: () => {
        return false;
      }
    },
    updateCurrency: {
      type: Function,
      required: true,
      default: () => {
        return false;
      }
    },
    show: {
      type: Boolean,
      required: true,
      default: () => {
        false;
      }
    },
    toEditCurrency: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      valid: false,
      updateMode: false,
      code: "",
      description: "",
      requiredField: [v => !!v || "Field required"]
    };
  },
  computed: {
    title() {
      return this.updateMode ? "Update" : "Add";
    }
  },
  methods: {
    sendCurrency() {
      if (!this.updateMode) {
        this.addCurrency({ code: this.code, description: this.description });
      } else {
        this.updateCurrency({ code: this.code, description: this.description });
      }
    }
  },
  watch: {
    show: {
      inmediate: false,
      handler(newVal) {
        if (newVal && !Object.keys(this.toEditCurrency).length) {
          this.$refs.form.reset();
        }
      }
    },
    toEditCurrency: {
      inmediate: true,
      deep: true,
      handler(newVal) {
        if (Object.keys(newVal).length) {
          this.updateMode = true;
          this.code = newVal.code;
          this.description = newVal.description;
        } else {
          this.updateMode = false;
        }
      }
    }
  },
  mounted() {
    if (Object.keys(this.toEditCurrency).length) {
      const newVal = this.toEditCurrency;
      this.updateMode = true;
      this.code = newVal.code;
      this.description = newVal.description;
    }
  }
};
</script>
