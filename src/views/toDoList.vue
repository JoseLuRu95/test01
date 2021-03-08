<template>
  <v-card data-test="v-card">
    <v-card-title data-test="card-title" class="d-flex justify-end">
      <div class="text-h6 font-weight-black mr-12">Exchanges: {{ info.length }}</div>
      <!-- <div v-if="$can('admin')" class="text-h6 font-weight-black mr-12">Exchanges: {{ info.length }}</div> -->
      <v-btn class="info" fab small depressed @click.native="openDialog">
      <!-- <v-btn
        v-can:admin.see\view.module
        class="info"
        fab
        small
        depressed
        @click.native="openDialog"> -->
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="info" :items-per-page="5" :loading="loading">
        <template v-slot:item.actions="{ item }">
          <v-btn @click.native="deleteExchange(item)" fab x-small depressed class="error">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn @click.native="editExchange(item)" fab x-small depressed class="info">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="show" width="500">
      <form-exchange
        :toEditExchange="toEditExchange"
        :closeDialog="closeDialog"
        :show="show"
        :addExchange="addExchange"
        :updateExchange="updateExchange"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import formExchange from "./formExchange";
import apiService from "@/services";
// import mockCall from "./mockCall";

export default {
  components: { formExchange },
  data() {
    return {
      headers: [
        { text: "Code", value: "code" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions" }
      ],
      info: [],
      show: false,
      loading: true,
      index: 0,
      toEditExchange: { code: null, description: null }
    };
  },
  methods: {
    openDialog() {
      this.toEditExchange = {};
      this.show = !this.show;
    },
    addExchange(exchange) {
      this.info.push(exchange);
      this.show = false;
    },
    editExchange(exchange) {
      console.log();
      this.index = this.info.findIndex(
        e => e.code === exchange.code && e.descrition === exchange.descrition
      );
      this.toEditExchange = { ...exchange };
      this.show = true;
    },
    updateExchange(item) {
      if (Object.keys(item).length) {
        this.info.splice(this.index, 1, item);
        this.show = false;
      }
    },
    deleteExchange(item) {
      if (Object.keys(item).length) {
        const index_ = this.info.findIndex(
          e => e.code === item.code && e.descrition === item.descrition
        );
        if (index_ > -1) {
          this.info.splice(index_, 1);
        }
      }
    },
    closeDialog() {
      this.show = false;
    }
  },
  mounted() {
    // apiService
    //   .exchangeService()
    //   .then(response => {
    //     this.info = [...response];
    //   })
    //   .catch(err => {
    //     throw err;
    //   })
    //   .finally(() => {
    //     this.loading = false;
    //   });
    this.loading = false;
  }
};
</script>
