// const numberWithCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
const numberWithCommas = (num) => '$' + num

export default numberWithCommas