const FORMAT_CURRENCY = new Intl.NumberFormat(undefined, {
    currency:'usd',
    style:'currency',
});

const formatCurrency = (number) => {
    return FORMAT_CURRENCY.format(number);
};
export default formatCurrency;