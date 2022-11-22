export const isConverterTemplate = (value) => {
  const [amount, from, , to] = value.split(" ");
  console.log(amount, from, to);
  if (!amount || !from || !to) return false;
  if (!Number.isInteger(Number.parseFloat(amount))) return false;
  return true;
};
