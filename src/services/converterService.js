import { key, baseUrl } from "@/apiConfig";
import axios from "axios";
export const convertCurrency = async (amount, from, to) => {
  try {
    const result = (
      await axios.get(
        baseUrl +
          `convert?api_key=${key}&base=${from.toUpperCase()}&target=${to.toUpperCase()}&base_amount=${amount}`
      )
    ).data;
    return result;
  } catch (ex) {
    return { error: ex };
  }
};

export const latestRates = async (base) => {
  try {
    const result = (
      await axios.get(
        baseUrl + `live?api_key=${key}&base=${base.toUpperCase()}`
      )
    ).data;
    return result;
  } catch (ex) {
    return { error: ex };
  }
};
