<template>
  <v-card class="rate">
    <v-card-text class="rate__currency">{{ rate.currency }}</v-card-text>
    <v-card-text class="rate__value">{{ readableValue }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    rate: {
      type: Object,
      required: true,
    },
  },
  computed: {
    readableValue() {
      return Math.round(this.rate.value * Math.pow(10, 3)) / Math.pow(10, 3);
    },
  },
};
</script>
<style scoped>
.rate {
  text-align: center;
  background: rgb(123, 36, 159);
  background: linear-gradient(
    153deg,
    rgba(123, 36, 159, 1) 0%,
    rgba(99, 9, 121, 0.7) 35%,
    rgba(0, 212, 255, 0.9) 100%
  );
  padding: 10px 0px;
}
.rate__currency {
  font-size: 32px;
  color: white !important;
}
.rate__value {
  font-size: 28px;
  color: white !important;
}
</style>
