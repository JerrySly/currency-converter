<template>
  <div>
    <v-row justify="center" class="selector">
      <v-col cols="2" v-if="currencies && currencies.length > 0">
        <v-select
          :items="currencies"
          v-model="selectedCurrency"
          :label="$t('currencyLabel')"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row dense class="rates">
      <v-col v-for="rate in rates" :key="rate.currency" lg="3" md="3">
        <rate-block class="rates__item" :rate="rate"></rate-block>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { latestRates } from "@/services/converterService";
import RateBlock from "../components/RateBlock.vue";
export default {
  components: { RateBlock },
  data() {
    return {
      currencies: [],
      selectedCurrency: "RUB",
      rates: [],
    };
  },
  created() {
    this.getRates();
  },
  methods: {
    getRates() {
      this.rates = [];
      latestRates(this.selectedCurrency).then((x) => {
        for (let prop in x.exchange_rates)
          this.rates.push({
            currency: prop,
            value: x.exchange_rates[prop],
          });
        this.currencies = Object.keys(x.exchange_rates);
        this.currencies.push(this.selectedCurrency);
      });
    },
  },
  watch: {
    selectedCurrency() {
      this.getRates();
    },
  },
};
</script>
<style scoped>
.selector {
  margin-top: 50px;
}
.rates {
  padding: 40px 200px;
}
.rates__item {
  margin: 20px 10px 0px 10px;
}
</style>
