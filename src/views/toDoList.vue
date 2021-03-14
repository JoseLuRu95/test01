<template>
  <v-card data-test="v-card">
    <v-card-title data-test="card-title" class="d-flex justify-end">
      <v-btn data-testid="button-home" @click="goHome()" class="mr-10" small depressed>
        <v-icon class="mr-2" small>mdi-home</v-icon>Go home
      </v-btn>
      <div
        v-if="$can('admin')"
        class="text-h6 font-weight-black mr-12"
      >Currencies: {{ currencies.length }}</div>
      <v-btn v-can:admin.see\view class="info" fab small depressed @click.native="openDialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="currencies" :items-per-page="5" :loading="loading">
        <template v-slot:item.actions="{ item }">
          <v-btn @click.native="deleteCurrency(item)" fab x-small depressed class="error">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn @click.native="editCurrency(item)" fab x-small depressed class="info">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="show" width="500">
      <form-currency
        :toEditCurrency="toEditCurrency"
        :closeDialog="closeDialog"
        :show="show"
        :addCurrency="addCurrency"
        :updateCurrency="updateCurrency"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import formCurrency from "./formCurrency";
import apiService from "@/services";

export default {
  name: "toDoList",
  components: { formCurrency },
  data() {
    return {
      headers: [
        { text: "Code", value: "code" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions" }
      ],
      currencies: [],
      show: false,
      loading: true,
      error: null,
      delete: false,
      index: 0,
      mockFunction: () => {},
      toEditCurrency: { code: null, description: null }
    };
  },
  methods: {
    openDialog() {
      this.toEditCurrency = {};
      this.show = !this.show;
    },
    addCurrency(payload) {
      apiService
        .currencyService({ request: "post", payload })
        .then(() => {
          this.show = false;
        })
        .catch(err => {
          this.error = { ...err.response };
        });
    },
    editCurrency(currency) {
      console.log();
      this.index = this.currencies.findIndex(
        e => e.code === currency.code && e.descrition === currency.descrition
      );
      this.toEditCurrency = { ...currency };
      this.show = true;
    },
    updateCurrency(payload) {
      if (Object.keys(payload).length) {
        apiService
          .currencyService({ request: "put", payload })
          .then(() => {
            this.show = false;
          })
          .catch(err => {
            this.error = { ...err.response };
          });
      }
    },
    deleteCurrency(item) {
      if (Object.keys(item).length) {
        apiService
          .currencyService({ request: "delete" })
          .then(() => {
            this.delete = true;
          })
          .catch(err => {
            this.error = { ...err.response };
          });
      }
    },
    fetchServices() {
      apiService
        .currencyService({ request: "get" })
        .then(response => {
          this.currencies = [...response];
        })
        .catch(err => {
          this.error = { ...err.response };
        })
        .finally(() => {
          this.loading = false;
        });
    },
    closeDialog() {
      this.show = false;
    },
    goHome() {
      this.$router.push({ name: "Home" });
    }
  },
  mounted() {
    this.fetchServices();
  }
};
</script>
