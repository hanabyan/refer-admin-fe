const getCurrency = ({
  value, type = 'Rp', thousandSeparator = ',', decimal = false,
}) => {
  let formattedNumber;

  if (decimal) {
    const toFixedNum = parseFloat(value).toFixed(2); // set two decimal places
    const decimalSplit = (toFixedNum) ? toFixedNum.split('.') : ['0', '00'];
    decimalSplit[0] = decimalSplit[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousandSeparator}`);
    formattedNumber = decimalSplit.join((thousandSeparator === ',' ? '.' : ','));
  } else {
    formattedNumber = Math.round(value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousandSeparator}`);
  }
  return (type.length > 0) ? `${type} ${formattedNumber}` : formattedNumber;
};

export default {
  getCurrency,
};
