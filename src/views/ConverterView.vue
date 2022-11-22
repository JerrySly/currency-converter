<template>
  <div>
    <v-row justify="center" align="start" class="converter">
      <v-col cols="5">
        <v-text-field
          :placeholder="$t('example')"
          v-model="v$.convertString.$model"
          outlined
          class="converter__input"
          :color="v$.$errors && v$.$errors.length > 0 ? 'red' : 'primary'"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn
          color="purple"
          dark
          x-large
          class="converter__btn"
          @click="convert"
          >{{ $t("convert") }}</v-btn
        >
      </v-col>
    </v-row>
    <div class="errors">
      <div v-for="error in v$.$errors" :key="error.$uid" class="errors__item">
        {{ error.$message }}
      </div>
      <div v-if="requestError" class="errors__item">
        {{ $t("errors.spelling") }}
      </div>
    </div>
    <v-card
      dark
      max-width="400px"
      align="center"
      v-if="converterResult && !converterResult.error"
      class="result"
    >
      <h1>
        {{ `${readableResult} ${converterResult.target}` }}
      </h1>
    </v-card>
  </div>
</template>
<script>
import { convertCurrency } from "@/services/converterService";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { isConverterTemplate } from "@/validators";
export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      convertString: null,
      converterResult: null,
      requestError: false,
    };
  },
  validations() {
    return {
      convertString: {
        required: helpers.withMessage(this.$t("errors.required"), required),
        $autoDirty: true,
        isConverterTemplate: helpers.withMessage(
          this.$t("errors.template"),
          isConverterTemplate
        ),
      },
    };
  },
  methods: {
    async convert() {
      if (await this.v$.$validate()) {
        const [amount, from, , to] = this.convertString.split(" ");
        this.converterResult = await convertCurrency(amount, from, to);
        if (this.converterResult.error) {
          this.requestError = true;
          return;
        }
      }
    },
  },
  computed: {
    readableResult() {
      return (
        Math.round(this.converterResult.converted_amount * Math.pow(10, 6)) /
        Math.pow(10, 6)
      );
    },
  },
  watch: {
    convertString() {
      this.requestError = false;
    },
  },
};
</script>
<style scoped>
.converter {
  margin-top: 30px;
}
.errors {
  text-align: center;
}
.errors__item {
  color: red;
  font-size: 18px;
}
.converter__input_error {
  border-color: red !important;
}
.result {
  padding: 20px;
  margin: auto;
  background: rgb(123, 36, 159);
  background: linear-gradient(
    153deg,
    rgba(123, 36, 159, 1) 0%,
    rgba(99, 9, 121, 0.7) 35%,
    rgba(0, 212, 255, 0.9) 100%
  );
}
</style>
