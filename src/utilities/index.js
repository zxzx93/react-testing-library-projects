/**
 *
 * @function formatCurrency
 * @param {number} currency
 * @returns {string} number formatted as currency
 * @example
 * formatCurrency(1.5)
 *   => 1.50
 */
export const formatCurrency = (currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
};
